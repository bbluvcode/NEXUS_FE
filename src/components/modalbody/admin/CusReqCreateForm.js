/* eslint-disable prettier/prettier */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { createCusRequest, handleSetCusRequest } from '../../../redux/customer/cusRequestSlice';

function CusReqCreateForm() {
  const dispatch = useDispatch();
  const customerInfoString = localStorage.getItem('customerInfo');
  const customerInfo = customerInfoString ? JSON.parse(customerInfoString) : null;

  if (!customerInfo) {
    return <p className="text-danger">Customer information is missing!</p>;
  }

  const { customerId, fullName } = customerInfo;

  const schema = yup.object().shape({
    requestTitle: yup.string().required('Request title is required'),
    serviceRequest: yup.string().required('Service request is required'),
    equipmentRequest: yup.string().required('Equipment request is required'),
    installationAddress: yup.string().required('Installation Address request is required'),
    regionId: yup.number().required('Region ID is required').typeError('Region ID must be a number'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      requestTitle: '',
      serviceRequest: '',
      equipmentRequest: '',
      regionId: '',
      installationAddress: '',
    },
  });

  const onSubmit = (data) => {
    const newRequest = { ...data, customerId };
    dispatch(handleSetCusRequest(newRequest));
    dispatch(createCusRequest(newRequest));
  };

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
          {errors.equipmentRequest && <p className="text-danger">{errors.equipmentRequest.message}</p>}
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
            aria-invalid={!!errors.regionId}
          />
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
            aria-invalid={!!errors.installationAddress}
          />
          {errors.installationAddress && <p className="text-danger">{errors.installationAddress.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="deposit" className="form-label">
            Deposit
          </label>
          <input
            {...register('deposit')}
            type="number"
            id="deposit"
            name="deposit"
            className="form-control"
            aria-invalid={!!errors.deposit}
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
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(CusReqCreateForm);
