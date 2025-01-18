/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import BtnModalCloseSubmit from '../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetEquipment, updateEquipment } from '../../redux/equipment/equipmentSlice'

function EquipmentEditForm(props) {
  const dispatch = useDispatch()

  // Lấy dữ liệu equipment từ Redux
  const equipment = useSelector((state) => state.equipments.equipment)
  const [formData, setFormData] = useState({
    equipmentName: '',
    price: '',
    stockQuantity: '',
    description: '',
    status: '',
    discountId: '',
    equipmentTypeId: '',
    vendorId: '',
    stockId: '',
  })

  // Cập nhật formData khi equipment thay đổi
  useEffect(() => {
    if (equipment) {
      setFormData({
        equipmentName: equipment.equipmentName || '',
        price: equipment.price || '',
        stockQuantity: equipment.stockQuantity || '',
        description: equipment.description || '',
        status: equipment.status || '',
        discountId: equipment.discountId || '',
        equipmentTypeId: equipment.equipmentTypeId || '',
        vendorId: equipment.vendorId || '',
        stockId: equipment.stockId || '',
      })
    }
  }, [equipment]) // Dependency array để chạy lại khi equipment thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    dispatch(handleSetEquipment({ ...equipment, [name]: value })) // Đồng bộ lại dữ liệu vào Redux
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Gửi yêu cầu cập nhật thiết bị
    console.log('Submit updated equipment form:', formData)
    console.log('Submit updated equipment:', equipment)
    dispatch(updateEquipment({ id: equipment.equipmentId, equipment }))
  }

  return (
    <div className="equipment-edit-form">
      <h2 className="text-center">Edit Equipment</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="equipmentName" className="form-label">
            Equipment Name
          </label>
          <input
            type="text"
            id="equipmentName"
            name="equipmentName"
            className="form-control"
            value={formData.equipmentName}
            onChange={handleChange}
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
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
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
            name="stockQuantity"
            className="form-control"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="col-md-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-md-6">
          <label htmlFor="discountId" className="form-label">
            Discount ID
          </label>
          <input
            type="text"
            id="discountId"
            name="discountId"
            className="form-control"
            value={formData.discountId}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="equipmentTypeId" className="form-label">
            Equipment Type ID
          </label>
          <input
            type="number"
            id="equipmentTypeId"
            name="equipmentTypeId"
            className="form-control"
            value={formData.equipmentTypeId}
            onChange={handleChange}
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
            name="vendorId"
            className="form-control"
            value={formData.vendorId}
            onChange={handleChange}
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
