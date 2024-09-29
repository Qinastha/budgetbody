import { RegisterProfileForm } from "./profileForm";
import { Currency } from "./currency";
import { Theme } from "./theme";
import { DiagramType } from "./diagramType";

export type SettingsForm = Omit<RegisterProfileForm, "password" | "email"> & {
  monthIncome: number;
  healthCare: number;
  monthTax: number;
  housing: number;
  monthCreditExpense: number;
  otherExpenses: number;
  currency: Currency;
  appTheme: Theme;
  diagramType: DiagramType;
};
