/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

const AddEquipment = () => {
  const [newEquipment, setNewEquipment] = useState({
    EquipmentName: '',
    Price: '',
    StockQuantity: '',
    Description: '',
    TypeId: '',
    DiscountId: '',
  })

  const handleAddEquipment = () => {
    if (!newEquipment.EquipmentName || !newEquipment.Price || !newEquipment.TypeId) {
      alert('Please fill in all required fields.')
      return
    }

    console.log('Equipment Details:', newEquipment)
    alert('Equipment added successfully!')

    setNewEquipment({
      EquipmentName: '',
      Price: '',
      StockQuantity: '',
      Description: '',
      TypeId: '',
      DiscountId: '',
    })
  }

  const fieldLabels = {
    EquipmentName: 'Equipment Name (Required)',
    Price: 'Price (Required)',
    StockQuantity: 'Stock Quantity',
    Description: 'Description',
    TypeId: 'Type ID (Required)',
    DiscountId: 'Discount ID',
  }

  const isButtonDisabled = `!newEquipment.EquipmentName || !newEquipment.Price || !newEquipment.TypeId`

  return (
    <div>
      <h1>Add New Equipment</h1>
      {Object.keys(newEquipment).map((key) => (
        <div key={key}>
          <label>{fieldLabels[key]}</label>
          <br />
          <input
            type={key === 'Price' || key === 'StockQuantity' ? 'number' : 'text'}
            placeholder={fieldLabels[key]}
            value={newEquipment[key]}
            onChange={(e) => setNewEquipment({ ...newEquipment, [key]: e.target.value })}
          />
          <br />
        </div>
      ))}
      <button onClick={handleAddEquipment} className='btn btn-primary' disabled={isButtonDisabled}>
        Add Equipment
      </button>
    </div>
  )
}

export default AddEquipment
