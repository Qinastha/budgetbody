import React, { useState } from "react";
import "./Expenses.scss";
import { useAppSelector } from "../../hooks";
import {
  getExpenseAnalytics,
  getUserCurrency,
  getUserExpenses,
} from "../../store/userSlice";
import { ITimeSeries, TimeResolution } from "../../core";
import {
  CustomProgressItem,
  ExpenseItem,
  ExpenseSidebar,
  PeriodItem,
} from "../../Components";
import { useTranslation } from "react-i18next";

export const Expenses: React.FC = () => {
  const { t } = useTranslation();
  const userExpenses = useAppSelector(getUserExpenses);
  const userCurrency = useAppSelector(getUserCurrency);
  const analyticExpense = useAppSelector(getExpenseAnalytics);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [activePeriod, setActivePeriod] = useState<TimeResolution>("1m");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePeriodChange = (period: TimeResolution) => {
    setActivePeriod(period);
  };

  return (
    <>
      <div className="expensesContainer">
        <div className="expensesContainer--left">
          <h1>{t("expenses.title")}</h1>
          <div className="addExpenseButton" onClick={toggleSidebar}>
            {t("expenses.add")}
          </div>
          {userExpenses.length > 0 ? (
            <div className="expensesContainer--left_list">
              {[...userExpenses]
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime(),
                )
                .map((expense: ITimeSeries) => (
                  <div
                    className="expensesContainer--left_list-item"
                    key={expense._id}>
                    <ExpenseItem
                      expense={expense}
                      userCurrency={userCurrency}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div>{t("expenses.none")}</div>
          )}
        </div>
        <div className="expensesContainer--right">
          <PeriodItem
            activePeriod={activePeriod}
            handlePeriodChange={handlePeriodChange}
          />
          <h4>{t("expenses.where")}:</h4>
          <CustomProgressItem
            userCurrency={userCurrency}
            analyticExpense={analyticExpense}
          />
        </div>
      </div>

      <ExpenseSidebar
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};
