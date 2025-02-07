/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import axios from 'axios'
import { apiCustomer } from '../../../constant/apiConstant'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { useSelector } from 'react-redux'

const SupportResponseForm = () => {
  const supReq = useSelector((state) => state.supportRequests.supportRequest)
  const [formData, setFormData] = useState({
    supReqId: supReq.supportRequestId,
    toEmail: supReq.email,
    subject: supReq.title,
    responseContent: '',
    customerName: supReq.fullName,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(apiCustomer + 'support-response-mail', formData)
      alert('Email sent successfully!')
      console.log(response.data)
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email!')
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
          <div className="mb-3">
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
          <BtnModalCloseSubmit />
        </form>
      </div>
    </div>
  )
}

export default SupportResponseForm
