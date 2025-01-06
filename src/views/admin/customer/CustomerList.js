/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from '../../../redux/customerSlice'

const CustomerList = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.items)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])
  const formatDateSystem = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};
  return (
    <div>
      <h2>CustomerList</h2>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>FullName</th>
              <th>Gender</th>
              <th>DateOfBirth</th>
              <th>Address</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>IdentificationNo</th>
              {/* <th>Image</th>
              <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 &&
              customers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.customerId}</td>
                    <td>{item.fullName}</td>
                    <td>{item.gender}</td>
                    <td>{formatDateSystem(item.dateOfBirth)}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.identificationNo}</td>
                    {/* <td>{item.image}</td>
                    <td>{item.password}</td> */}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerList
