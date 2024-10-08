import React from "react";
import ReactECharts from "echarts-for-react";
import { ICurrency, IDashboardAnalytics, TimeResolution } from "../../core";
import { useTranslation } from "react-i18next";

interface ChartProps {
  activePeriod: TimeResolution;
  dashboardAnalytics: IDashboardAnalytics;
  userCurrency: ICurrency;
  theme: string;
  viewportWidth: number;
  viewportHeight: number;
}

export const Chart: React.FC<ChartProps> = ({
  activePeriod,
  dashboardAnalytics,
  userCurrency,
  theme,
  viewportWidth,
  viewportHeight,
}) => {
  const { t } = useTranslation();
  const getChartOptions = () => {
    const data = dashboardAnalytics?.diagramData?.series[0]?.data;

    if (!data || data.length === 0 || !userCurrency) {
      return {};
    }

    const now = Date.now();
    let periodMilliseconds = 0;

    switch (activePeriod) {
      case "1m":
        periodMilliseconds = 30 * 24 * 60 * 60 * 1000;
        break;
      case "3m":
        periodMilliseconds = 90 * 24 * 60 * 60 * 1000;
        break;
      case "6m":
        periodMilliseconds = 180 * 24 * 60 * 60 * 1000;
        break;
      case "1y":
        periodMilliseconds = 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        periodMilliseconds = Infinity;
    }

    const startTime = now - periodMilliseconds;

    const seriesData = data
      .map((item: any) => {
        const [timestamp, values] = item;
        if (timestamp < startTime) {
          return null;
        }
        const amount = values[userCurrency.code];
        if (amount === undefined) {
          console.error(
            `Currency ${userCurrency.code} not found in data point`,
            values,
          );
          return null;
        }
        return [timestamp, amount];
      })
      .filter(Boolean);

    seriesData.sort((a: any, b: any) => a[0] - b[0]);

    const options = {
      grid: {
        backgroundColor: "transparent",
      },
      xAxis: {
        type: "time",
        name: "Date",
        axisLabel: {
          formatter: (value: number) => new Date(value).toLocaleDateString(),
          rotate: 45,
          interval: "auto",
          color: theme === "orange-black" ? "#FFFFFF" : "#212121",
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: theme === "orange-black" ? "#FFFFFF" : "#212121",
            width: 2,
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        show: true,
        name: userCurrency.symbol,
        position: "left",
        axisLabel: {
          formatter: (value: number) => value.toFixed(0),
          color: theme === "orange-black" ? "#FFFFFF" : "#212121",
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: theme === "orange-black" ? "#FFFFFF" : "#212121",
            width: 2,
          },
        },
        splitLine: {
          show: false,
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          if (!params.length) return "";
          const param = params[0];
          const date = new Date(param.data[0]).toLocaleDateString();
          const value = param.data[1];
          return `${date}<br/>Savings: ${value.toFixed(2)} ${userCurrency.code}`;
        },
      },
      series: [
        {
          name: "Savings",
          data: seriesData,
          type: dashboardAnalytics.diagramData.series[0].type ?? "line",
          areaStyle: dashboardAnalytics.diagramData.series[0].areaStyle ?? {
            opacity: 0,
          },
          yAxisIndex: 0,
          smooth: true,
          lineStyle: {
            width: 2,
          },
          showSymbol: false,
          itemStyle: {
            opacity: 0.8,
            color: theme === "orange-black" ? "#F37335" : "#005AA7",
          },
        },
      ],
      title: {
        text: t(
          dashboardAnalytics?.diagramData?.title?.text ?? "lineChart.title",
        ),
        left: "center",
        textStyle: {
          fontSize: viewportWidth > 1080 ? "28px" : "20px",
          fontWeight: "bold",
          color: theme === "orange-black" ? "#FFFFFF" : "#212121",
        },
      },
    };

    return options;
  };

  const options = getChartOptions();

  return (
    <div className="dashboardChart">
      <ReactECharts
        option={options}
        style={{
          height:
            viewportHeight < 500
              ? "80vh"
              : viewportHeight < 840
                ? "60vh"
                : "40vh",
          width: viewportWidth > 1300 ? "75vw" : "60vw",
          margin: "0 auto",
        }}
      />
    </div>
  );
};
