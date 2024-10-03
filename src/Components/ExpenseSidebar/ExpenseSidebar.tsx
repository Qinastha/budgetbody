import React, { useState } from "react";
import "./ExpenseSidebar.scss";
import { Categories } from "../../core/types/categories";
import { CustomButton } from "../CustomButton/CustomButton";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isSidebarVisible: boolean;
  categoryLabels: Record<Categories, string>;
  toggleSidebar: () => void;
}

export const ExpenseSidebar: React.FC<SidebarProps> = ({
  isSidebarVisible,
  categoryLabels,
  toggleSidebar,
}) => {
  const { t } = useTranslation();
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: 0,
  });

  const handleCategoryClick = (category: Categories) => {
    setNewExpense({ ...newExpense, category });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, amount: +e.target.value });
  };

  return (
    <div className="overlay" onClick={toggleSidebar}>
      <div className={`sidebarContainer ${isSidebarVisible ? "visible" : ""}`}>
        <div
          className="sidebarContainer--content"
          onClick={e => e.stopPropagation()}>
          <h2>Add a New Expense</h2>

          <div className="sidebarContainer--content_list">
            {Object.entries(categoryLabels).map(([expenseCategory, label]) => (
              <div
                key={expenseCategory}
                className={`categoryItem ${newExpense.category === expenseCategory ? "selected" : ""}`}
                onClick={() =>
                  handleCategoryClick(expenseCategory as Categories)
                }>
                {label}
              </div>
            ))}
          </div>

          <div className="sidebarContainer--content_input">
            <label>Amount</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={handleAmountChange}
            />
          </div>

          <CustomButton
            label={t("button.submit")}
            view={"submit"}
            onClick={() => console.log(newExpense)}
          />
        </div>
      </div>
    </div>
  );
};
