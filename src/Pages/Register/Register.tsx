import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomNavLink,
  GenderSelectItem,
  LanguageSwitcher,
} from "../../Components";
import { Logo, RegisterFormFields } from "../../core";
import axios from "axios";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterFormFields>({
    email: "",
    password: "",
    userName: "",
    dob: "",
    address: "",
    gender: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        registerForm,
      );
      if (response?.data?.value) {
        localStorage.setItem("token", response.data.value);
        navigate("/");
        setRegisterForm({
          email: "",
          password: "",
          userName: "",
          dob: "",
          address: "",
          gender: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

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
            required={true}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleInputChange}
            required={true}
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={registerForm.userName}
            onChange={handleInputChange}
            required={true}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={registerForm.dob}
            onChange={handleInputChange}
            required={true}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={registerForm.address}
            onChange={handleInputChange}
            required={true}
          />
          <GenderSelectItem
            form={registerForm}
            handleInputChange={handleInputChange}
          />
        </form>
        <p>
          Already have an account?{" "}
          <CustomNavLink link={"/login"} label={"Login here"} />
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
