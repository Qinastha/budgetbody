import React, { useState } from "react";
import "./Expenses.scss";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
  getExpensesActivePeriod,
  getExpenseAnalytics,
  getUserCurrency,
  getUserExpenses, handleTimeResolution,
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
  const dispatch = useAppDispatch();
  const activePeriod = useAppSelector(getExpensesActivePeriod)
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePeriodChange = (timeResolution: TimeResolution) => {
    dispatch (handleTimeResolution({analyticsType: 'expensesAnalytics',timeResolution }))
  };

  return (
    <>
      <div className="expensesContainer">
        <h1>{t("expenses.title")}</h1>
        <div className="addExpenseButton" onClick={toggleSidebar}>
          {t("expenses.add")}
        </div>
        <div className="expensesContainer--left">
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
