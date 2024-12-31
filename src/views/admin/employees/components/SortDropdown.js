/* eslint-disable prettier/prettier */
// components/SortDropdown.js
import React from "react";
import styles from "../../../../style/ManStyle.module.css";

// eslint-disable-next-line react/prop-types
const SortDropdown = ({ handleSortChange }) => (
    <div className={styles.dropdown}>
        <label htmlFor="sortOptions" className={styles.sortLabel}>Sort By</label>
    <select id="sortOptions" className={styles.sortSelect} onChange={handleSortChange}>
      <option value="name">Name</option>
      <option value="date">Date</option>
      <option value="price">Price</option>
    </select>
    </div>
);

export default SortDropdown;
