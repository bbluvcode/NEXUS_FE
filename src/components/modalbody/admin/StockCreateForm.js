/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import axios from 'axios'
import { apiStock } from '../../../constant/apiConstant'
import { useDispatch } from 'react-redux'
import { fetchStocks } from '../../../redux/stock/stockSlice'

const StockCreateForm = ({ onSuccess }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    stockName: '',
    address: '',
    email: '',
    phone: '',
    fax: '',
    region: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(apiStock, formData)
      alert('Stock created successfully!')
      if (onSuccess) {
        onSuccess() // Close modal after success
      } else {
        dispatch(fetchStocks()) // Refresh stocks if no onSuccess
      }
    } catch (error) {
      console.error('Error creating stock:', error)
      alert('Failed to create stock')
    }
  }

  return (
    <div>
      <h2>Create New Stock</h2>
      <form onSubmit={handleSubmit} id="StockCreateForm">
        <label>
          Stock Name:
          <input
            type="text"
            name="stockName"
            value={formData.stockName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Fax:
          <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
        </label>
        <br />
        <label>
          Region:
          <input type="text" name="region" value={formData.region} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">
          Create Stock
        </button>
      </form>
    </div>
  )
}

export default StockCreateForm
