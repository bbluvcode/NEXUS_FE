/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiEquipmentType } from "../../../constant/apiConstant";

const EquipmentTypeList = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newTypeName, setNewTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTypeNameChange = (event) => {
    setNewTypeName(event.target.value);
  };

  const handleUpdate = async (equipmentTypeId) => {
    const isDuplicate = equipmentTypes.some(
      (type) =>
        type.typeName.toLowerCase() === newTypeName.toLowerCase() &&
        type.equipmentTypeId !== equipmentTypeId
    );

    if (isDuplicate) {
      alert("The equipment type name already exists. Please choose a different name.");
      setIsEditing(null);
      return;
    }

    try {
      setIsLoading(true);
      // Assuming the API accepts updates via PUT
      await axios.put(`${apiEquipmentType}/${equipmentTypeId}`, { typeName: newTypeName });
      setEquipmentTypes((prevEquipmentTypes) =>
        prevEquipmentTypes.map((type) =>
          type.equipmentTypeId === equipmentTypeId
            ? { ...type, typeName: newTypeName }
            : type
        )
      );
      setIsEditing(null);
      setNewTypeName("");
    } catch (error) {
      console.error("Failed to update equipment type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setNewTypeName("");
  };

  return (
    <div>
      <h1>Equipment Types</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Type Name</th>
            <th>Provider</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {equipmentTypes.map((type) => (
            <tr key={type.equipmentTypeId}>
              <td>{type.equipmentTypeId}</td>
              <td>
                {isEditing === type.equipmentTypeId ? (
                  <input
                    type="text"
                    className="form-control"
                    value={newTypeName || type.typeName}
                    onChange={handleTypeNameChange}
                    disabled={isLoading}
                  />
                ) : (
                  type.typeName
                )}
              </td>
              <td>{type.provider || "N/A"}</td>
              <td>
                {isEditing === type.equipmentTypeId ? (
                  <>
                    <button
                      className="btn btn-outline-danger m-1"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleUpdate(type.equipmentTypeId)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Accept"}
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-info"
                    onClick={() => {
                      setIsEditing(type.equipmentTypeId);
                      setNewTypeName(type.typeName);
                    }}
                    disabled={isLoading}
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTypeList;
