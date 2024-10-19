import { ICurrency } from "../interfaces";

export type ApplicationSettingsForm = {
  monthIncome: number;
  monthHealthcare: number;
  monthTax: number;
  monthHousing: number;
  monthCredit: number;
  monthOther: number;
  currency: ICurrency;
  theme: string;
  diagramLineType: string;

  [key: string]: string | number | ICurrency;
};
