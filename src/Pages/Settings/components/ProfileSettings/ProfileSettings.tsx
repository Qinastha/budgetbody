import React from "react";
import "./ProfileSettings.scss";
import { useTranslation } from "react-i18next";
import { GenderSelectItem } from "../../../../Components";
import { SettingsForm } from "../../../../core";

interface ProfileSettingsProps {
  form: SettingsForm;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  form,
  handleInputChange,
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <div className="profileSettingsContainer">
      <h3>{t("profileSettings.title")}</h3>
      <div className="profileSettingsContainer--inputs">
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.userName")}</label>
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.dob")}</label>
          <input
            type="date"
            name="dob"
            max={`${currentYear}-12-31`}
            value={form.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.address")}</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
          />
        </div>

        <GenderSelectItem form={form} handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};
