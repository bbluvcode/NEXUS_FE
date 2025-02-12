/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchStocks } from '../../../redux/stock/stockSlice'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { toast } from 'react-toastify'

const apiStock = '/src/constant/apiConstant.js'
const apiRegion = '/src/constant/apiConstant.js'

// Danh sách khu vực mặc định cần thêm
const defaultRegions = [
  { regionId: 1001, name: 'Ho Chi Minh City' },
  { regionId: 1002, name: 'Ha Noi' },
  { regionId: 1003, name: 'Da Nang' },
  { regionId: 1004, name: 'Asia Headquarters' },
  { regionId: 1005, name: 'Singapore' },
  { regionId: 1006, name: 'Kuala Lumpur' },
  { regionId: 1007, name: 'Bangkok' },
]

const StockCreateForm = ({ onSuccess }) => {
  const dispatch = useDispatch()
  const [regions, setRegions] = useState([])

  // Fetch danh sách khu vực từ API và bổ sung khu vực mặc định
  useEffect(() => {
    axios.get(apiRegion)
      .then(response => {
        const apiRegions = response.data.data || []
        // Hợp nhất danh sách, tránh trùng lặp bằng cách kiểm tra name
        const mergedRegions = [...apiRegions, ...defaultRegions].filter(
          (region, index, self) => index === self.findIndex(r => r.name === region.name)
        )
        setRegions(mergedRegions)
      })
      .catch(error => console.error('Error fetching regions:', error))
  }, [])

  // Schema Validation
  const schema = yup.object().shape({
    stockName: yup.string().max(100, 'Max 100 characters').required('Stock name is required'),
    address: yup.string().max(200, 'Max 200 characters').required('Address is required'),
    email: yup.string().email('Invalid email').max(50, 'Max 50 characters').required('Email is required'),
    phone: yup.string().matches(/^[0-9]+$/, 'Phone must be numeric').max(20, 'Max 20 characters').required('Phone is required'),
    fax: yup.string().max(30, 'Max 30 characters').optional(),
    regionId: yup.number().typeError('Region is required').required('Region is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    try {
      await axios.post(apiStock, data)
      toast.success('Stock created successfully!')
      reset()
      if (onSuccess) {
        onSuccess()
      } else {
        dispatch(fetchStocks())
      }
    } catch (error) {
      console.error('Error creating stock:', error)
      toast.error(error.response?.data?.message || 'Failed to create stock')
    }
  }

  return (
    <div className="stock-create-form">
      <h2 className="text-center">Create New Stock</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Stock Name</label>
          <input {...register('stockName')} type="text" className="form-control" />
          {errors.stockName && <p className="text-danger">{errors.stockName.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input {...register('address')} type="text" className="form-control" />
          {errors.address && <p className="text-danger">{errors.address.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input {...register('email')} type="email" className="form-control" />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input {...register('phone')} type="text" className="form-control" />
          {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Fax</label>
          <input {...register('fax')} type="text" className="form-control" />
          {errors.fax && <p className="text-danger">{errors.fax.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Region</label>
          <select {...register('regionId')} className="form-control">
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region.regionId} value={region.regionId}>
                {region.name}
              </option>
            ))}
          </select>
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
