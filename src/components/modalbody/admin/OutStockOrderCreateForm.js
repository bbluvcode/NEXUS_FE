/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { useDispatch } from 'react-redux';
import { createOutStockOrder } from '../../../redux/outStockOrder/outStockOrderSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DataContext } from '../../../context/DataContext';

function OutStockOrderCreateForm() {
  const dispatch = useDispatch();
  const { setIform } = useContext(DataContext);

  const schema = yup.object().shape({
    stockId: yup.number().required('Stock ID is required'),
    employeeId: yup.number().required('Employee ID is required'),
    createDate: yup.date().required('Create Date is required'),
    payDate: yup.date().required('Pay Date is required'),
    tax: yup.number().positive().required('Tax is required'),
    total: yup.number().positive().required('Total is required'),
    isPay: yup.boolean().required('Payment status is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(createOutStockOrder(data)).unwrap();
      setIform(null); // Đóng modal sau khi gửi thành công
    } catch (error) {
      console.error('Failed to create out-stock order:', error);
    }
  };

  return (
    <div className="out-stock-order-create-form">
      <h2 className="text-center">Create Out-Stock Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        {Object.keys(schema.fields).map((field) => (
          <div className="col-md-6" key={field}>
            <label htmlFor={field} className="form-label">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              {...register(field)}
              type={field.includes('Date') ? 'date' : 'text'}
              id={field}
              name={field}
              className="form-control"
            />
            {errors[field] && <p className="text-danger">{errors[field].message}</p>}
          </div>
        ))}
        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(OutStockOrderCreateForm);
