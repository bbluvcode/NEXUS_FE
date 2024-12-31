/* eslint-disable prettier/prettier */
// components/SearchBar.js
import React from "react";
import CIcon from "@coreui/icons-react";
import { cilSearch, cilX } from "@coreui/icons";
import styles from "../../../../style/ManStyle.module.css";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ isSearchVisible, handleSearchClick }) => (
    <div className={styles.header}>
        <button className={styles.button}>Save</button>
        <button className={styles.button}>Reset</button>
        <div className="searchBar">
            <CIcon
                icon={isSearchVisible ? cilX : cilSearch} // Thay đổi icon khi isSearchVisible = true
                className={`${styles.searchIcon} ${isSearchVisible ? styles.iconActive : ""}`}
                onClick={handleSearchClick}
            />
            <input
                type="text"
                placeholder="Search"
                className={`${styles.search} ${isSearchVisible ? styles.show : ""}`}
            />
        </div>
    </div>
);

export default SearchBar;
