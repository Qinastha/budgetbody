import { RegisterProfileForm } from "./profileForm";
import { Currency } from "./currency";
import { Theme } from "./theme";
import { DiagramType } from "./diagramType";

export type SettingsForm = Omit<RegisterProfileForm, "password" | "email"> & {
  monthIncome: number;
  monthHealthcare: number;
  monthTax: number;
  monthHousing: number;
  monthCredit: number;
  monthOther: number;
  currency: string;
  appTheme: Theme;
  diagramType: DiagramType;
};
