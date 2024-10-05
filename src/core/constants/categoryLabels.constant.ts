import { Categories } from "../types/categories";
import { NotMonthExpenses } from "../types";

export const ALL_EXPENSE_LABELS: Record<Categories, string> = {
  monthHealthcare: "Healthcare",
  monthTax: "Taxes",
  monthHousing: "Housing",
  monthCredit: "Credit",
  monthOther: "Other Expenses",
  food: "Food",
  transport: "Transport",
  shopping: "Shopping",
  entertainment: "Entertainment",
};

export const EXPENSE_LABELS: NotMonthExpenses = {
  food: "Food",
  transport: "Transport",
  shopping: "Shopping",
  entertainment: "Entertainment",
};
