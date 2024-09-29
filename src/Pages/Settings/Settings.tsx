import React, { useState } from "react";
import "./Settings.scss";
import { SettingsForm } from "../../core";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { useTranslation } from "react-i18next";
import { AppSettings } from "./components/AppSettings/AppSettings";
import { CustomButton } from "../../Components";

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [settingsForm, setSettingsForm] = useState<SettingsForm>({
    userName: "",
    address: "",
    dob: "",
    gender: "",
    monthIncome: 0,
    healthCare: 0,
    monthTax: 0,
    housing: 0,
    monthCreditExpense: 0,
    otherExpenses: 0,
    currency: "USD",
    appTheme: "black-green",
    diagramType: "line chart",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSettingsForm({ ...settingsForm, [name]: value });
  };

  const handleSubmit = () => {
    console.log(settingsForm);
  };

  const handleDeleteProfile = () => {
    console.log("Profile deleted");
  };

  return (
    <div className="settingsContainer">
      <h1>{t("settings.title")}</h1>
      <ProfileSettings
        form={settingsForm}
        handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e)
        }
      />
      <AppSettings
        form={settingsForm}
        handleInputChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => {
          handleInputChange(e);
        }}
      />
      <div className="settingsContainer--actions">
        <CustomButton
          label={t("button.submit")}
          view={"white"}
          onClick={handleSubmit}
        />
        <CustomButton
          label={t("button.deleteProfile")}
          view={"delete"}
          onClick={handleDeleteProfile}
        />
      </div>
    </div>
  );
};
