import React from "react";
import "./DashboardItem.scss";
import { useTranslation } from "react-i18next";
import { IUser } from "../../core";

interface DashboardItemProps {
  user: IUser;
}

export const DashboardItem: React.FC<DashboardItemProps> = ({ user }) => {
  const { t } = useTranslation();
  const userCurrentCurrency = user.applicationSettings.currency.code;
  const userIncome = user.applicationSettings.monthIncome[userCurrentCurrency];
  const userExpense =
    user.analytics.expensesAnalytics.totalExpense[userCurrentCurrency];
  return (
    <div className="dashboardItemContainer">
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.income")}</h4>
        <p>{userIncome + userCurrentCurrency}</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.expense")}</h4>
        <p>{userExpense + userCurrentCurrency}</p>
      </div>
      <div className="dashboardItemContainer--module">
        <h4>{t("dashboard.saved")}</h4>
        <p>
          {userIncome - userExpense}
          {userCurrentCurrency}
        </p>
      </div>
    </div>
  );
};
