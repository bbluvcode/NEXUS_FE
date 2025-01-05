/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../../../style/ManStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user, roles, onUpdateRole, toggleStatus }) => {
  const handleRoleChange = (event) => {
    const newRoleId = parseInt(event.target.value, 10);
    if (onUpdateRole) {
      onUpdateRole(user.employeeId, newRoleId);
    }
  };

  return (
    <div
      className={`${styles.card} ${user.status ? styles.active : styles.inactive}`}
    >
      {/* <div className={styles.image}></div> */}
      <div className={styles.name}>{user.fullName}</div>
      {user.employeeRoleId === 1 ? (
        <div className={styles.role}><FontAwesomeIcon icon={faCrown} style={{ color: "#FFD700" }} /></div>
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
        className={`${styles.buttonSt} ${user.status ? styles.buttonStActive : styles.buttonStInactive
          }`}
        onClick={toggleStatus}
      >
        <span>{user.status ? "Deactivate" : "Activate"}</span>
      </button>
    </div>
  );
};

export default UserCard;

