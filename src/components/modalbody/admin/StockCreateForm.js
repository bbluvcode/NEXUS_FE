/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { createStock, handleSetStock } from '../../../redux/stock/stockSlice';
import { DataContext } from '../../../context/DataContext';

function StockCreateForm() {
  const dispatch = useDispatch();
  const { setIform } = useContext(DataContext);
  const stock = useSelector((state) => state.stocks.stock);

  // Validation schema
  const schema = yup.object().shape({
    stockName: yup.string().min(3).max(100).required('Stock name is required'),
    address: yup.string().max(200).required('Address is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone must be numeric')
      .max(20, 'Phone must be 20 characters or less')
      .required('Phone is required'),
    fax: yup
      .string()
      .max(30, 'Fax must be 30 characters or less')
      .required('Fax is required'),
    regionId: yup
      .number()
      .typeError('Region ID must be a number')
      .positive('Region ID must be a positive number')
      .integer('Region ID must be an integer')
      .required('Region ID is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleSetStock({ ...stock, [name]: value }));
  };

  const onSubmit = async () => {
    const resultAction = await dispatch(createStock(stock));

    if (createStock.fulfilled.match(resultAction)) {
      setIform(''); // Đóng modal sau khi thành công
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide();
    } else {
      // Xử lý lỗi (nếu cần)
      console.error('Failed to create stock');
    }
  };

  return (
    <div className="stock-create-form">
      <h2 className="text-center">Create New Stock</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="stockName" className="form-label">
            Stock Name
          </label>
          <input
            {...register('stockName')}
            type="text"
            id="stockName"
            name="stockName"
            className="form-control"
            onChange={handleChange}
          />
          {errors.stockName && <p className="text-danger">{errors.stockName.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            {...register('address')}
            type="text"
            id="address"
            name="address"
            className="form-control"
            onChange={handleChange}
          />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            {...register('phone')}
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            onChange={handleChange}
          />
          {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="fax" className="form-label">
            Fax
          </label>
          <input
            {...register('fax')}
            type="text"
            id="fax"
            name="fax"
            className="form-control"
            onChange={handleChange}
          />
          {errors.fax && <p className="text-danger">{errors.fax.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="regionId" className="form-label">
            Region ID
          </label>
          <input
            {...register('regionId')}
            type="number"
            id="regionId"
            name="regionId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.regionId && <p className="text-danger">{errors.regionId.message}</p>}
        </div>

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(StockCreateForm);
