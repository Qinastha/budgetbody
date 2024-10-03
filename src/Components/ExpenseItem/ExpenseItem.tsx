import React from "react";
import "./ExpenseItem.scss";
import { ICurrency, ITimeSeries } from "../../core";
import { Categories } from "../../core/types/categories";

interface ExpenseItemProps {
  expense: ITimeSeries;
  userCurrency: ICurrency;
  categoryLabels: Record<Categories, string>;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  userCurrency,
  categoryLabels,
}) => {
  return (
    <div className="expenseItemContainer">
      <span className="expenseItemLeftPart">
        <img src="" alt="logo" className="categoryLogo" />
        <p>{categoryLabels[expense.category]}</p>
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
