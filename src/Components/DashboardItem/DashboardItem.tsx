import React from "react";
import "./DashboardItem.scss";
import { useTranslation } from "react-i18next";
import { ICurrency, IDashboardAnalytics, IUser } from "../../core";

interface DashboardItemProps {
  dashboardAnalytics: IDashboardAnalytics;
  userCurrency: ICurrency;
}

export const DashboardItem: React.FC<DashboardItemProps> = ({
  dashboardAnalytics,
  userCurrency,
}) => {
  const { t } = useTranslation();
  const userIncome = dashboardAnalytics?.totalIncome[userCurrency.code];
  const userExpense = dashboardAnalytics?.totalExpense[userCurrency.code];
  return (
    <div className="dashboardItemContainer">
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.income")}</h4>
        <p>{userIncome + userCurrency?.symbol}</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.expense")}</h4>
        <p>{userExpense + userCurrency?.symbol}</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.saved")}</h4>
        <p>
          {userIncome - userExpense}
          {userCurrency?.symbol}
        </p>
      </div>
    </div>
  );
};
