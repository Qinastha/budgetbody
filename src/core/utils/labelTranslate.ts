import { Categories } from "../types/categories";
import { NotMonthExpenses } from "../types";
import i18n from "../../i18n";

export const getAllExpenseLabels = (): Record<Categories, string> => ({
  monthHealthcare: i18n.t("expense.healthcare"),
  monthTax: i18n.t("expense.monthTax"),
  monthHousing: i18n.t("expense.housing"),
  monthCredit: i18n.t("expense.monthCreditExpense"),
  monthOther: i18n.t("expense.otherExpenses"),
  food: i18n.t("expense.food"),
  transport: i18n.t("expense.transport"),
  shopping: i18n.t("expense.shopping"),
  entertainment: i18n.t("expense.entertainment"),
});

export const getExpenseLabels = (): NotMonthExpenses => ({
  food: i18n.t("expense.food"),
  transport: i18n.t("expense.transport"),
  shopping: i18n.t("expense.shopping"),
  entertainment: i18n.t("expense.entertainment"),
});
