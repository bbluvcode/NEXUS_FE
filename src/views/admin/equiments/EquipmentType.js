/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipmentTypes, handleSetEquipmentType } from '../../../redux/equipment/equipmentTypeSlice';
import BtnModal from '../../../components/button/BtnModal';

const EquipmentType = () => {
  const dispatch = useDispatch();
  const { types, status, error } = useSelector((state) => state.equipmentTypes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEquipmentTypes());
    }
  }, [dispatch, status]);

  const handleEditType = (type) => {
    dispatch(handleSetEquipmentType(type));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Equipment Types</h2>
        <BtnModal name="Add New Type" iform="EquipmentTypeCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'red' }}>
                  {error || 'Failed to load data.'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && types?.length > 0 ? (
              types.map((type, index) => (
                <tr key={index}>
                  <td>{type.TypeName}</td>
                  <td>{type.Provider}</td>
                  <td>
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="EquipmentTypeEditForm"
                      style="warning"
                      equipmentType={type}
                      onClick={() => handleEditType(type)}
                    />
                  </td>
                </tr>
              ))
            ) : status === 'succeeded' && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'red' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(EquipmentType);
