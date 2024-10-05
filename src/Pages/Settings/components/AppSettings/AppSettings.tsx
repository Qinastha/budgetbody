import React, { useEffect, useState } from "react";
import {
  ApplicationSettingsForm,
  IApplicationSettings,
  ICurrency,
} from "../../../../core";
import { useTranslation } from "react-i18next";
import "./AppSettings.scss";
import {
  allCurrencies,
  defaultCurrency,
  setUserCurrency,
  updateApplicationSettingsData,
} from "../../../../store/userSlice";
import { CustomButton } from "../../../../Components";
import { useAppDispatch } from "../../../../hooks";

interface AppSettingsProps {
  applicationSettings: IApplicationSettings;
}

export const AppSettings: React.FC<AppSettingsProps> = ({
  applicationSettings,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const userCurrency: ICurrency =
    applicationSettings?.currency ?? defaultCurrency;

  const [appSettingsForm, setAppSettingsForm] =
    useState<ApplicationSettingsForm>({
      monthIncome: applicationSettings.monthIncome[userCurrency.code],
      monthHealthcare: applicationSettings.monthHealthcare[userCurrency.code],
      monthTax: applicationSettings.monthTax[userCurrency.code],
      monthHousing: applicationSettings.monthHousing[userCurrency.code],
      monthCredit: applicationSettings.monthCredit[userCurrency.code],
      monthOther: applicationSettings.monthOther[userCurrency.code],
      currency: applicationSettings.currency,
      theme: applicationSettings.theme,
      diagramLineType: applicationSettings.diagramLineType,
    });

  useEffect(() => {
    setAppSettingsForm({
      monthIncome:
        appSettingsForm.monthIncome ||
        applicationSettings.monthIncome[userCurrency.code],
      monthHealthcare:
        appSettingsForm.monthHealthcare ||
        applicationSettings.monthHealthcare[userCurrency.code],
      monthTax:
        appSettingsForm.monthTax ||
        applicationSettings.monthTax[userCurrency.code],
      monthHousing:
        appSettingsForm.monthHousing ||
        applicationSettings.monthHousing[userCurrency.code],
      monthCredit:
        appSettingsForm.monthCredit ||
        applicationSettings.monthCredit[userCurrency.code],
      monthOther:
        appSettingsForm.monthOther ||
        applicationSettings.monthOther[userCurrency.code],
      currency: appSettingsForm.currency || applicationSettings.currency,
      theme: appSettingsForm.theme || applicationSettings.theme,
      diagramLineType:
        appSettingsForm.diagramLineType || applicationSettings.diagramLineType,
    });
  }, [userCurrency]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let { name, value } = e.target;
    let newValue: any;
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
      setAppSettingsForm((prevData: ApplicationSettingsForm) => {
        return {
          ...prevData,
          currency: newCurrency,
        };
      });
      dispatch(setUserCurrency(newCurrency));
    }
  };

  const handleSubmit = () => {
    let result: any = {};
    Object.keys(applicationSettings).forEach((key: string) => {
      if (
        ((key === "theme" || key === "diagramLineType") &&
          applicationSettings[key] !== appSettingsForm[key]) ||
        (key === "currency" &&
          applicationSettings[key].code !== appSettingsForm[key].code) ||
        ((key === "monthIncome" ||
          key === "monthHealthcare" ||
          key === "monthTax" ||
          key === "monthHousing" ||
          key === "monthCredit" ||
          key === "monthOther") &&
          applicationSettings[key][applicationSettings.currency.code] !==
            appSettingsForm[key])
      ) {
        result[key] = appSettingsForm[key];
      }
    });
    // dispatch(updateApplicationSettingsData(appSettingsForm));
    console.log(result);
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
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.healthcare")}</label>
              <input
                type="text"
                name="monthHealthcare"
                value={appSettingsForm.monthHealthcare}
                onChange={handleInputChange}
              />
            </div>
            <div className="appSettingsContainer--inputs_select">
              <label>{t("appSettings.currency")}</label>
              <select
                name="currency"
                value={appSettingsForm.currency?.code}
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
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.housing")}</label>
              <input
                type="text"
                name="monthHousing"
                value={appSettingsForm.monthHousing}
                onChange={handleInputChange}
              />
            </div>
            <div className="appSettingsContainer--inputs_select">
              <label>{t("appSettings.appTheme")}</label>
              <select
                name="theme"
                value={appSettingsForm.theme}
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
                value={appSettingsForm.monthCredit}
                onChange={handleInputChange}
              />
            </div>
            <div className="appSettingsContainer--inputs_item">
              <label>{t("appSettings.otherExpenses")}</label>
              <input
                type="text"
                name="monthOther"
                value={appSettingsForm.monthOther}
                onChange={handleInputChange}
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
              label={t("button.submit")}
              view={"white"}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};
