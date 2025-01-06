import React, { useState } from 'react'
import UserCard from './UserCard'
import styles from '../../../../style/ManStyle.module.css'
import PropTypes from 'prop-types'

const RetainshopSection = ({
  retainshopName,
  employees,
  sortOption,
  toggleStatus,
  roles,
  onUpdateRole,
}) => {
  const [titleColor, setTitleColor] = useState('#000') // Màu mặc định là đen (#000)

  const handleColorChange = (event) => {
    setTitleColor(event.target.value) // Cập nhật màu sắc dựa trên lựa chọn
  }

  const sortEmployees = (employees) => {
    return [...employees].sort((a, b) => {
      if (sortOption === 'name') {
        return a.fullName.localeCompare(b.fullName)
      } else if (sortOption === 'status') {
        return b.status - a.status // Sắp xếp Active trước, Inactive sau
      } else if (sortOption === 'role') {
        const roleA = roles.find((role) => role.roleId === a.employeeRoleId)?.roleName || ''
        const roleB = roles.find((role) => role.roleId === b.employeeRoleId)?.roleName || ''
        return roleA.localeCompare(roleB) // Sắp xếp theo tên Role
      }
      return 0
    })
  }

  return (
    <div className={styles.agency}>
      <div className={styles.retainshopHeader}>
        <h2 style={{ color: titleColor }}>{retainshopName}</h2>
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
            toggleStatus={() => toggleStatus(retainshopName, employee)}
            onUpdateRole={onUpdateRole} // Gọi hàm xử lý khi thay đổi role
          />
        ))}
      </div>
    </div>
  )
}

RetainshopSection.propTypes = {
  retainshopName: PropTypes.string.isRequired,
  employees: PropTypes.array.isRequired,
  sortOption: PropTypes.string.isRequired,
  toggleStatus: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  onUpdateRole: PropTypes.func.isRequired,
}

export default RetainshopSection
