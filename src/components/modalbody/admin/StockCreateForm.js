/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchStocks } from '../../../redux/stock/stockSlice'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit' 

const apiStock = '/src/constant/apiConstant.js'

const StockCreateForm = ({ onSuccess }) => {
  const dispatch = useDispatch()

  // Form validation schema
  const schema = yup.object().shape({
    stockName: yup.string().required('Stock name is required'),
    address: yup.string().required('Address is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .required('Phone number is required'),
    fax: yup.string().optional(),
    regionId: yup.number().typeError('Region ID must be a number').required('Region ID is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    try {
      await axios.post(apiStock, data)
      alert('Stock created successfully!')
      if (onSuccess) {
        onSuccess()
      } else {
        dispatch(fetchStocks())
      }
    } catch (error) {
      console.error('Error creating stock:', error)
      alert('Failed to create stock')
    }
  }

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
          />
          {errors.regionId && <p className="text-danger">{errors.regionId.message}</p>}
        </div>

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  )
}

export default StockCreateForm
