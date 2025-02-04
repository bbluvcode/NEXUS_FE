/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers, handleSetCustomer } from '../../../redux/customer/customerSlice'
import BtnModal from '../../../components/button/BtnModal'

const CustomerList = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.items)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleEditCustomer = (customer) => {
    dispatch(handleSetCustomer(customer))
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of customer</h2>
        <BtnModal name="Create New Customer" iform="CustomerCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
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
              <th></th>
              {/* <th>Image</th>
              <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((item, index) => (
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
                  <td onClick={()=> handleEditCustomer(item)}>                
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="CustomerEditForm"
                      style="warning"
                      customer={item}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr key={'1'}>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>{formatDateSystem(Date.now())}</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                  <td>
                    <BtnModal name={<i className="fa fa-edit"></i>} iform="CustomerEditForm" style="warning"/>
                  </td>
                </tr>
                <tr key={'2'}>
                  <td colSpan="9" style={{ textAlign: 'center', color: 'red' }}>
                    Không truy cập được dữ liệu
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(CustomerList)
