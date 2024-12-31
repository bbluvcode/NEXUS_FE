/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// components/AgencySection.js
import React from "react";
import UserCard from "./UserCard";
import styles from "../../../../style/ManStyle.module.css";

const AgencySection = ({ agency, sortOption }) => {
  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "price") {
        return a.price - b.price;
      }
      return 0;
    });
  };

  return (
    <div key={agency.agency} className={styles.agency}>
      <h2>{agency.agency}</h2>
      <div className={styles.cards}>
        {sortUsers(agency.users).map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AgencySection;