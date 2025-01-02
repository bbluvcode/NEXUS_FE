/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// components/UserCard.js
import React from "react";
import styles from "../../../../style/ManStyle.module.css";

const UserCard = ({ user, toggleStatus }) => (
  <div
    className={`${styles.card} ${user.status === "active" ? styles.active : styles.inactive}`}
  >
    <div className={styles.image}></div>
    <div className={styles.name}>{user.name}</div>
    <select className={styles.role}>
      <option>{user.role}</option>
    </select>
    <button
      className={`${styles.buttonSt} ${user.status === "active" ? styles.buttonStActive : styles.buttonStInactive}`}
      onClick={toggleStatus}
    >
        <span>{user.status === "active" ? "Deactivate" : "Activate"}</span> 
    </button>
  </div>
);

export default UserCard;
