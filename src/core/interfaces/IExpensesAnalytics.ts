import { TimeResolution } from "../types";
import { IMainExpenses } from "./IMainExpenses";

export interface IExpensesAnalytics {
  mainExpenses: IMainExpenses;
  timeResolution: TimeResolution;
}
