/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInStockOrders, handleSetInStockOrder } from '../../../redux/inStockOrder/inStockOrderSlice';
import BtnModal from '../../../components/button/BtnModal';

const InStockOrder = () => {
  const dispatch = useDispatch();
  const inStockOrders = useSelector((state) => state.inStockOrders?.items || []);


  useEffect(() => {
    dispatch(fetchInStockOrders());
  }, [dispatch]);

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

  const handleEditInStockOrder = (order) => {
    dispatch(handleSetInStockOrder(order));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of In-Stock Orders</h2>
        <BtnModal name="Create New In-Stock Order" iform="InStockOrderCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Instock Date</th>
              <th>Pay Date</th>
              <th>Total</th>
              <th>Tax</th>
              <th>Currency</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inStockOrders.length > 0 ? (
              inStockOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.inStockOrderId}</td>
                  <td>{order.vendorName}</td>
                  <td>{formatDateSystem(order.instockDate)}</td>
                  <td>{formatDateSystem(order.payDate)}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{formatCurrency(order.tax)}</td>
                  <td>{order.currencyUnit}</td>
                  <td>{order.isPay ? 'Paid' : 'Pending'}</td>
                  <td onClick={() => handleEditInStockOrder(order)}>
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="InStockOrderEditForm"
                      style="warning"
                      order={order}
                    />
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

export default React.memo(InStockOrder);
