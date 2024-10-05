import React from "react";
import "./ExpenseItem.scss";
import { ALL_EXPENSE_LABELS, eLogo, ICurrency, ITimeSeries } from "../../core";

interface ExpenseItemProps {
  expense: ITimeSeries;
  userCurrency: ICurrency;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  userCurrency,
}) => {
  return (
    <div className="expenseItemContainer">
      <span className="expenseItemLeftPart">
        <span className="material-icons">{eLogo[expense.category]}</span>
        <p>{ALL_EXPENSE_LABELS[expense.category]}</p>
      </span>
      <span className="expenseItemRightPart">
        <p className="spendSum">
          {expense.value[userCurrency.code] + userCurrency.symbol}
        </p>
        <button type="button">X</button>
      </span>
    </div>
  );
};
