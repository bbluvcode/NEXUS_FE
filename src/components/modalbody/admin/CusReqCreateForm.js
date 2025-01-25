/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'
import { createCusRequest, handleSetCusRequest } from '../../../redux/customer/cusRequestSlice'
import { DataContext } from '../../../context/DataContext'
import { fetchRegions } from '../../../redux/others/regionSlice'

function CusReqCreateForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const regionList = useSelector((state) => state.regions.items)
  useEffect(() => {
    dispatch(fetchRegions())
  }, [])

  const { serviceSelected } = useContext(DataContext)
  const customerInfoString = localStorage.getItem('customerInfo')
  const customerInfo = customerInfoString ? JSON.parse(customerInfoString) : null
  const rateDeposit = 0.2

  if (!customerInfo) {
    return <p className="text-danger">Customer information is missing!</p>
  }

  const { customerId, fullName, address } = customerInfo
  const { planName, securityDeposit } = serviceSelected

  const schema = yup.object().shape({
    requestTitle: yup.string().required('Request title is required'),
    serviceRequest: yup.string().required('Service request is required'),
    equipmentRequest: yup.string().required('Equipment request is required'),
    installationAddress: yup.string().required('Installation Address request is required'),
    regionId: yup.string().required('Region is required').typeError('Region must be a number'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      requestTitle: '',
      serviceRequest: planName || '',
      equipmentRequest: '',
      regionId: '',
      installationAddress: address || '',
      deposit: securityDeposit * rateDeposit || 0,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true) // Bật loading khi nhấn nút thanh toán

    const newRequest = { ...data, customerId }
    try {
      dispatch(handleSetCusRequest(newRequest))
      const res = await dispatch(createCusRequest(newRequest))
      // approvalUrl
      if (createCusRequest.fulfilled.match(res)) {
        const approvalLink = res.payload.approvalUrl
        window.location.href = approvalLink
      }
    } catch (error) {
      console.error('Error creating PayPal payment', error)
    } finally {
      setLoading(false) // Tắt loading khi hoàn thành
    }
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
            aria-invalid={!!errors.requestTitle}
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
            value={planName}
            aria-invalid={!!errors.serviceRequest}
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
            aria-invalid={!!errors.equipmentRequest}
          />
          {errors.equipmentRequest && (
            <p className="text-danger">{errors.equipmentRequest.message}</p>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="regionId" className="form-label">
            Region
          </label>
          <select
            {...register('regionId')}
            id="regionId"
            name="regionId"
            className="form-select"
            aria-invalid={!!errors.regionId}
          >
            <option value="">Select a region</option>
            {regionList.map((region) => (
              <option key={region.regionId} value={region.regionId}>
                {region.regionName}
              </option>
            ))}
          </select>
          {errors.regionId && <p className="text-danger">{errors.regionId.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="installationAddress" className="form-label">
            Installation Address
          </label>
          <input
            {...register('installationAddress')}
            type="text"
            id="installationAddress"
            name="installationAddress"
            className="form-control"
            defaultValue={address}
            aria-invalid={!!errors.installationAddress}
          />
          {errors.installationAddress && (
            <p className="text-danger">{errors.installationAddress.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="deposit" className="form-label">
            Deposit ($)
          </label>
          <input
            {...register('deposit')}
            type="number"
            id="deposit"
            name="deposit"
            className="form-control"
            value={securityDeposit * rateDeposit}
            aria-invalid={!!errors.deposit}
            disabled
          />
          {errors.deposit && <p className="text-danger">{errors.deposit.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            className="form-control"
            value={customerId}
            disabled
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="customerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            className="form-control"
            value={fullName}
            disabled
          />
        </div>

        <div className="col-md-12">
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <BtnModalCloseSubmit />
          )}
        </div>
      </form>
    </div>
  )
}

export default React.memo(CusReqCreateForm)
