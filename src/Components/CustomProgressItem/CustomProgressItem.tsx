import React from "react";
import "./CustomProgressItem.scss";
import {
  ALL_EXPENSE_LABELS,
  ICurrency,
  IExpensesAnalytics,
  IFinances,
} from "../../core";
import { Categories } from "../../core/types/categories";

interface CustomProgressItemProps {
  userCurrency: ICurrency;
  analyticExpense: IExpensesAnalytics;
}

export const CustomProgressItem: React.FC<CustomProgressItemProps> = ({
  userCurrency,
  analyticExpense,
}) => {
  const sortedExpenseCategories = [
    ...Object.entries(analyticExpense.mainExpenses),
  ].sort((a, b) => b[1].USD - a[1].USD);

  return (
    <div className="progressItemContainer">
      {sortedExpenseCategories.map((entry: any) => {
        const [category, value]: [Categories, IFinances] = entry;
        return (
          <div key={category} className="progressItemContainer--item">
            <div className="progressItemContainer--item_header">
              <p>{ALL_EXPENSE_LABELS[category]}</p>
              <p>{value[userCurrency.code] + userCurrency.symbol}</p>
            </div>
            <progress
              value={value[userCurrency.code]}
              max={analyticExpense.totalExpense[userCurrency.code]}
              className="progressItemContainer--item_progress"
            />
          </div>
        );
      })}
    </div>
  );
};
