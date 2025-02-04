/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios'
import { apiEquipment } from '../../../constant/apiConstant'
import { useDispatch } from 'react-redux'
import { fetchEquipments } from '../../../redux/equipment/equipmentSlice'

function AddEquipment({ onSuccess }) {
  const dispatch = useDispatch()
  const [equipmentName, setEquipmentName] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [discountId, setDiscountId] = useState('')
  const [equipmentTypeId, setEquipmentTypeId] = useState('')
  const [vendorId, setVendorId] = useState('')
  const [stockId, setStockId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const equipmentData = {
      EquipmentName: equipmentName,
      Price: parseFloat(price),
      StockQuantity: parseInt(stockQuantity),
      Description: description,
      Status: status,
      DiscountId: discountId,
      EquipmentTypeId: parseInt(equipmentTypeId),
      VendorId: parseInt(vendorId),
      StockId: parseInt(stockId),
    }

    try {
      await axios.post(apiEquipment, equipmentData)
      alert('Equipment added successfully!')
      if (onSuccess) {
        onSuccess()
      } else {
        dispatch(fetchEquipments())
      }
    } catch (error) {
      console.error('Error adding equipment:', error)
      alert('Failed to add equipment')
    }
  }

  return (
    <div className="add-equipment-form">
      <h2 className="text-center">Add New Equipment</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="equipmentName" className="form-label">
            Equipment Name
          </label>
          <input
            type="text"
            id="equipmentName"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="stockQuantity" className="form-label">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="status" className="form-check-label">
              Active
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="discountId" className="form-label">
            Discount ID
          </label>
          <input
            type="text"
            id="discountId"
            value={discountId}
            onChange={(e) => setDiscountId(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="equipmentTypeId" className="form-label">
            Equipment Type ID
          </label>
          <input
            type="number"
            id="equipmentTypeId"
            value={equipmentTypeId}
            onChange={(e) => setEquipmentTypeId(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="vendorId" className="form-label">
            Vendor ID
          </label>
          <input
            type="number"
            id="vendorId"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="stockId" className="form-label">
            Stock ID
          </label>
          <input
            type="number"
            id="stockId"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">
            Add Equipment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEquipment
