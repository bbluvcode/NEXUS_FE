/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import BtnModalClose from '../../button/BtnModalClose'

function CusReqDetail(props) {
  const cusRequest = useSelector((state) => state.cusRequests.cusRequest)
  if (!cusRequest) {
    return <p>No request details available.</p>
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  return (
    <div className="cus-req-detail">
      <h2 className="text-center mb-5">Customer Request Details</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <strong>Request Title:</strong> <span>{cusRequest.requestTitle || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Service Request:</strong> <span>{cusRequest.serviceRequest || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Equipment Request:</strong> <span>{cusRequest.equipmentRequest || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Date Created:</strong> <span>{formatDate(cusRequest.dateCreate)}</span>
        </div>
        <div className="col-md-6">
          <strong>Date Resolved:</strong> <span>{formatDate(cusRequest.dateResolve)}</span>
        </div>
        <div className="col-md-6">
          <strong>Response Status:</strong>{' '}
          <span>{cusRequest.isResponse ? 'Responded' : 'Pending'}</span>
        </div>
        <div className="col-md-6">
          <strong>Customer ID:</strong> <span>{cusRequest.customerId || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Full Name:</strong> <span>{cusRequest.fullName || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Gender:</strong> <span>{cusRequest.gender || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Date of Birth:</strong> <span>{formatDate(cusRequest.dateOfBirth)}</span>
        </div>
        <div className="col-md-6">
          <strong>Address:</strong> <span>{cusRequest.address || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Email:</strong> <span>{cusRequest.email || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Phone Number:</strong> <span>{cusRequest.phoneNumber || 'N/A'}</span>
        </div>
        <BtnModalClose/>
      </div>
    </div>
  )
}

export default React.memo(CusReqDetail)
/* eslint-disable prettier/prettier */
