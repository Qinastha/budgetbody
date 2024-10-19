import { IFinances } from "./IFinances";
import { ICurrency } from "./ICurrency";

export interface IApplicationSettings {
  monthIncome: IFinances;
  monthHealthcare: IFinances;
  monthTax: IFinances;
  monthHousing: IFinances;
  monthCredit: IFinances;
  monthOther: IFinances;
  currency: ICurrency;
  theme: string;
  diagramLineType: string;

  [key: string]: string | IFinances | ICurrency;
}
