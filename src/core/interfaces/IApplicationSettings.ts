import { IFinances } from "./IFinances";
import { ICurrency } from "./ICurrency";
import { DiagramType, Theme } from "../types";

export interface IApplicationSettings {
  monthIncome: IFinances;
  monthHealthcare: IFinances;
  monthTax: IFinances;
  monthHousing: IFinances;
  monthCredit: IFinances;
  monthOther: IFinances;
  currency: ICurrency;
  theme: Theme;
  diagramLineType: DiagramType;
}
