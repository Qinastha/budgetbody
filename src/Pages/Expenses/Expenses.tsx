import React, { useState } from "react";
import "./Expenses.scss";
import { useAppSelector } from "../../hooks";
import {
  getExpenseAnalytics,
  getUserCurrency,
  getUserExpenses,
  getUserIncomes,
} from "../../store/userSlice";
import { ITimeSeries } from "../../core";
import {
  CustomProgressItem,
  ExpenseItem,
  ExpenseSidebar,
} from "../../Components";

export const Expenses: React.FC = () => {
  const userExpenses = useAppSelector(getUserExpenses);
  const userCurrency = useAppSelector(getUserCurrency);
  const userIncomes = useAppSelector(getUserIncomes);
  const analyticExpense = useAppSelector(getExpenseAnalytics);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="expensesContainer">
        <div className="expensesContainer--left">
          <h1>Expenses</h1>
          <div className="addExpenseButton" onClick={toggleSidebar}>
            Add expense
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
                    className="expensesContainer--list-item"
                    key={expense._id}>
                    <ExpenseItem
                      expense={expense}
                      userCurrency={userCurrency}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div>No expenses found. Add your first one</div>
          )}
        </div>
        <div className="expensesContainer--right">
          <h4>Where your moneys go:</h4>
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
