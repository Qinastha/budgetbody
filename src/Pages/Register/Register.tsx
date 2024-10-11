import React from "react";
import "./Register.scss";
import {
  CustomButton,
  CustomNavLink,
  GenderSelectItem,
  LanguageSwitcher,
} from "../../Components";
import { useTranslation } from "react-i18next";
import { Logo, useRegister } from "../../core";

export const Register: React.FC = () => {
  const { t } = useTranslation();

  const { registerForm, errors, currentYear, handleInputChange, handleSubmit } =
    useRegister();

  return (
    <div className="registerPageWrapper">
      <div className="registerPage--header">
        <Logo />
        <LanguageSwitcher />
      </div>
      <div className="registerContainer">
        <h2>{t("register.title")}</h2>
        <form className="registerContainer--form">
          <input
            type="text"
            name="email"
            placeholder={t("register.placeholder.email")}
            value={registerForm.email}
            onChange={handleInputChange}
            className={errors.email ? "error-border" : ""}
            required={true}
          />
          {errors.email && <p className="error-message">{t("error.email")}</p>}

          <input
            type="password"
            name="password"
            placeholder={t("register.placeholder.password")}
            value={registerForm.password}
            onChange={handleInputChange}
            className={errors.password ? "error-border" : ""}
            required={true}
          />
          {errors.password && (
            <p className="error-message">{t("error.password")}</p>
          )}

          <input
            type="text"
            name="userName"
            placeholder={t("register.placeholder.userName")}
            value={registerForm.userName}
            onChange={handleInputChange}
            className={errors.userName ? "error-border" : ""}
            required={true}
          />
          {errors.userName && (
            <p className="error-message">{t("error.userName")}</p>
          )}

          <input
            type="text"
            name="address"
            placeholder={t("register.placeholder.address")}
            value={registerForm.address}
            onChange={handleInputChange}
            className={errors.address ? "error-border" : ""}
            required={true}
          />
          {errors.address && (
            <p className="error-message">{t("error.address")}</p>
          )}

          <input
            type="date"
            name="dateOfBirth"
            placeholder={t("register.placeholder.dob")}
            value={registerForm.dateOfBirth}
            onChange={handleInputChange}
            className={errors.dateOfBirth ? "error-border" : ""}
            max={`${currentYear}-12-31`}
            required={true}
          />
          {errors.dateOfBirth && (
            <p className="error-message">
              {t("error.dobOutOfDate")} {currentYear}
            </p>
          )}
          <GenderSelectItem
            form={registerForm}
            handleInputChange={handleInputChange}
          />
        </form>
        <p>
          {t("register.alreadyHaveAccount")}{" "}
          <CustomNavLink link={"/login"} label={t("register.loginHere")} />
        </p>
        <CustomButton
          label={t("button.submit")}
          view={"classic"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
