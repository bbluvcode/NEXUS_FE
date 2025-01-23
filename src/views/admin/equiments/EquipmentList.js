/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments, handleSetEquipment } from '../../../redux/equipment/equipmentSlice';
import BtnModal from '../../../components/button/BtnModal';

const EquipmentList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.equipments);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEquipments());
    }
  }, [dispatch, status]);

  const handleEditEquipment = (equipment) => {
    dispatch(handleSetEquipment(equipment));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Equipment List</h2>
        <BtnModal name="Add New Equipment" iform="EquipmentCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Type</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', color: 'red' }}>
                  {error || 'Failed to load data.'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && items?.length > 0 ? (
              items.map((item) => (
                <tr key={item.equipmentId}>
                  <td>{item.equipmentId}</td>
                  <td>{item.equipmentName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.stockQuantity}</td>
                  <td>{item.description || 'N/A'}</td>
                  <td>{item.equipmentType?.typeName || 'Unknown'}</td>
                  <td>{item.vendor?.vendorName || 'Unknown'}</td>
                  <td>{item.status ? 'Active' : 'Inactive'}</td>
                  <td>{item.discount?.discountName || 'No Discount'}</td>
                  <td>
                    <div className="btn-group">
                      <BtnModal
                        name={<i className="fa fa-edit"></i>}
                        iform="EquipmentEditForm"
                        style="warning"
                        equipment={item}
                        onClick={() => handleEditEquipment(item)}
                      />
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(handleDeleteEquipment(item.equipmentId))}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : status === 'succeeded' && (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', color: 'red' }}>
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

export default React.memo(EquipmentList);
