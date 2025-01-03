/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// components/AgencySection.js
import React from "react";
import UserCard from "./UserCard";
import styles from "../../../../style/ManStyle.module.css";

const AgencySection = ({ agencyName, users, sortOption, toggleStatus }) => {
  // Sắp xếp user dựa trên sortOption
  const sortUsers = (users) => {
    return [...users].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  return (
    <div className={styles.agency}>
      <h2>{agencyName}</h2>
      <div className={styles.cards}>
        {sortUsers(users).map((user, index) => (
          <UserCard
            key={index}
            user={user}
            toggleStatus={() => toggleStatus(agencyName, user.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgencySection;
