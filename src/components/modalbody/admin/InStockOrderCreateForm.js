/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { useDispatch } from 'react-redux';
import { createInStockOrder } from '../../../redux/inStockOrder/inStockOrderSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DataContext } from '../../../context/DataContext';

function InStockOrderCreateForm() {
  const dispatch = useDispatch();
  const { setIform } = useContext(DataContext);

  const schema = yup.object().shape({
    inStockRequestId: yup.number().required('In-Stock Request ID is required'),
    vendorId: yup.number().required('Vendor ID is required'),
    employeeId: yup.number().required('Employee ID is required'),
    stockId: yup.number().required('Stock ID is required'),
    payer: yup.number().required('Payer ID is required'),
    createDate: yup.date().required('Create Date is required'),
    instockDate: yup.date().required('In-Stock Date is required'),
    payDate: yup.date().required('Pay Date is required'),
    tax: yup.number().positive().required('Tax is required'),
    total: yup.number().positive().required('Total is required'),
    currencyUnit: yup.string().max(10).required('Currency Unit is required'),
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
      await dispatch(createInStockOrder(data)).unwrap();
      setIform(null); // Close modal after successful submission
    } catch (error) {
      console.error('Failed to create in-stock order:', error);
    }
  };

  return (
    <div className="in-stock-order-create-form">
      <h2 className="text-center">Create In-Stock Order</h2>
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

export default React.memo(InStockOrderCreateForm);
