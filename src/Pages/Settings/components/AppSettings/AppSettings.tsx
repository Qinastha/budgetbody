import React from "react";
import { SettingsForm } from "../../../../core";
import { useTranslation } from "react-i18next";
import "./AppSettings.scss";

interface AppSettingsProps {
  form: SettingsForm;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const AppSettings: React.FC<AppSettingsProps> = ({
  form,
  handleInputChange,
}) => {
  const { t } = useTranslation();
  const handleOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab" ||
        /^[0-9]$/.test(e.key)
      )
    ) {
      e.preventDefault();
    }
  };
  return (
    <div className="appSettingsContainer">
      <h3>{t("appSettings.title")}</h3>
      <div className="appSettingsContainer--inputs">
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.monthIncome")}</label>
          <input
            type="text"
            name="monthIncome"
            value={form.monthIncome}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.healthcare")}</label>
          <input
            type="text"
            name="monthHealthcare"
            value={form.monthHealthcare}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_select">
          <label>{t("appSettings.currency")}</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleInputChange}>
            <option value="USD">$</option>
            <option value="EUR">€</option>
            <option value="UAH">₴</option>
          </select>
        </div>
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.monthTax")}</label>
          <input
            type="text"
            name="monthTax"
            value={form.monthTax}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.housing")}</label>
          <input
            type="text"
            name="monthHousing"
            value={form.monthHousing}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_select">
          <label>{t("appSettings.appTheme")}</label>
          <select
            name="appTheme"
            value={form.appTheme}
            onChange={handleInputChange}>
            <option value="dark-green">
              {t("appSettings.theme.blackGreen")}
            </option>
            <option value="light-blue">
              {t("appSettings.theme.lightBlue")}
            </option>
          </select>
        </div>
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.monthCreditExpense")}</label>
          <input
            type="text"
            name="monthCredit"
            value={form.monthCredit}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_item">
          <label>{t("appSettings.otherExpenses")}</label>
          <input
            type="text"
            name="monthOther"
            value={form.monthOther}
            onChange={handleInputChange}
            onKeyDown={handleOnlyNumbers}
          />
        </div>
        <div className="appSettingsContainer--inputs_select">
          <label>{t("appSettings.diagramType")}</label>
          <select
            name="diagramType"
            value={form.diagramType}
            onChange={handleInputChange}>
            <option value="line">{t("appSettings.lineChart")}</option>
            <option value="area">{t("appSettings.areaChart")}</option>
            <option value="bar">{t("appSettings.barChart")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
