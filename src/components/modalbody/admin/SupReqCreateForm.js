/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  createSuppportRequest,
  handleSetSuppportRequest,
} from '../../../redux/customer/supportRequestSlice'
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit'

function SupReqCreateForm(props) {
  const dispatch = useDispatch()
  const supportRequest = useSelector((state) => state.supportRequests.supportRequest)
  const [formData, setFormData] = useState({
    title: '',
    detailContent: '',
    dateResolved: null,
    email: '',
    empIdResolver: null,
  })

  const schema = yup.object().shape({
    title: yup.string().min(3).max(50).required('Title is required'),
    detailContent: yup.string().min(5).required('Detail Content is required'),
    email: yup.string().email().required('Customer ID is required'),
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
    dispatch(handleSetSuppportRequest({ ...supportRequest, [name]: value }))
  }

  const onSubmit = async () => {
    console.log('hello onsubmit:', supportRequest)
    dispatch(createSuppportRequest(supportRequest))
  }

  return (
    <div className="support-request-create-form">
      <h2 className="text-center">Create Support Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-12">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            name="title"
            className="form-control"
            onChange={handleChange}
          />
          {errors.title && <p className="text-danger">{errors.title.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register('email')}
            type="text"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="empIdResolver" className="form-label">
            Employee Resolver ID
          </label>
          <input
            type="number"
            id="empIdResolver"
            name="empIdResolver"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="detailContent" className="form-label">
            Detail Content
          </label>
          <textarea
            {...register('detailContent')}
            id="detailContent"
            name="detailContent"
            className="form-control"
            rows="3"
            onChange={handleChange}
          ></textarea>
          {errors.detailContent && <p className="text-danger">{errors.detailContent.message}</p>}
        </div>
        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  )
}

export default React.memo(SupReqCreateForm)
