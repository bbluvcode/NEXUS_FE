/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppportRequests } from '../../../redux/customer/supportRequestSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilUser, cilWarning } from '@coreui/icons'

const SupportRequest = () => {
  const dispatch = useDispatch()
  const supportRequests = useSelector((state) => state.supportRequests.items)

  useEffect(() => {
    dispatch(fetchSuppportRequests())
  }, [dispatch])
  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Support Request</h2>
        <BtnModal name="Create New Support Request" iform="6" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date Request</th>
              <th>Customer Name</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Resolver</th>
              <th>Date Resolve</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {supportRequests.length > 0 ? (
              supportRequests.map((item, index) => (
                <tr key={index}>
                  <td>{item.supportRequestId}</td>
                  <td>{formatDateSystem(item.dateRequest)}</td>
                  <td className='text-center'>{item.fullName}</td>
                  <td>{item.title}</td>
                  <td>{item.detailContent}</td>
                  <td>Emp001</td>
                  <td>{item.dateResolve ? formatDateSystem(item.dateResolved) : 'Waiting'}</td>
                  <td className="d-flex">
                    <button
                      className={`text-white me-1 btn btn-${item.isResponse ? 'success' : 'danger'}`}
                    >
                      <CIcon icon={item.isResponse ? cilCheck : cilWarning} />
                    </button>
                    <BtnModal name={<CIcon icon={cilUser} />} iform="6" style="outline-primary" />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="6"
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

export default SupportRequest
