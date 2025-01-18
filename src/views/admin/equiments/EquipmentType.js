/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
const EquipmentType = () => {
  const [types, setTypes] = useState([])
  const [newType, setNewType] = useState({ TypeName: '', Provider: '' })

  const handleAddType = () => {
    if (!newType.TypeName || !newType.Provider) {
      alert('Please fill in all fields.')
      return
    }

    const newTypeWithId = {
      ...newType,
      TypeId: types.length > 0 ? types[types.length - 1].TypeId + 1 : 1,
    }
    setTypes([...types, newTypeWithId])

    setNewType({ TypeName: '', Provider: '' })
    alert('Equipment type added successfully!')
  }

  const handleDeleteType = (id) => {
    setTypes(types.filter((type) => type.TypeId !== id))
    alert('Equipment type deleted successfully!')
  }

  return (
    <div>
      <h1>Equipment Types</h1>
      {types.length === 0 ? (
        <p>No equipment types found.</p>
      ) : (
        <ul>
          {types.map((type) => (
            <li key={type.TypeId}>
              {type.TypeName} ({type.Provider})
              <button onClick={() => handleDeleteType(type.TypeId)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Add New Type</h2>
        <input
          type="text"
          placeholder="Type Name"
          value={newType.TypeName}
          onChange={(e) => setNewType({ ...newType, TypeName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Provider"
          value={newType.Provider}
          onChange={(e) => setNewType({ ...newType, Provider: e.target.value })}
        />
   
        <button onClick={handleAddType} className='btn btn-primary' >
          <CIcon icon={cilPlus}/>
        </button>
      </div>
    </div>
  )
}

export default EquipmentType
