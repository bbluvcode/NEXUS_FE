/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import BtnModalCloseSubmit from '../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { createEquipment, handleSetEquipment } from '../../redux/equipment/equipmentSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

function EquipmentCreateForm() {
  const dispatch = useDispatch()
  const equipment = useSelector((state) => state.equipments.equipment)

  const schema = yup.object().shape({
    equipmentName: yup.string().required('Equipment name is required'),
    price: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
    stockQuantity: yup
      .number()
      .typeError('Stock quantity must be a number')
      .integer('Stock quantity must be an integer')
      .min(0, 'Stock quantity must be at least 0')
      .required('Stock quantity is required'),
    description: yup.string().optional(),
    status: yup.boolean().required('Status is required'),
    discountId: yup.string().optional(),
    equipmentTypeId: yup
      .number()
      .typeError('Equipment type ID must be a number')
      .required('Equipment type ID is required'),
    vendorId: yup
      .number()
      .typeError('Vendor ID must be a number')
      .required('Vendor ID is required'),
    stockId: yup
      .number()
      .typeError('Stock ID must be a number')
      .required('Stock ID is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(handleSetEquipment({ ...equipment, [name]: value }))
  }

  const onSubmit = async () => {
    dispatch(createEquipment(equipment))
  }

  return (
    <div className="equipment-create-form">
      <h2 className="text-center">Create New Equipment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="equipmentName" className="form-label">
            Equipment Name
          </label>
          <input
            {...register('equipmentName')}
            type="text"
            id="equipmentName"
            name="equipmentName"
            className="form-control"
            onChange={handleChange}
          />
          {errors.equipmentName && <p className="text-danger">{errors.equipmentName.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            {...register('price')}
            type="number"
            step="0.01"
            id="price"
            name="price"
            className="form-control"
            onChange={handleChange}
          />
          {errors.price && <p className="text-danger">{errors.price.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="stockQuantity" className="form-label">
            Stock Quantity
          </label>
          <input
            {...register('stockQuantity')}
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            className="form-control"
            onChange={handleChange}
          />
          {errors.stockQuantity && <p className="text-danger">{errors.stockQuantity.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            name="description"
            className="form-control"
            rows="3"
            onChange={handleChange}
          ></textarea>
          {errors.description && <p className="text-danger">{errors.description.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            {...register('status')}
            id="status"
            name="status"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="discountId" className="form-label">
            Discount ID
          </label>
          <input
            {...register('discountId')}
            type="text"
            id="discountId"
            name="discountId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.discountId && <p className="text-danger">{errors.discountId.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="equipmentTypeId" className="form-label">
            Equipment Type ID
          </label>
          <input
            {...register('equipmentTypeId')}
            type="number"
            id="equipmentTypeId"
            name="equipmentTypeId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.equipmentTypeId && (
            <p className="text-danger">{errors.equipmentTypeId.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="vendorId" className="form-label">
            Vendor ID
          </label>
          <input
            {...register('vendorId')}
            type="number"
            id="vendorId"
            name="vendorId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.vendorId && <p className="text-danger">{errors.vendorId.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="stockId" className="form-label">
            Stock ID
          </label>
          <input
            {...register('stockId')}
            type="number"
            id="stockId"
            name="stockId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.stockId && <p className="text-danger">{errors.stockId.message}</p>}
        </div>

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  )
}

export default React.memo(EquipmentCreateForm)
