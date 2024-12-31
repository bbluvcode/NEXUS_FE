/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// components/UserCard.js
import React from "react";
import styles from "../../../../style/ManStyle.module.css";

const UserCard = ({ user }) => (
    <div
        className={`${styles.card} ${user.status === "active" ? styles.active : styles.inactive}`}
    >
        <div className={styles.image}></div>
        <p>{user.name}</p>
        <select className={styles.role}>
            <option>{user.role}</option>
        </select>
        <button
            className={`${styles.buttonSt} ${user.status === "active" ? styles.buttonStActive : styles.buttonStInactive}`}
        >
            <span>Deactivate</span> {/* Chỉ hiển thị "Alternate text" */}
        </button>
    </div>
);

export default UserCard;
