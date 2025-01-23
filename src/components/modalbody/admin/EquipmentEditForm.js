import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchEquipments, updateEquipment } from '../../../redux/equipment/equipmentSlice'
import BtnModal from '../../../components/button/BtnModal'

const EquipmentEditForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { equipment, status, error } = useSelector((state) => state.equipments)
  const [equipmentDetails, setEquipmentDetails] = useState(equipment || {})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle' && id) {
      dispatch(fetchEquipments())
    }
  }, [dispatch, status, id])

  useEffect(() => {
    if (id) {
      const equipmentItem = equipment.find((item) => item.EquipmentId === parseInt(id))
      if (equipmentItem) setEquipmentDetails(equipmentItem)
    }
  }, [equipment, id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEquipmentDetails({ ...equipmentDetails, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    setEquipmentDetails({ ...equipmentDetails, Status: e.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateEquipment({ id, equipment: equipmentDetails }))
      alert('Equipment updated successfully!')
      if (isModalOpen) setIsModalOpen(false)
    } catch (error) {
      console.error('Error updating equipment:', error)
      alert('Failed to update equipment')
    }
  }

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  return (
    <div>
      <h2>Edit Equipment</h2>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && (
        <div style={{ color: 'red' }}>{error || 'Failed to load equipment details.'}</div>
      )}

      {status === 'succeeded' && equipmentDetails && (
        <form onSubmit={handleSubmit}>
          <label>
            Equipment Name:
            <input
              type="text"
              name="EquipmentName"
              value={equipmentDetails.EquipmentName}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              name="Price"
              value={equipmentDetails.Price}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Stock Quantity:
            <input
              type="number"
              name="StockQuantity"
              value={equipmentDetails.StockQuantity}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="Description"
              value={equipmentDetails.Description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Status:
            <input
              type="checkbox"
              name="Status"
              checked={equipmentDetails.Status}
              onChange={handleCheckboxChange}
            />
          </label>
          <br />
          <label>
            Equipment Type ID:
            <input
              type="number"
              name="EquipmentTypeId"
              value={equipmentDetails.EquipmentTypeId}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Vendor ID:
            <input
              type="number"
              name="VendorId"
              value={equipmentDetails.VendorId}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Stock ID:
            <input
              type="number"
              name="StockId"
              value={equipmentDetails.StockId}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <BtnModal name="Save Changes" style="success" onClick={toggleModal} />
        </form>
      )}
    </div>
  )
}

export default EquipmentEditForm
