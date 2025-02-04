/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import BtnModalClose from '../../button/BtnModalClose'

function FeedbackDetail(props) {
  const feedback = useSelector((state) => state.feedbacks.feedback)
  if (!feedback) {
    return <p>No feedback details available.</p>
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString()
  }

  return (
    <div className="feedback-detail">
      <h2 className="text-center mb-5">Feedback Details</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <strong>Customer ID:</strong> <span>{feedback.customerId || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Full Name:</strong> <span>{feedback.fullName || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Gender:</strong> <span>{feedback.gender || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Date of Birth:</strong> <span>{formatDate(feedback.dateOfBirth) || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Address:</strong> <span>{feedback.address || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Email:</strong> <span>{feedback.email || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Phone Number:</strong> <span>{feedback.phoneNumber || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Title:</strong> <span>{feedback.title || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Date:</strong> <span>{formatDate(feedback.date) || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Feedback Content:</strong> <span>{feedback.feedBackContent || 'N/A'}</span>
        </div>
        <div className="col-md-6">
          <strong>Status:</strong> <span>{feedback.status ? 'Show' : 'Hide'}</span>
        </div>
        <BtnModalClose />
      </div>
    </div>
  )
}

FeedbackDetail.propTypes = {
  // Define PropTypes if necessary
}

export default React.memo(FeedbackDetail)
