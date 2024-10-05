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
        <NavLink to="/">
          {" "}
          <span className="material-symbols-outlined">home</span>{" "}
          <p>{t("navbar.dashboard")} </p>
        </NavLink>
        <NavLink to="/expenses">
          {" "}
          <span className="material-symbols-outlined">
            account_balance_wallet
          </span>
          <p>{t("navbar.expenses")} </p>
        </NavLink>
        <NavLink to="/settings">
          {" "}
          <span className="material-symbols-outlined">settings</span>{" "}
          <p>{t("navbar.settings")} </p>
        </NavLink>
      </div>
      <div className="navbarContainer--languageSwitcher">
        <LanguageSwitcher />
      </div>
      <Logo />
    </div>
  );
};
