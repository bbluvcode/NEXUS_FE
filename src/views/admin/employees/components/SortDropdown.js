// components/SortDropdown.js
import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../../../style/ManStyle.module.css'

const SortDropdown = ({ handleSortChange }) => (
  <div>
    <div className={styles.customselect}>
      <select id="sortOptions" onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="status">Active/Inactive</option>
        <option value="role">Role</option>
      </select>
    </div>
  </div>
)
SortDropdown.propTypes = {
  handleSortChange: PropTypes.func.isRequired,
}

export default SortDropdown
