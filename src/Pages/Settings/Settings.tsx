import React, { useState } from "react";
import "./Settings.scss";
import { ICurrency, SettingsForm } from "../../core";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { useTranslation } from "react-i18next";
import { AppSettings } from "./components/AppSettings/AppSettings";
import { CustomButton } from "../../Components";
import { useAppSelector } from "../../hooks";
import { defaultCurrency, getUser } from "../../store/userSlice";

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { applicationSettings, address, dateOfBirth, gender, userName } =
    useAppSelector(getUser);

  const userCurrency: ICurrency =
    applicationSettings?.currency ?? defaultCurrency;

  const [settingsForm, setSettingsForm] = useState<SettingsForm>({
    userName: userName ?? "",
    address: address ?? "",
    dateOfBirth: dateOfBirth ? dateOfBirth.split("T")[0] : "",
    gender: gender ?? "",
    monthIncome: applicationSettings?.monthIncome[userCurrency.code] ?? 0,
    monthHealthcare:
      applicationSettings?.monthHealthcare[userCurrency.code] ?? 0,
    monthTax: applicationSettings?.monthTax[userCurrency.code] ?? 0,
    monthHousing: applicationSettings?.monthHousing[userCurrency.code] ?? 0,
    monthCredit: applicationSettings?.monthCredit[userCurrency.code] ?? 0,
    monthOther: applicationSettings?.monthOther[userCurrency.code] ?? 0,
    currency: applicationSettings?.currency?.code ?? "USD",
    appTheme: applicationSettings?.theme ?? "dark-green",
    diagramType: applicationSettings?.diagramLineType ?? "line",
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
