import React from "react";
import "./CustomProgressItem.scss";
import { ICurrency, ITimeSeries } from "../../core";
import { Categories } from "../../core/types/categories";

interface CustomProgressItemProps {
  expenses: ITimeSeries[];
  userCurrency: ICurrency;
  userIncomes: ITimeSeries[];
  categoryLabels: Record<Categories, string>;
}

export const CustomProgressItem: React.FC<CustomProgressItemProps> = ({
  expenses,
  userCurrency,
  userIncomes,
  categoryLabels,
}) => {
  const totalIncome = userIncomes.reduce(
    (acc, income) => acc + income.value[userCurrency.code],
    0,
  );

  const sortedExpenses = [...expenses].sort(
    (a, b) => b.value[userCurrency.code] - a.value[userCurrency.code],
  );

  return (
    <div className="progressItemContainer">
      {sortedExpenses.map((expense: ITimeSeries) => {
        return (
          <div key={expense._id} className="progressItemContainer--item">
            <div className="progressItemContainer--item_header">
              <p>{categoryLabels[expense.category]}</p>
              <p>{expense.value[userCurrency.code] + userCurrency.symbol}</p>
            </div>
            <progress
              value={expense.value[userCurrency.code]}
              max={totalIncome}
              className="progressItemContainer--item_progress"
            />
          </div>
        );
      })}
    </div>
  );
};
