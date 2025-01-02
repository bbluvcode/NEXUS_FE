/* eslint-disable prettier/prettier */
// components/SortDropdown.js
import React from "react";
import styles from "../../../../style/ManStyle.module.css";

// eslint-disable-next-line react/prop-types
const SortDropdown = ({ handleSortChange }) => (
  <div>
    <div className={styles.customselect}>
      <select id="sortOptions"  onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>
    </div>
  </div>
);

export default SortDropdown;
