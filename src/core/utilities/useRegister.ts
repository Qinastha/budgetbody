import React, { useState } from "react";
import { RegisterFormFields } from "../interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterFormFields>({
    email: "",
    password: "",
    userName: "",
    dob: "",
    address: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
    dob: "",
    address: "",
  });

  const validateForm = () => {
    const currentYear = new Date().getFullYear();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const userNameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      userName: "",
      dob: "",
      address: "",
    };

    if (!emailRegex.test(registerForm.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!passwordRegex.test(registerForm.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter and one number.";
      isValid = false;
    }

    if (!userNameRegex.test(registerForm.userName)) {
      newErrors.userName =
        "Username must be 3-20 characters long, alphanumeric only.";
      isValid = false;
    }

    if (!registerForm.dob) {
      newErrors.dob = "Date of birth is required.";
      isValid = false;
    } else {
      const birthYear = new Date(registerForm.dob).getFullYear();
      if (birthYear < 1900 || birthYear > currentYear) {
        newErrors.dob = `Year must be between 1900 and ${currentYear}.`;
        isValid = false;
      }
    }

    if (!addressRegex.test(registerForm.address)) {
      newErrors.address = "Address contains invalid characters.";
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

  return {
    registerForm,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
