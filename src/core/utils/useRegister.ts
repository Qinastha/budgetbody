import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RegisterProfileForm } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [registerForm, setRegisterForm] = useState<RegisterProfileForm>({
    email: "",
    password: "",
    userName: "",
    dateOfBirth: "",
    address: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
    dateOfBirth: "",
    address: "",
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const userNameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      userName: "",
      dateOfBirth: "",
      address: "",
    };

    if (!emailRegex.test(registerForm.email)) {
      newErrors.email = t("error.email");
      isValid = false;
    }

    if (!registerForm.password) {
      if (!passwordRegex.test(registerForm.password)) {
        newErrors.password = t("error.password");
        isValid = false;
      }
    }

    if (!userNameRegex.test(registerForm.userName)) {
      newErrors.userName = t("error.userName");
      isValid = false;
    }

    if (!registerForm.dateOfBirth) {
      newErrors.dateOfBirth = t("error.dobRequired");
      isValid = false;
    } else {
      const birthYear = new Date(registerForm.dateOfBirth).getFullYear();
      if (birthYear < 1900 || birthYear > currentYear) {
        newErrors.dateOfBirth = `${t("error.dobOutOfDate")} ${currentYear}`;
        isValid = false;
      }
    }

    if (!addressRegex.test(registerForm.address)) {
      newErrors.address = t("error.address");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        registerForm,
      );
      if (response?.data?.value) {
        localStorage.setItem("token", response.data.value);
        navigate("/");
        setRegisterForm({
          email: "",
          password: "",
          userName: "",
          dateOfBirth: "",
          address: "",
          gender: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    registerForm,
    errors,
    currentYear,
    handleInputChange,
    handleSubmit,
  };
};
