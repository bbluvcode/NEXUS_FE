import React, { useState, useEffect } from 'react'
import { getAllEmployeeRoles } from '../../../services/employeeService'
import EmployeeTypeList from './components/EmployeeTypeList'
import EmployeeTypeCreate from './components/EmployeeTypeCreate'

const EmployeeType = () => {
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [activeTab, setActiveTab] = useState('list') // 'list' or 'create'

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await getAllEmployeeRoles()
        setEmployeeTypes(response.data)
      } catch (error) {
        console.error('Error fetching employee types', error)
      }
    }

    fetchEmployeeTypes()
  }, [])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Employee Types</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
              href="#"
            >
              List
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
              href="#"
            >
              Create
            </a>
          </li>
        </ul>
      </div>

      {activeTab === 'list' ? (
        <EmployeeTypeList employeeTypes={employeeTypes} setEmployeeTypes={setEmployeeTypes} />
      ) : (
        <EmployeeTypeCreate setEmployeeTypes={setEmployeeTypes} setActiveTab={setActiveTab} />
      )}
    </div>
  )
}

export default EmployeeType
