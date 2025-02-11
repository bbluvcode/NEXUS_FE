import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BtnModalCloseSubmit from '../../../components/button/BtnModalCloseSubmit'
import { handleSetEquipment, updateEquipment } from '../../../redux/equipment/equipmentSlice'

const EquipmentEditForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const equipment = useSelector((state) => state.equipments.equipment)

  const [formData, setFormData] = useState({
    equipmentName: '',
    price: '',
    stockQuantity: '',
    description: '',
    status: false,
    discountId: '',
    equipmentTypeId: '',
    vendorId: '',
    stockId: '',
  })

  useEffect(() => {
    if (equipment) {
      setFormData({
        equipmentName: equipment.equipmentName || '',
        price: equipment.price || '',
        stockQuantity: equipment.stockQuantity || '',
        description: equipment.description || '',
        status: equipment.status || false,
        discountId: equipment.discountId || '',
        equipmentTypeId: equipment.equipmentTypeId || '',
        vendorId: equipment.vendorId || '',
        stockId: equipment.stockId || '',
      })
    }
  }, [equipment])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    dispatch(handleSetEquipment({ ...equipment, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    setFormData((prevState) => ({ ...prevState, status: e.target.checked }))
    dispatch(handleSetEquipment({ ...equipment, status: e.target.checked }))
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
            name="equipmentName"
            className="form-control"
            value={formData.equipmentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            className="form-control"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Discount ID</label>
          <input
            type="text"
            name="discountId"
            className="form-control"
            value={formData.discountId}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Equipment Type ID</label>
          <input
            type="number"
            name="equipmentTypeId"
            className="form-control"
            value={formData.equipmentTypeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Vendor ID</label>
          <input
            type="number"
            name="vendorId"
            className="form-control"
            value={formData.vendorId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock ID</label>
          <input
            type="number"
            name="stockId"
            className="form-control"
            value={formData.stockId}
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
