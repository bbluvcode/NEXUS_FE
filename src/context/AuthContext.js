/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { apiAuth } from '../constant/apiConstant/'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerInfo } from '../redux/customer/customerSlice'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null)
  const dispatch = useDispatch()
  const customer = useSelector((state) => state.customers.customer) // Lấy từ Redux

  useEffect(() => {
    // Employee
    const employeeToken = localStorage.getItem('employeeToken')
    if (employeeToken) {
      const employeeInfo = decodeToken(employeeToken)
      if (employeeInfo) {
        setEmployee(employeeInfo)
      } else {
        logoutEmployee()
      }
    }

    // Customer
    const customerToken = localStorage.getItem('customerToken')
    if (customerToken) {
      const customerInfo = decodeToken(customerToken)
      if (customerInfo) {
        dispatch(getCustomerInfo(customerInfo.email)) // Lấy thông tin từ API
      } else {
        logoutCustomer()
      }
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify(customer))
  }, [customer])

  // Login Employee
  const loginEmployee = async (email, password) => {
    try {
      const response = await axios.post(`${apiAuth}employee/login`, {
        Email: email,
        Password: password,
      })
      if (response.data?.data) {
        const { token, refreshToken } = response.data.data
        const employeeInfo = decodeToken(token)

        if (!employeeInfo) throw new Error('Invalid token')

        localStorage.setItem('employeeToken', token)
        localStorage.setItem('refreshToken', refreshToken)
        setEmployee(employeeInfo)
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  // Login Customer
  const loginCustomer = async (email, password) => {
    try {
      const response = await axios.post(`${apiAuth}customer/login`, {
        Email: email,
        Password: password,
      })
      if (response.data?.data) {
        const { token, refreshToken } = response.data.data
        const customerInfo = decodeToken(token)

        if (!customerInfo) throw new Error('Invalid token')

        localStorage.setItem('customerToken', token)
        localStorage.setItem('customerRefreshToken', refreshToken)
        dispatch(getCustomerInfo(email)) // Cập nhật Redux store
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  // Logout Employee
  const logoutEmployee = () => {
    localStorage.removeItem('employeeToken')
    localStorage.removeItem('refreshToken')
    setEmployee(null)
  }

  // Logout Customer
  const logoutCustomer = () => {
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customerRefreshToken')
    localStorage.removeItem('customerInfo')
    // dispatch(getCustomerInfo(null)) // Xóa thông tin trong Redux
  }

  // Decode Token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        id: payload.nameid,
        email: payload.email,
        fullname: payload.name,
        role: payload.role,
        exp: payload.exp,
      }
    } catch (error) {
      console.error('Invalid token:', error)
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{ employee, customer, loginEmployee, loginCustomer, logoutEmployee, logoutCustomer }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
