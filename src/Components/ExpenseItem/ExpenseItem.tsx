import React from "react";
import "./ExpenseItem.scss";

export const ExpenseItem: React.FC = () => {
  return (
    <div className="expenseItemContainer">
      <span className="expenseIteLeftPart">
        <img src="" alt="logo" className="categoryLogo" />
        <p>Category Name</p>
      </span>
      <span className="expenseIteRightPart">
        <p className="spendSum">$100.00</p>
        <button type="button">X</button>
      </span>
    </div>
  );
};
