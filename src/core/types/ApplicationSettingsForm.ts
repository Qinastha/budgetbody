import { Theme } from "./theme";
import { DiagramType } from "./diagramType";
import { ICurrency } from "../interfaces";

export type ApplicationSettingsForm = {
  monthIncome: number;
  monthHealthcare: number;
  monthTax: number;
  monthHousing: number;
  monthCredit: number;
  monthOther: number;
  currency: ICurrency;
  theme: Theme;
  diagramLineType: DiagramType;
};
