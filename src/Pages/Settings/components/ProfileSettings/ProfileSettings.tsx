import React, { useState } from "react";
import "./ProfileSettings.scss";
import { useTranslation } from "react-i18next";
import { CustomButton, GenderSelectItem } from "../../../../Components";
import { Gender, RegisterProfileForm } from "../../../../core";
import { useAppDispatch } from "../../../../hooks";
import { updateProfileData } from "../../../../store/userSlice";

interface ProfileSettingsProps {
  userName: string;
  address: string;
  dateOfBirth: string;
  gender: Gender;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  userName,
  address,
  dateOfBirth,
  gender,
}) => {
  const [profileForm, setProfileForm] = useState<Partial<RegisterProfileForm>>({
    userName: userName ?? "",
    address: address ?? "",
    dateOfBirth: dateOfBirth ? dateOfBirth.split("T")[0] : "",
    gender: gender ?? "",
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateProfileData(profileForm));
    console.log(profileForm);
  };
  return (
    <div className="profileSettingsContainer">
      <h3>{t("profileSettings.title")}</h3>
      <form className="profileSettingsContainer--inputs">
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.userName")}</label>
          <input
            type="text"
            name="userName"
            value={profileForm.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.dob")}</label>
          <input
            type="date"
            name="dateOfBirth"
            max={`${currentYear}-12-31`}
            value={profileForm.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div className="profileSettingsContainer--inputs_item">
          <label>{t("register.placeholder.address")}</label>
          <input
            type="text"
            name="address"
            value={profileForm.address}
            onChange={handleInputChange}
          />
        </div>

        <GenderSelectItem
          form={profileForm}
          handleInputChange={handleInputChange}
        />
      </form>
      <div className="profileSettingsContainer--button">
        <CustomButton
          label={t("button.submit")}
          view={"white"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
