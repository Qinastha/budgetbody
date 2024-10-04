import { Categories } from "./categories";

export type NotMonthExpenses = Omit<
  Record<Categories, string>,
  "monthHealthcare" | "monthTax" | "monthHousing" | "monthCredit" | "monthOther"
>;
