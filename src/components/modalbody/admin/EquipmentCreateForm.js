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
        onSuccess() // Close modal after success
      } else {
        dispatch(fetchEquipments()) // If no onSuccess, fetch equipments
      }
    } catch (error) {
      console.error('Error adding equipment:', error)
      alert('Failed to add equipment')
    }
  }

  return (
    <div>
      <h2>Add New Equipment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Equipment Name:
          <input
            type="text"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Stock Quantity:
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
        </label>
        <br />
        <label>
          Discount ID:
          <input type="text" value={discountId} onChange={(e) => setDiscountId(e.target.value)} />
        </label>
        <br />
        <label>
          Equipment Type ID:
          <input
            type="number"
            value={equipmentTypeId}
            onChange={(e) => setEquipmentTypeId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Vendor ID:
          <input
            type="number"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Stock ID:
          <input
            type="number"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Equipment</button>
      </form>
    </div>
  )
}

export default AddEquipment
