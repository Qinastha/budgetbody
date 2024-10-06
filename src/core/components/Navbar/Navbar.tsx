import React from "react";
import "./Navbar.scss";
import { LanguageSwitcher, MiniProfile } from "../../../Components";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { useTranslation } from "react-i18next";

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="navbarContainer">
      <MiniProfile />
      <div className="navbarContainer--links">
        <NavLink to="/"> {t("navbar.dashboard")} </NavLink>
        <NavLink to="/expenses"> {t("navbar.expenses")} </NavLink>
        <NavLink to="/settings"> {t("navbar.settings")} </NavLink>
      </div>
      <div className="navbarContainer--languageSwitcher">
        <LanguageSwitcher />
      </div>
      <Logo />
    </div>
  );
};
