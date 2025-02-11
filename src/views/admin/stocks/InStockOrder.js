/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInStockOrders } from '../../../redux/inStockOrder/inStockOrderSlice';
import { apiVendor } from '../../../constant/apiConstant';
import BtnModal from '../../../components/button/BtnModal';

const InStockOrder = () => {
  const dispatch = useDispatch();
  const inStockOrders = useSelector((state) => state.inStockOrders?.items || []);
  const loading = useSelector((state) => state.inStockOrders?.status === 'loading');

  const [vendors, setVendors] = useState([]); // Đảm bảo vendors khởi tạo là mảng

  useEffect(() => {
    dispatch(fetchInStockOrders());

    const fetchVendors = async () => {
      try {
        const response = await fetch(apiVendor);
        if (!response.ok) throw new Error('Failed to fetch vendors');
        const data = await response.json();
        
        // Đảm bảo dữ liệu vendors luôn là mảng
        setVendors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setVendors([]); // Gán mảng rỗng nếu có lỗi
      }
    };

    fetchVendors();
  }, [dispatch]);

  // Memoized vendor lookup map
  const vendorMap = useMemo(() => {
    if (!Array.isArray(vendors)) return {}; // Đảm bảo vendors là mảng trước khi dùng reduce
    return vendors.reduce((map, vendor) => {
      map[vendor.vendorId] = vendor.vendorName;
      return map;
    }, {});
  }, [vendors]);

  // Format date helper
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  // Format currency helper
  const formatCurrency = (amount) => amount.toLocaleString();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of In-Stock Orders</h2>
        <BtnModal name="Create New In-Stock Order" iform="InStockOrderCreateForm" style="primary" />
      </div>

      {loading ? (
        <div className="text-center">
          <span className="spinner-border text-primary"></span> Loading...
        </div>
      ) : (
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Instock Date</th>
                <th>Pay Date</th>
                <th>Total</th>
                <th>Tax</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inStockOrders.length > 0 ? (
                inStockOrders.map((order) => (
                  <tr key={order.inStockOrderId}>
                    <td>{vendorMap[order.vendorId] || 'Unknown Vendor'}</td>
                    <td>{formatDate(order.instockDate)}</td>
                    <td>{formatDate(order.payDate)}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>{formatCurrency(order.tax)}</td>
                    <td>{order.currencyUnit}</td>
                    <td>{order.isPay ? 'Paid' : 'Pending'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-danger">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(InStockOrder);
