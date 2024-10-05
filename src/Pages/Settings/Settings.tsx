import React from "react";
import "./Settings.scss";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { useTranslation } from "react-i18next";
import { AppSettings } from "./components/AppSettings/AppSettings";
import { CustomButton } from "../../Components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUserProfile, getUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { applicationSettings, address, dateOfBirth, gender, userName } =
    useAppSelector(getUser);

  const handleDeleteProfile = () => {
    dispatch(deleteUserProfile());
    navigate("/login");
  };

  return (
    <div className="settingsContainer">
      <h1>{t("settings.title")}</h1>
      <ProfileSettings
        userName={userName}
        gender={gender}
        dateOfBirth={dateOfBirth}
        address={address}
      />
      <AppSettings applicationSettings={applicationSettings} />
      <div className="settingsContainer--delete">
        <CustomButton
          label={t("button.deleteProfile")}
          view={"delete"}
          onClick={handleDeleteProfile}
        />
      </div>
    </div>
  );
};
