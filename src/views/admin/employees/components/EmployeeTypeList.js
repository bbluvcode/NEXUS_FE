/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateEmployeeRole } from '../../../../services/employeeService'

const EmployeeTypeList = ({ employeeTypes, setEmployeeTypes }) => {
  const [isEditing, setIsEditing] = useState(null)
  const [newRoleName, setNewRoleName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleNameChange = (event) => {
    setNewRoleName(event.target.value)
  }

  const handleUpdate = async (employeeId, newRoleId) => {
    const isRoleNameDuplicate = employeeTypes.some(
      (type) => type.roleName === newRoleName && type.roleId !== employeeId
    )

    if (isRoleNameDuplicate) {
      alert('The role name already exists. Please choose a different name.')
      setIsEditing(null)
      return
    }

    try {
      setIsLoading(true)
      const updatedEmployee = await updateEmployeeRole(employeeId, newRoleId, newRoleName)
      setEmployeeTypes((prevEmployeeTypes) =>
        prevEmployeeTypes.map((type) =>
          type.roleId === employeeId
            ? { ...type, roleId: updatedEmployee.roleId, roleName: updatedEmployee.roleName }
            : type
        )
      )
      setIsEditing(null)
      setNewRoleName('')
    } catch (error) {
      console.error('Failed to update employee role:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(null)
    setNewRoleName('')
  }

  const handleAccept = (employeeId) => {
    handleUpdate(employeeId, employeeId)
  }

  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeTypes.map((type) => (
            <tr key={type.roleId}>
              <td>{type.roleId}</td>
              <td>
                {isEditing === type.roleId ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newRoleName || type.roleName}
                    onChange={handleRoleNameChange}
                    disabled={isLoading}
                  />
                ) : (
                  type.roleName
                )}
              </td>
              <td>
                {type.roleId !== 1 && (
                  <>
                    {isEditing === type.roleId ? (
                      <>
                        <button
                          className="btn btn-outline-danger m-1"
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleAccept(type.roleId)}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Saving...' : 'Accept'}
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-outline-info"
                        onClick={() => {
                          setIsEditing(type.roleId)
                          setNewRoleName(type.roleName)
                        }}
                        disabled={isLoading}
                      >
                        Update
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

EmployeeTypeList.propTypes = {
  employeeTypes: PropTypes.arrayOf(
    PropTypes.shape({
      roleId: PropTypes.number.isRequired,
      roleName: PropTypes.string.isRequired,
    })
  ).isRequired,
  setEmployeeTypes: PropTypes.func.isRequired,
}

export default EmployeeTypeList
