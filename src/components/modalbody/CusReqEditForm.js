/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import BtnModalCloseSubmit from '../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetCusRequest, updateCusRequest } from '../../redux/customer/cusRequestSlice'

function CusReqEditForm(props) {
  const dispatch = useDispatch()

  // Lấy dữ liệu request từ Redux
  const request = useSelector((state) => state.cusRequests.cusRequest)
  const [formData, setFormData] = useState({
    requestTitle: '',
    serviceRequest: '',
    equipmentRequest: '',
    dateCreate: '',
    dateResolve: '',
    isResponse: false,
    customerId: null,
  })

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Cập nhật formData khi request thay đổi
  useEffect(() => {
    if (request) {
      // console.log('cusreq',request)
      setFormData({
        requestTitle: request.requestTitle || '',
        serviceRequest: request.serviceRequest || '',
        equipmentRequest: request.equipmentRequest || '',
        dateCreate: formatDate(request.dateCreate) || '',
        dateResolve: formatDate(request.dateResolve) || '',
        isResponse: request.isResponse || false,
        customerId: request.customerId || null,
      })
    }
  }, [request])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    dispatch(handleSetCusRequest({ ...request, [name]: value })) // Đồng bộ dữ liệu vào Redux
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit updated request form:', formData)
    dispatch(updateCusRequest(request))
  }

  return (
    <div className="cus-req-edit-form">
      <h2 className="text-center">Edit Customer Request</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="requestTitle" className="form-label">
            Request Title
          </label>
          <input
            type="text"
            id="requestTitle"
            name="requestTitle"
            className="form-control"
            value={formData.requestTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="serviceRequest" className="form-label">
            Service Request
          </label>
          <input
            type="text"
            id="serviceRequest"
            name="serviceRequest"
            className="form-control"
            value={formData.serviceRequest}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="equipmentRequest" className="form-label">
            Equipment Request
          </label>
          <input
            type="text"
            id="equipmentRequest"
            name="equipmentRequest"
            className="form-control"
            value={formData.equipmentRequest}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="dateCreate" className="form-label">
            Date Create
          </label>
          <input
            type="date"
            id="dateCreate"
            name="dateCreate"
            className="form-control"
            value={formData.dateCreate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="dateResolve" className="form-label">
            Date Resolve
          </label>
          <input
            type="date"
            id="dateResolve"
            name="dateResolve"
            className="form-control"
            value={formData.dateResolve}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="isResponse" className="form-label">
            Is Response
          </label>
          <input
            type="checkbox"
            id="isResponse"
            name="isResponse"
            className="form-check-input"
            checked={formData.isResponse}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            className="form-control"
            value={formData.customerId || ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  )
}

export default React.memo(CusReqEditForm)
