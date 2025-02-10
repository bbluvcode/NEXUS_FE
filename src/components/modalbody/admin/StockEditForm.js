/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { setStock, updateStock } from '../../../redux/stock/stockSlice'

function StockEditForm() {
  const dispatch = useDispatch()

  const stock = useSelector((state) => state.stocks.stock)
  const [formData, setFormData] = useState({
    stockName: '',
    address: '',
    email: '',
    phone: '',
    fax: '',
    regionId: '',
  })

  useEffect(() => {
    if (stock) {
      setFormData({
        stockName: stock.stockName || '',
        address: stock.address || '',
        email: stock.email || '',
        phone: stock.phone || '',
        fax: stock.fax || '',
        regionId: stock.regionId || '',
      })
    }
  }, [stock])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    dispatch(setStock({ ...stock, [name]: value })) 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit updated stock form:', formData)
    dispatch(updateStock({ id: stock.stockId, stock: formData }))
  }

  return (
    <div className="stock-edit-form">
      <h2 className="text-center">Edit Stock</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="stockName" className="form-label">Stock Name</label>
          <input
            type="text"
            id="stockName"
            name="stockName"
            className="form-control"
            value={formData.stockName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="fax" className="form-label">Fax</label>
          <input
            type="text"
            id="fax"
            name="fax"
            className="form-control"
            value={formData.fax}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="regionId" className="form-label">Region ID</label>
          <input
            type="number"
            id="regionId"
            name="regionId"
            className="form-control"
            value={formData.regionId}
            onChange={handleChange}
            required
          />
        </div>

        <BtnModalCloseSubmit />
      </form>
    </div>
  )
}

export default React.memo(StockEditForm)
