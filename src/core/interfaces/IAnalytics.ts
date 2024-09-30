import { IDashboardAnalytics } from "./IDashboardAnalytics";
import { IExpensesAnalytics } from "./IExpensesAnalytics";

export interface IAnalytics {
  dashboardAnalytics: IDashboardAnalytics;
  expensesAnalytics: IExpensesAnalytics;
}
