/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEquipmentType } from "../../../constant/apiConstant";

const EquipmentTypeList = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(apiEquipmentType);
      console.log("API Response:", response.data);

      // Ensure the data is extracted properly from the API response
      const { data } = response.data; // Assuming 'data' is nested in the API response
      setEquipmentTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching equipment types:", error);
      setEquipmentTypes([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Equipment Types</h1>
      <ul>
        {equipmentTypes.length > 0 ? (
          equipmentTypes.map((type) => (
            <li key={type.equipmentTypeId || `equipment-type-${type.typeName}`}>
              <h2>Type Name: {type.typeName || "N/A"}</h2>
              <p>Provider: {type.provider || "N/A"}</p>
            </li>
          ))
        ) : (
          <p>No equipment types available.</p>
        )}
      </ul>
    </div>
  );
};

export default EquipmentTypeList;
