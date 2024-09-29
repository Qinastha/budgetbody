import React from "react";
import "./DashboardItem.scss";
import { useTranslation } from "react-i18next";

export const DashboardItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboardItemContainer">
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.income")}</h4>
        <p>$1000</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.expense")}</h4>
        <p>$800</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.saved")}</h4>
        <p>$300</p>
      </div>
    </div>
  );
};
