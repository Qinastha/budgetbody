import React from "react";
import "./Register.scss";
import {
  CustomButton,
  CustomNavLink,
  GenderSelectItem,
  LanguageSwitcher,
} from "../../Components";
import { Logo, useRegister } from "../../core";
import { useTranslation } from "react-i18next";

export const Register: React.FC = () => {
  const { t } = useTranslation();

  const { registerForm, errors, handleInputChange, handleSubmit } =
    useRegister();

  return (
    <div className="registerPageWrapper">
      <div className="registerPage--header">
        <Logo />
        <LanguageSwitcher />
      </div>
      <div className="registerContainer">
        <h2>Register</h2>
        <form className="registerContainer--form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleInputChange}
            className={errors.email ? "error-border" : ""}
            required={true}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleInputChange}
            className={errors.password ? "error-border" : ""}
            required={true}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}

          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={registerForm.userName}
            onChange={handleInputChange}
            className={errors.userName ? "error-border" : ""}
            required={true}
          />
          {errors.userName && (
            <p className="error-message">{errors.userName}</p>
          )}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={registerForm.address}
            onChange={handleInputChange}
            className={errors.address ? "error-border" : ""}
            required={true}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}

          <div className="formSplit">
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={registerForm.dob}
              onChange={handleInputChange}
              className={errors.dob ? "error-border" : ""}
              required={true}
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
            <GenderSelectItem
              form={registerForm}
              handleInputChange={handleInputChange}
            />
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <CustomNavLink link={"/login"} label={"Login here"} />
        </p>
        <CustomButton
          label={t("button.submit")}
          style={"colourButton"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
