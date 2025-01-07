import React, { useState } from 'react'
import UserCard from './UserCard'
import styles from '../../../../style/ManStyle.module.css'
import PropTypes from 'prop-types'

const RetailshopSection = ({
  retailshopName,
  employees,
  sortOption,
  toggleStatus,
  roles,
  onUpdateRole,
}) => {
  const [titleColor, setTitleColor] = useState('') // Màu mặc định là đen (#000)

  const handleColorChange = (event) => {
    setTitleColor(event.target.value) // Cập nhật màu sắc dựa trên lựa chọn
  }

  const sortEmployees = (employees) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (sortOption === 'name') {
        return a.fullName.localeCompare(b.fullName)
      }
      if (sortOption === 'status') {
        return a.status === true && b.status !== true ? -1 : 1
      }
      if (sortOption === 'role') {
        const roleA = roles.find((role) => role.roleId === a.employeeRoleId)?.roleName || 'Z'
        const roleB = roles.find((role) => role.roleId === b.employeeRoleId)?.roleName || 'Z'
        return roleA.localeCompare(roleB)
      }
      return 0
    })
    return sortedEmployees
  }

  return (
    <div className={styles.agency}>
      <div className={styles.retailshopHeader}>
        <h2 style={{ color: titleColor }}>{retailshopName}</h2>
        <button className={styles.colorPickerButton}>
          <input
            type="color"
            value={titleColor}
            onChange={handleColorChange}
            className={styles.colorPickerInput}
          />
        </button>
      </div>
      <div className={styles.divider}></div> {/* Đường thẳng phân cách */}
      <div className={styles.cards}>
        {sortEmployees(employees).map((employee) => (
          <UserCard
            key={employee.employeeId}
            user={employee}
            roles={roles} // Truyền danh sách roles
            toggleStatus={() => toggleStatus(retailshopName, employee)}
            onUpdateRole={onUpdateRole} // Gọi hàm xử lý khi thay đổi role
          />
        ))}
      </div>
    </div>
  )
}

RetailshopSection.propTypes = {
  retailshopName: PropTypes.string.isRequired,
  employees: PropTypes.array.isRequired,
  sortOption: PropTypes.string.isRequired,
  toggleStatus: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  onUpdateRole: PropTypes.func.isRequired,
}

export default RetailshopSection
