/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { apiCustomer } from '../../../constant/apiConstant'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  changeStatusSupportRequest,
  handleSetSuppportRequest,
} from '../../../redux/customer/supportRequestSlice'

const SupportResponseForm = () => {
  const supReq = useSelector((state) => state.supportRequests.supportRequest)
  const supReqId = supReq.supportRequestId
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    supReqId: supReq.supportRequestId,
    customerName: supReq.customerName,
    toEmail: supReq.email,
    subject: supReq.title,
    responseContent: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (supReq) {
      setFormData({
        supReqId: supReq.supportRequestId,
        toEmail: supReq.email,
        customerName: supReq.customerName,
        subject: supReq.title,
        responseContent: '',
      })
    }
  }, [supReq])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(apiCustomer + 'support-response-mail', formData)
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Email has been sent successfully!',
      })
      setLoading(false)
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
      // const empIdResolver = 1
      // dispatch(changeStatusSupportRequest({ supReqId, empIdResolver: 1 }))

      console.log(response.data)
    } catch (error) {
      console.error('Error sending email:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to send email. Please try again!',
      })
      setLoading(false)
    }
  }

  return (
    <div className="p-3">
      <div className="bg-primary text-white text-center">
        <h4 style={{ lineHeight: '10vh' }}>Support Response Form</h4>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Support Request ID */}
          <div className="mb-3" hidden>
            <label className="form-label">Support Request ID</label>
            <input
              type="number"
              className="form-control"
              name="supReqId"
              value={formData.supReqId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Support Request Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          {/* To Email */}
          <div className="mb-3">
            <label className="form-label">Customer Email</label>
            <input
              type="email"
              className="form-control"
              name="toEmail"
              value={formData.toEmail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Customer Name */}
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Response Content */}
          <div className="mb-3">
            <label className="form-label">Response Content</label>
            <textarea
              className="form-control"
              name="responseContent"
              rows="4"
              value={formData.responseContent}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-md-12 text-center">
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <BtnModalCloseSubmit />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(SupportResponseForm)
