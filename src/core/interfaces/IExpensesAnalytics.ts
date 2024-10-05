import { TimeResolution } from "../types";
import { IMainExpenses } from "./IMainExpenses";
import { IFinances } from "./IFinances";

export interface IExpensesAnalytics {
  mainExpenses: IMainExpenses;
  timeResolution: TimeResolution;
  totalExpense: IFinances;
}
