import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleSetEquipment, updateEquipment } from '../../../redux/equipment/equipmentSlice'
import BtnModalCloseSubmit from '../../../components/button/BtnModalCloseSubmit'

const EquipmentEditForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const equipment = useSelector((state) => state.equipments.equipment)

  const [formData, setFormData] = useState({
    EquipmentName: '',
    Price: '',
    StockQuantity: '',
    Status: false,
    DiscountId: '',
    Description: '',
    EquipmentTypeId: '',
    VendorId: '',
    StockId: '',
  })

  useEffect(() => {
    if (equipment && id) {
      setFormData({
        EquipmentName: equipment.EquipmentName || '',
        Price: equipment.Price || '',
        StockQuantity: equipment.StockQuantity || '',
        Status: equipment.Status || false,
        DiscountId: equipment.DiscountId || '',
        Description: equipment.Description || '',
        EquipmentTypeId: equipment.EquipmentTypeId || '',
        VendorId: equipment.VendorId || '',
        StockId: equipment.StockId || '',
      })
    }
  }, [equipment, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    dispatch(handleSetEquipment({ ...equipment, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, Status: e.target.checked })
    dispatch(handleSetEquipment({ ...equipment, Status: e.target.checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateEquipment({ id, equipment: formData }))
  }

  return (
    <div className="equipment-edit-form">
      <h2 className="text-center">Edit Equipment</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Equipment Name</label>
          <input
            type="text"
            name="EquipmentName"
            className="form-control"
            value={formData.EquipmentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            step="0.01"
            name="Price"
            className="form-control"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="StockQuantity"
            className="form-control"
            value={formData.StockQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Status</label>
          <input
            type="checkbox"
            name="Status"
            checked={formData.Status}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Discount ID</label>
          <input
            type="text"
            name="DiscountId"
            className="form-control"
            value={formData.DiscountId}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <textarea
            name="Description"
            className="form-control"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Equipment Type ID</label>
          <input
            type="number"
            name="EquipmentTypeId"
            className="form-control"
            value={formData.EquipmentTypeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Vendor ID</label>
          <input
            type="number"
            name="VendorId"
            className="form-control"
            value={formData.VendorId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock ID</label>
          <input
            type="number"
            name="StockId"
            className="form-control"
            value={formData.StockId}
            onChange={handleChange}
            required
          />
        </div>

        <BtnModalCloseSubmit />
      </form>
    </div>
  )
}

export default React.memo(EquipmentEditForm)
