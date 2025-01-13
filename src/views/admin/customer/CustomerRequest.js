/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCusRequests } from '../../../redux/customer/cusRequestSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilUser, cilWarning } from '@coreui/icons'

const CustomerRequest = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.cusRequests.items)

  useEffect(() => {
    dispatch(fetchCusRequests())
  }, [dispatch])
  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Customer Request</h2>
        <BtnModal name="Create New Customer Request" iform="0" style="primary" />
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>requestTitle</th>
              <th>serviceRequest</th>
              <th>equipmentRequest</th>
              <th>dateCreate</th>
              <th>dateResolve</th>
              <th className="text-center">Action</th>
              {/* <th></th> */}
              {/* <th>Image</th>
              <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((item, index) => (
                <tr key={index}>
                  <td>{item.requestId}</td>
                  <td>{item.requestTitle}</td>
                  <td>{item.serviceRequest}</td>
                  <td>{item.equipmentRequest}</td>
                  <td>{formatDateSystem(item.dateCreate)}</td>
                  <td>{item.dateResolve ? formatDateSystem(item.dateResolve) : 'Waiting'}</td>
                  <td className="d-flex">
                    <button
                      className={`text-white me-1 btn btn-${item.isResponse ? 'success' : 'danger'}`}
                    >
                      <CIcon icon={item.isResponse ? cilCheck : cilWarning} />
                    </button>
                    {/* </td> */}
                    {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                    {/* <td className="d-flex "> */}
                    <BtnModal name={<CIcon icon={cilUser} />} iform="1" style="outline-primary" />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="1"
                      style="outline-warning"
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

                  {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                  <td className="d-flex ">
                    <BtnModal name={<i className="fa fa-edit"></i>} iform="1" style="warning" />
                    <BtnModal name={<CIcon icon={cilUser} size="sm" />} iform="1" style="primary" />
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

export default React.memo(CustomerRequest)
