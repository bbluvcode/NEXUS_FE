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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [agencies, setAgencies] = useState(data);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleStatus = (agencyName, userName) => {
    const updatedAgencies = agencies.map((agency) => {
      if (agency.agency === agencyName) {
        return {
          ...agency,
          users: agency.users.map((user) =>
            user.name === userName
              ? { ...user, status: user.status === "active" ? "inactive" : "active" }
              : user
          ),
        };
      }
      return agency;
    });
    setAgencies(updatedAgencies);
  };

  const filteredAgencies = agencies.map((agency) => ({
    ...agency,
    users: agency.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    ),
  }));

  return (
    <div className={styles.container}>
      <SearchBar
        isSearchVisible={isSearchVisible}
        handleSearchClick={() => setIsSearchVisible((prev) => !prev)}
        handleSearchChange={handleSearchChange}
      />
      <SortDropdown handleSortChange={handleSortChange} />
      {filteredAgencies.map((agency) => (
        <AgencySection
          key={agency.agency}
          agencyName={agency.agency}
          users={agency.users}
          sortOption={sortOption}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default EmployeesList;
