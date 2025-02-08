/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipmentTypes, updateEquipmentType } from "../../../redux/equipment/equipmentTypeSlice";
import BtnModal from "../../../components/button/BtnModal";

const EquipmentTypeList = () => {
  const dispatch = useDispatch();
  const equipmentTypes = useSelector((state) => state.equipmentTypes.items);
  const [isEditing, setIsEditing] = useState(null);
  const [newTypeName, setNewTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchEquipmentTypes());
  }, [dispatch]);

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
      await dispatch(updateEquipmentType({ equipmentTypeId, typeName: newTypeName })).unwrap();
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
      <div className="d-flex justify-content-between">
        <h2>Equipment Types</h2>
        <BtnModal name="Create New Equipment Type" iform="EquipmentTypeCreateForm" style="primary" />
      </div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Type Name</th>
            <th>Provider</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {equipmentTypes.length > 0 ? (
            equipmentTypes.map((type) => (
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
                {/* <td>
                  {isEditing === type.equipmentTypeId ? (
                    <>
                      <button className="btn btn-outline-danger m-1" onClick={handleCancel} disabled={isLoading}>
                        Cancel
                      </button>
                      <button className="btn btn-outline-success" onClick={() => handleUpdate(type.equipmentTypeId)} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Accept"}
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-outline-info" onClick={() => {
                      setIsEditing(type.equipmentTypeId);
                      setNewTypeName(type.typeName);
                    }} disabled={isLoading}>
                      Update
                    </button>
                  )}
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "red" }}>No equipment types found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(EquipmentTypeList);
