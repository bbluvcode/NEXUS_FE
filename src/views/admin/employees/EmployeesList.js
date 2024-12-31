/* eslint-disable prettier/prettier */
// EmployeesList.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import AgencySection from "./components/AgencySection";
import styles from "../../../style/ManStyle.module.css";

const data = [
  {
    agency: "Agency1",
    users: [
      { name: "Name1", status: "active", role: "Role1" },
      { name: "Name2", status: "active", role: "Role2" },
      { name: "Name3", status: "active", role: "Role3" },
      { name: "Name4", status: "active", role: "Role4" },
    ],
  },
  {
    agency: "Agency2",
    users: [
      { name: "Name5", status: "inactive", role: "Role5" },
      { name: "Name6", status: "inactive", role: "Role6" },
      { name: "Name7", status: "inactive", role: "Role7" },
      { name: "Name8", status: "inactive", role: "Role8" },
    ],
  },
];

const EmployeesList = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [sortOption, setSortOption] = useState("name");

  const handleSearchClick = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <SearchBar isSearchVisible={isSearchVisible} handleSearchClick={handleSearchClick} />
      <SortDropdown handleSortChange={handleSortChange} />
      {data.map((agency) => (
        <AgencySection key={agency.agency} agency={agency} sortOption={sortOption} />
      ))}
    </div>
  );
};

export default EmployeesList;
