// components/SearchBar.js
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'
import styles from '../../../../style/ManStyle.module.css'
import PropTypes from 'prop-types'

const SearchBar = ({
  isSearchVisible,
  handleSearchClick,
  handleSearchChange, // Prop mới để xử lý sự kiện thay đổi input
  handleSaveChanges,
  handleResetChanges,
}) => (
  <div className={styles.header}>
    <button className={styles.button} onClick={handleSaveChanges}>
      Save
    </button>
    <button className={styles.button} onClick={handleResetChanges}>
      Reset
    </button>
    <div className="searchBar">
      <CIcon
        icon={isSearchVisible ? cilX : cilSearch}
        className={`${styles.searchIcon} ${isSearchVisible ? styles.iconActive : ''}`}
        onClick={handleSearchClick}
      />
      <input
        type="text"
        placeholder="Search"
        className={`${styles.search} ${isSearchVisible ? styles.show : ''}`}
        onChange={handleSearchChange} // Gọi hàm xử lý khi nhập text
      />
    </div>
  </div>
)
SearchBar.propTypes = {
  isSearchVisible: PropTypes.bool.isRequired,
  handleSearchClick: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleResetChanges: PropTypes.func.isRequired,
}

export default SearchBar
