/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { apiAuth } from '../constant/apiConstant/';
import { useDispatch } from "react-redux";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [customer, setCustomer] = useState(null);
  // const dispatch = useDispatch()



  useEffect(() => {
    // Employee
    const employeeToken = localStorage.getItem("employeeToken");
    if (employeeToken) {
      const employeeInfo = decodeToken(employeeToken);
      employeeInfo ? setEmployee(employeeInfo) : logoutEmployee();
    }

    // Customer
    const customerToken = localStorage.getItem("customerToken");
    if (customerToken) {
      const customerInfo = decodeToken(customerToken);
      customerInfo ? setCustomer(customerInfo) : logoutCustomer();
    }
  }, []);

  //  Login Employee
  const loginEmployee = async (email, password) => {
    try {
      const response = await axios.post(`${apiAuth}employee/login`, { Email: email, Password: password });
      if (response.data && response.data.data) {
        const { token, refreshToken } = response.data.data;
        const employeeInfo = decodeToken(token);

        if (!employeeInfo) throw new Error("Invalid token");

        localStorage.setItem("employeeToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        setEmployee(employeeInfo);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  //  Login Customer
  const loginCustomer = async (email, password) => {
    try {
      const response = await axios.post(`${apiAuth}customer/login`, { Email: email, Password: password });
      if (response.data && response.data.data) {
        const { token, refreshToken } = response.data.data;
        const customerInfo = decodeToken(token);
        console.log("Decoded Token:", customerInfo);

        if (!customerInfo) throw new Error("Invalid token");

        localStorage.setItem("customerToken", token);
        localStorage.setItem("customerRefreshToken", refreshToken);
        localStorage.setItem("customerInfo", JSON.stringify(customerInfo)); // Lưu thông tin khách hàng
        setCustomer(customerInfo);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout Employee
  const logoutEmployee = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("refreshToken");
    setEmployee(null);
  };

  // Logout Customer
  const logoutCustomer = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerRefreshToken");
    setCustomer(null);
  };

  //  Decode Token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload.nameid,
        email: payload.email,
        fullname: payload.name,
        role: payload.role,  
        exp: payload.exp,
      };
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  
  return (
    <AuthContext.Provider value={{ employee, customer, loginEmployee, loginCustomer, logoutEmployee, logoutCustomer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
