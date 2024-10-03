import React, { useState } from "react";
import "./Expenses.scss";
import { useAppSelector } from "../../hooks";
import {
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
import { Categories } from "../../core/types/categories";

export const Expenses: React.FC = () => {
  const userExpenses = useAppSelector(getUserExpenses);
  const userCurrency = useAppSelector(getUserCurrency);
  const userIncomes = useAppSelector(getUserIncomes);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const categoryLabels: Record<Categories, string> = {
    monthHealthcare: "Healthcare (Monthly)",
    monthTax: "Taxes (Monthly)",
    monthHousing: "Housing (Monthly)",
    monthCredit: "Credit (Monthly)",
    monthOther: "Other Expenses (Monthly)",
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    entertainment: "Entertainment",
  };

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
              {userExpenses.map((expense: ITimeSeries) => (
                <div className="expensesContainer--list-item" key={expense._id}>
                  <ExpenseItem
                    expense={expense}
                    userCurrency={userCurrency}
                    categoryLabels={categoryLabels}
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
            expenses={userExpenses}
            userCurrency={userCurrency}
            userIncomes={userIncomes}
            categoryLabels={categoryLabels}
          />
        </div>
      </div>

      {isSidebarVisible && (
        <ExpenseSidebar
          isSidebarVisible={isSidebarVisible}
          categoryLabels={categoryLabels}
          toggleSidebar={toggleSidebar}
        />
      )}
    </>
  );
};
