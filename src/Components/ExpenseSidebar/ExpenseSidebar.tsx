import React, { useState } from "react";
import "./ExpenseSidebar.scss";
import { Categories } from "../../core/types/categories";
import { CustomButton } from "../CustomButton/CustomButton";
import { useTranslation } from "react-i18next";
import { EXPENSE_LABELS, handleOnlyNumbers } from "../../core";
import { useAppDispatch } from "../../hooks";
import { handleAddExpense } from "../../store/userSlice";

interface SidebarProps {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

export const ExpenseSidebar: React.FC<SidebarProps> = ({
  isSidebarVisible,
  toggleSidebar,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [newExpense, setNewExpense] = useState({
    category: "",
    value: "",
  });

  const handleCategoryClick = (category: Categories) => {
    setNewExpense({ ...newExpense, category });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, value: e.target.value });
  };

  const handleNewExpense = () => {
    const body = {
      ...newExpense,
      value: +newExpense.value,
      timestamp: new Date(Date.now()),
    };
    dispatch(handleAddExpense(body));
    setNewExpense({ category: "", value: "" });
    toggleSidebar();
  };

  return (
    <>
      <div
        className={`overlay ${isSidebarVisible ? "visible" : ""}`}
        onClick={toggleSidebar}
      />
      <div className={`sidebarContainer ${isSidebarVisible ? "visible" : ""}`}>
        <div
          className="sidebarContainer--content"
          onClick={e => e.stopPropagation()}>
          <h2>Add a New Expense</h2>

          <div className="sidebarContainer--content_list">
            {Object.entries(EXPENSE_LABELS).map(([expenseCategory, label]) => (
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
              type="text"
              value={newExpense.value}
              onChange={handleAmountChange}
              onKeyDown={handleOnlyNumbers}
            />
          </div>

          <CustomButton
            label={t("button.submit")}
            view={"submit"}
            onClick={handleNewExpense}
          />
        </div>
      </div>
    </>
  );
};
