import React, { useEffect, useState } from "react";
import {
  ApplicationSettingsForm,
  handleOnlyNumbers,
  IApplicationSettings,
  ICurrency,
  IFinances,
} from "../../../../core";
import { useTranslation } from "react-i18next";
import "./AppSettings.scss";
import {
  allCurrencies,
  updateApplicationSettingsData,
} from "../../../../store/userSlice";
import { CustomButton } from "../../../../Components";
import { useAppDispatch } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

interface AppSettingsProps {
  applicationSettings: IApplicationSettings;
}

export const AppSettings: React.FC<AppSettingsProps> = ({
  applicationSettings,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userCurrency, setUserCurrency] = useState<ICurrency>(
    applicationSettings?.currency,
  );

  const [appSettingsForm, setAppSettingsForm] =
    useState<ApplicationSettingsForm>({
      monthIncome:
        +applicationSettings?.monthIncome[userCurrency.code].toFixed(2),
      monthHealthcare:
        +applicationSettings?.monthHealthcare[userCurrency.code].toFixed(2),
      monthTax: +applicationSettings?.monthTax[userCurrency.code].toFixed(2),
      monthHousing:
        +applicationSettings?.monthHousing[userCurrency.code].toFixed(2),
      monthCredit:
        +applicationSettings?.monthCredit[userCurrency.code].toFixed(2),
      monthOther:
        +applicationSettings?.monthOther[userCurrency.code].toFixed(2),
      currency: applicationSettings?.currency,
      theme: applicationSettings?.theme,
      diagramLineType: applicationSettings?.diagramLineType,
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;
    let newValue: string | number | undefined;
    if (name !== "currency" && name !== "theme" && name !== "diagramLineType") {
      newValue = +value;
    } else {
      newValue = value;
    }
    setAppSettingsForm({ ...appSettingsForm, [name]: newValue });
  };

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrencyCode = e.target.value;
    const newCurrency = allCurrencies.find(
      (currency: ICurrency) => currency.code === newCurrencyCode,
    );
    if (newCurrency) {
      setUserCurrency(newCurrency);
      setAppSettingsForm((prevData: ApplicationSettingsForm) => {
        return {
          ...prevData,
          currency: newCurrency,
          monthIncome:
            +applicationSettings.monthIncome[newCurrency.code].toFixed(2),
          monthHealthcare:
            +applicationSettings.monthHealthcare[newCurrency.code].toFixed(2),
          monthTax: +applicationSettings.monthTax[newCurrency.code].toFixed(2),
          monthHousing:
            +applicationSettings.monthHousing[newCurrency.code].toFixed(2),
          monthCredit:
            +applicationSettings.monthCredit[newCurrency.code].toFixed(2),
          monthOther:
            +applicationSettings.monthOther[newCurrency.code].toFixed(2),
        };
      });
    }
  };

  const handleSubmit = () => {
    let result: Partial<ApplicationSettingsForm> = {};
    const monthFields = [
      "monthIncome",
      "monthHealthcare",
      "monthTax",
      "monthHousing",
      "monthCredit",
      "monthOther",
    ];
    const { currency, theme, diagramLineType } = applicationSettings;
    const currentCurrencyCode =
      currency.code !== appSettingsForm.currency.code
        ? appSettingsForm.currency.code
        : currency.code;

    // Compare and assign only if values are different
    if (theme !== appSettingsForm.theme) result.theme = appSettingsForm.theme;
    if (diagramLineType !== appSettingsForm.diagramLineType)
      result.diagramLineType = appSettingsForm.diagramLineType;
    if (currency.code !== appSettingsForm.currency.code)
      result.currency = appSettingsForm.currency;

    monthFields.forEach(field => {
      const fieldValue = applicationSettings[field] as IFinances;

      if (fieldValue[currentCurrencyCode] !== appSettingsForm[field]) {
        result[field] = appSettingsForm[field];
      }
    });

    dispatch(updateApplicationSettingsData(result));
    navigate("/");
  };

  return (
    <div className="appSettingsContainer">
      <h3>{t("appSettings.title")}</h3>
      {applicationSettings && (
        <>
          <form className="appSettingsContainer--inputs">
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.monthIncome")}</label>
              <input
                type="text"
                name="monthIncome"
                value={appSettingsForm.monthIncome}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.healthcare")}</label>
              <input
                type="text"
                name="monthHealthcare"
                value={appSettingsForm.monthHealthcare}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_select">
              <label>{t("appSettings.currency")}</label>
              <select
                name="currency"
                value={appSettingsForm.currency.code}
                onChange={handleChangeCurrency}>
                {allCurrencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.monthTax")}</label>
              <input
                type="text"
                name="monthTax"
                value={appSettingsForm.monthTax}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.housing")}</label>
              <input
                type="text"
                name="monthHousing"
                value={appSettingsForm.monthHousing}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_select">
              <label>{t("appSettings.appTheme")}</label>
              <select
                name="theme"
                value={appSettingsForm.theme}
                onChange={handleInputChange}>
                <option value="orange-black">
                  {t("appSettings.theme.blackOrange")}
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
                value={appSettingsForm.monthCredit}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.otherExpenses")}</label>
              <input
                type="text"
                name="monthOther"
                value={appSettingsForm.monthOther}
                onChange={handleInputChange}
                onKeyDown={handleOnlyNumbers}
              />
            </div>
            <div className="appSettingsContainer--inputs_select">
              <label>{t("appSettings.diagramType")}</label>
              <select
                name="diagramLineType"
                value={appSettingsForm.diagramLineType}
                onChange={handleInputChange}>
                <option value="line">{t("appSettings.lineChart")}</option>
                <option value="area">{t("appSettings.areaChart")}</option>
                <option value="bar">{t("appSettings.barChart")}</option>
              </select>
            </div>
          </form>
          <div className="appSettingsContainer--button">
            <CustomButton
              label={t("button.update")}
              view={"classic"}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};
