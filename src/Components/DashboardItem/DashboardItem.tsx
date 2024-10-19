import React from "react";
import "./DashboardItem.scss";
import { useTranslation } from "react-i18next";
import {
  DashboardCalculations,
  ICurrency,
  IDashboardAnalytics,
} from "../../core";

interface DashboardItemProps {
  dashboardAnalytics: IDashboardAnalytics;
  userCurrency: ICurrency;
  selectCalculation: (calFunc: DashboardCalculations) => void;
}

export const DashboardItem: React.FC<DashboardItemProps> = ({
  dashboardAnalytics,
  userCurrency,
  selectCalculation,
}) => {
  const { t } = useTranslation();
  const userIncome = dashboardAnalytics?.totalIncome[userCurrency.code];
  const userExpense = dashboardAnalytics?.totalExpense[userCurrency.code];

  return (
    <div className="dashboardItemContainer">
      <div
        className="dashboardItemContainer--module"
        onClick={e => selectCalculation("income")}>
        <h4>{t("dashboard.income")}</h4>
        <p>{userIncome?.toFixed(0) + userCurrency?.symbol}</p>
      </div>
      <div
        className="dashboardItemContainer--module"
        onClick={e => selectCalculation("expense")}>
        <h4>{t("dashboard.expense")}</h4>
        <p>{userExpense?.toFixed(0) + userCurrency?.symbol}</p>
      </div>
      <div
        className="dashboardItemContainer--module"
        onClick={e => selectCalculation("save")}>
        <h4>{t("dashboard.saved")}</h4>
        <p>
          {(userIncome - userExpense).toFixed(0)}
          {userCurrency?.symbol}
        </p>
      </div>
    </div>
  );
};
