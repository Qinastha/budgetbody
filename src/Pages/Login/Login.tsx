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

export const Login: React.FC = () => {
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
        <h2>Login</h2>
        <form className="loginContainer--form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleInputChange}
          />
        </form>
        <p>
          Don't have an account?{" "}
          <CustomNavLink link={"/register"} label={"Register now"} />
        </p>
        <CustomButton
          label={"Submit"}
          style={"colourButton"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
