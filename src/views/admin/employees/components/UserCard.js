/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate từ React Router
import styles from "../../../../style/ManStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user, roles, onUpdateRole, toggleStatus }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm xử lý khi thay đổi vai trò
  const handleRoleChange = (event) => {
    const newRoleId = parseInt(event.target.value, 10);
    if (onUpdateRole) {
      onUpdateRole(user.employeeId, newRoleId);
    }
  };

  // Hàm điều hướng khi click vào card, nhưng không được gọi khi click vào select
  const handleCardClick = (e) => {
    // Nếu click vào select, không điều hướng
    if (e.target.tagName !== 'SELECT') {
      navigate(`/admin/EmployeeDetail/${user.employeeId}`);  // Chuyển hướng đến trang chi tiết của người dùng
    }
  };

  return (
    <div
      className={`${styles.card} ${user.status ? styles.active : styles.inactive}`}
      onClick={handleCardClick}  // Bắt sự kiện click trên card
    >
      <div className={styles.name}>{user.fullName}</div>
      {user.employeeRoleId === 1 ? (
        <div className={styles.role}>
          <FontAwesomeIcon icon={faCrown} style={{ color: "#FFD700" }} />
        </div>
      ) : (
        <select
          className={styles.role}
          value={user.employeeRoleId}
          onChange={handleRoleChange}
        >
          {roles.map((role) => (
            <option
              key={role.roleId}
              value={role.roleId}
              disabled={role.roleId === 1 && user.employeeRoleId !== 1}
            >
              {role.roleName}
            </option>
          ))}
        </select>
      )}
      <button
        className={`${styles.buttonSt} ${user.status ? styles.buttonStActive : styles.buttonStInactive}`}
        onClick={(e) => {
          e.stopPropagation();  // Ngăn sự kiện click trên button ảnh hưởng đến sự kiện click của card
          toggleStatus();
        }}
      >
        <span>{user.status ? "Deactivate" : "Activate"}</span>
      </button>
    </div>
  );
};

export default UserCard;
