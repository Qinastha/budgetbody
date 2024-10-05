import React, { useState } from "react";
import "./Dashboard.scss";
import { Chart, DashboardItem, PeriodItem } from "../../Components";
import { useAppSelector } from "../../hooks";
import {
  getDashboardAnalytics,
  getDiagramType,
  getUserCurrency,
} from "../../store/userSlice";
import { TimeResolution } from "../../core";
import { useTranslation } from "react-i18next";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dashboardAnalytics = useAppSelector(getDashboardAnalytics);
  const userCurrency = useAppSelector(getUserCurrency);
  const diagramType = useAppSelector(getDiagramType);
  const [activePeriod, setActivePeriod] = useState<TimeResolution>("1m");

  const handlePeriodChange = (period: TimeResolution) => {
    setActivePeriod(period);
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardContainer--header">
        <h1>{t("dashboard.title")}</h1>
        <PeriodItem
          activePeriod={activePeriod}
          handlePeriodChange={handlePeriodChange}
        />
      </div>
      <div className="dashboardContainer--modules">
        <DashboardItem
          dashboardAnalytics={dashboardAnalytics}
          userCurrency={userCurrency}
        />
      </div>
      <div className="dashboardContainer--widget">
        {/*{diagramType === "line"}*/}
        <Chart
          activePeriod={activePeriod}
          dashboardAnalytics={dashboardAnalytics}
          userCurrency={userCurrency}
        />
      </div>
    </div>
  );
};
