import { IFinances } from "./IFinances";
import { TimeResolution } from "../types";
import { DashboardCalculations } from "../types/dashboardCalculation";

export interface IDashboardAnalytics {
  totalIncome: IFinances;
  totalExpense: IFinances;
  totalSave: IFinances;
  diagramData: any;
  selectedCalculation: DashboardCalculations;
  timeResolution: TimeResolution;
}
