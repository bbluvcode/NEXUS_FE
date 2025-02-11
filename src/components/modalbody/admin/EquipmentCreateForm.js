/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios'
import { apiEquipment } from '../../../constant/apiConstant'
import { useDispatch } from 'react-redux'
import { fetchEquipments } from '../../../redux/equipment/equipmentSlice'

function AddEquipment({ onSuccess }) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    equipmentName: '',
    price: '',
    stockQuantity: '',
    description: '',
    status: true,
    discountId: '',
    equipmentTypeId: '',
    vendorId: '',
    stockId: '',
  })

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key])
    })
    if (image) {
      data.append('imageFile', image)
    }

    try {
      await axios.post(apiEquipment, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert('Equipment added successfully!')
      if (onSuccess) {
        onSuccess()
      } else {
        dispatch(fetchEquipments())
      }
    } catch (error) {
      console.error('Error adding equipment:', error)
      alert(error.response?.data?.message || 'Failed to add equipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-equipment-form">
      <h2 className="text-center">Add New Equipment</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {[
          { label: 'Equipment Name', name: 'equipmentName', type: 'text', required: true },
          { label: 'Price', name: 'price', type: 'number', step: '0.01', required: true },
          { label: 'Stock Quantity', name: 'stockQuantity', type: 'number', required: true },
          { label: 'Discount ID', name: 'discountId', type: 'text' },
          { label: 'Equipment Type ID', name: 'equipmentTypeId', type: 'number', required: true },
          { label: 'Vendor ID', name: 'vendorId', type: 'number', required: true },
          { label: 'Stock ID', name: 'stockId', type: 'number', required: true },
        ].map(({ label, name, ...rest }) => (
          <div className="col-md-6" key={name}>
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="form-control"
              {...rest}
            />
          </div>
        ))}

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <div className="form-check">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="status" className="form-check-label">
              Active
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
          />
        </div>

        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Equipment'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEquipment
