/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { createCusRequest, handleSetCusRequest } from '../../../redux/customer/cusRequestSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { DataContext } from '../../../context/DataContext'

function CusReqCreateForm(props) {
  const dispatch = useDispatch()
  const request = useSelector((state) => state.cusRequests.cusRequest)
  const [formData, setFormData] = useState({
    requestTitle: '',
    serviceRequest: '',
    equipmentRequest: '',
    customerId: '',
    regionId: '',
  })
    // const { setIform } = useContext(DataContext)
  

  const schema = yup.object().shape({
    requestTitle: yup.string().required('Request title is required'),
    serviceRequest: yup.string().required('Service request is required'),
    equipmentRequest: yup.string().required('Equipment request is required'),
    customerId: yup.number().required('Customer ID is required'),
    regionId: yup.number().required('region ID is required'),
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
    setFormData({
      ...formData,
      [name]: value,
    })
    dispatch(handleSetCusRequest({ ...request, [name]: value }))
  }

  const onSubmit = async () => {
    dispatch(createCusRequest(request))
  }

  return (
    <div className="request-create-form">
      <h2 className="text-center">Create New Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="requestTitle" className="form-label">
            Request Title
          </label>
          <input
            {...register('requestTitle')}
            type="text"
            id="requestTitle"
            name="requestTitle"
            className="form-control"
            onChange={handleChange}
          />
          {errors.requestTitle && <p className="text-danger">{errors.requestTitle.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="serviceRequest" className="form-label">
            Service Request
          </label>
          <input
            {...register('serviceRequest')}
            type="text"
            id="serviceRequest"
            name="serviceRequest"
            className="form-control"
            onChange={handleChange}
          />
          {errors.serviceRequest && <p className="text-danger">{errors.serviceRequest.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="equipmentRequest" className="form-label">
            Equipment Request
          </label>
          <input
            {...register('equipmentRequest')}
            type="text"
            id="equipmentRequest"
            name="equipmentRequest"
            className="form-control"
            onChange={handleChange}
          />
          {errors.equipmentRequest && (
            <p className="text-danger">{errors.equipmentRequest.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            {...register('customerId')}
            type="number"
            id="customerId"
            name="customerId"
            className="form-control"
            onChange={handleChange}
          />
          {errors.customerId && <p className="text-danger">{errors.customerId.message}</p>}
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
  )
}

export default React.memo(CusReqCreateForm)
