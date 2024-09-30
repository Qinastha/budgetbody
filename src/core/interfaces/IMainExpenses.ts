import { IFinances } from "./IFinances";

export interface IMainExpenses {
  monthHealthcare: IFinances;
  monthTax: IFinances;
  monthHousing: IFinances;
  monthCredit: IFinances;
  monthOther: IFinances;
  food: IFinances;
  transport: IFinances;
  shopping: IFinances;
  entertainment: IFinances;
}
