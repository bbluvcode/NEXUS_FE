/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, handleSetStock } from '../../../redux/stock/stockSlice';
import BtnModal from '../../../components/button/BtnModal';

const StockList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStocks());
    }
  }, [dispatch, status]);

  const handleEditStock = (stock) => {
    dispatch(handleSetStock(stock));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Stock List</h2>
        <BtnModal name="Add New Stock" iform="StockCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Region</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                  {error || 'Failed to load data.'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && items?.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.stockName}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.fax}</td>
                  <td>{item.region?.regionName || 'Unknown'}</td>
                  <td>
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="StockEditForm"
                      style="warning"
                      stock={item}
                      onClick={() => handleEditStock(item)}
                    />
                  </td>
                </tr>
              ))
            ) : status === 'succeeded' && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
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

export default React.memo(StockList);
