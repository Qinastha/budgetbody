import React, { useState } from "react";
import "./Login.scss";
import {
  CustomButton,
  CustomNavLink,
  LanguageSwitcher,
} from "../../Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginFormProps, Logo } from "../../core";
import { useTranslation } from "react-i18next";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginForm,
      );
      if (response?.data?.value) {
        localStorage.setItem("token", response.data.value);
        navigate("/");
        setLoginForm({ email: "", password: "" });
      }
    } catch (e) {
      console.error(e);
      setLoginForm({ email: "", password: "" });
    }
  };

  return (
    <div className="loginPageWrapper">
      <div className="loginPage--header">
        <Logo />
        <LanguageSwitcher />
      </div>
      <div className="loginContainer">
        <h2>{t("login.title")}</h2>
        <form className="loginContainer--form">
          <input
            type="text"
            name="email"
            placeholder={t("login.placeholder.email")}
            value={loginForm.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder={t("login.placeholder.password")}
            value={loginForm.password}
            onChange={handleInputChange}
          />
        </form>
        <p>
          {t("login.noAccount")}{" "}
          <CustomNavLink link={"/register"} label={t("login.registerNow")} />
        </p>
        <CustomButton
          label={t("button.submit")}
          view={"colourButton"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
