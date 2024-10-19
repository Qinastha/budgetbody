import React from "react";
import "./ExpenseItem.scss";
import { eLogo, getAllExpenseLabels, ICurrency, ITimeSeries } from "../../core";
import { handleDeleteExpense } from "../../store/userSlice";
import { useAppDispatch } from "../../hooks";
import { CustomButton } from "../CustomButton/CustomButton";

interface ExpenseItemProps {
  expense: ITimeSeries;
  userCurrency: ICurrency;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  userCurrency,
}) => {
  const dispatch = useAppDispatch();
  const deleteExpense = (expense: ITimeSeries) => {
    dispatch(handleDeleteExpense(expense._id));
  };

  return (
    <div className="expenseItemContainer">
      <span className="expenseItemLeftPart">
        <span className="material-icons">{eLogo[expense.category]}</span>
        <p>{getAllExpenseLabels()[expense.category]}</p>
      </span>
      <span className="expenseItemRightPart">
        <p className="spendSum">
          {expense.value[userCurrency.code].toFixed(0) + userCurrency.symbol}
        </p>
        {!expense.category.includes("month") ? (
          <CustomButton
            label={"X"}
            view={"itemDelete"}
            onClick={() => deleteExpense(expense)}
          />
        ) : (
          <div className="blankPlaceholder"></div>
        )}
      </span>
    </div>
  );
};
