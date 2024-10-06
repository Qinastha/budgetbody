export const DEFAULT_CHART_OPTIONS = {
    xAxis: {
        type: "time",
        boundaryGap: ["5%", "5%"],
    },
    yAxis: {
        type: "value",
        boundaryGap: ["5%", "5%"],
        show: true
    },
    tooltip: {
        trigger: "axis",
    },
    series: [
        {
            name: 'new',
            smooth: true,
            data: [[Date.now(),0]],
            lineStyle: {
                width: 3,
            },
            showSymbol: false,
        },
    ],
    title: {
        left: "center",
    },
}