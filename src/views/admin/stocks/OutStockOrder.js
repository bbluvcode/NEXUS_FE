/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOutStockOrders, handleSetOutStockOrder } from '../../../redux/outStockOrder/outStockOrderSlice';
import BtnModal from '../../../components/button/BtnModal';

const OutStockOrder = () => {
  const dispatch = useDispatch();
  const outStockOrders = useSelector((state) => state.outStockOrders?.items || []);

  useEffect(() => {
    dispatch(fetchOutStockOrders());
  }, [dispatch]);

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

  const handleEditOutStockOrder = (order) => {
    dispatch(handleSetOutStockOrder(order));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Out-Stock Orders</h2>
        <BtnModal name="Create New Out-Stock Order" iform="OutStockOrderCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th>Order ID</th> */}
              <th>Stock</th>
              <th>Employee</th>
              <th>Create Date</th>
              <th>Pay Date</th>
              <th>Total</th>
              <th>Tax</th>
              <th>Status</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {outStockOrders.length > 0 ? (
              outStockOrders.map((order, index) => (
                <tr key={index}>
                  {/* <td>{order.outStockId}</td> */}
                  <td>{order.stock?.stockName || 'N/A'}</td>
                  <td>{order.employee?.employeeName || 'N/A'}</td>
                  <td>{formatDateSystem(order.createDate)}</td>
                  <td>{formatDateSystem(order.payDate)}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{formatCurrency(order.tax)}</td>
                  <td>{order.isPay ? 'Paid' : 'Pending'}</td>
                  <td onClick={() => handleEditOutStockOrder(order)}>
                    {/* <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="OutStockOrderEditForm"
                      style="warning"
                      order={order}
                    /> */}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', color: 'red' }}>
                    No data available
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(OutStockOrder);
