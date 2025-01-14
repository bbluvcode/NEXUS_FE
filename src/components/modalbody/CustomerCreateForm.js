/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import BtnModalCloseSubmit from '../button/BtnModalCloseSubmit'
import { useDispatch, useSelector } from 'react-redux'
import { createCustomer, handleSetCustomer } from '../../redux/customer/customerSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

function CustomerCreateForm(props) {
  const dispatch = useDispatch()
  const customer = useSelector((state) => state.customers.customer)
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phoneNumber: '',
    identificationNo: '',
    image: null,
    password: '',
  })
  const schema = yup.object().shape({
    fullName: yup.string().min(3).max(12).required('Full name is required'),
    gender: yup.string().required('Gender is required'),
    dateOfBirth: yup.date().required('Date of birth is required'),
    address: yup.string().optional(),
    email: yup.string().email('Invalid email address').required(),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .optional(),
    identificationNo: yup.string().optional(),
    image: yup.string().optional(), // Add validation if needed for images (e.g., file type)
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
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
    dispatch(handleSetCustomer({ ...customer, [name]: value }))
  }

  const onSubmit = async (e) => {
    // e.preventDefault()

    // Đảm bảo gọi hàm bất đồng bộ với await
    dispatch(createCustomer(customer))
  }

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    // setFormData({
    //     ...formData,
    //     image: file
    // });
  }

  return (
    <div className="customer-create-form">
      <h2 className="text-center">Create New Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            {...register('gender')}
            id="gender"
            name="gender"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            {...register('dateOfBirth')}
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
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
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            {...register('phoneNumber')}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
        </div>

        <div className="col-md-6">
          <label htmlFor="identificationNo" className="form-label">
            Identification Number
          </label>
          <input
            {...register('identificationNo')}
            type="text"
            id="identificationNo"
            name="identificationNo"
            className="form-control"
            onChange={handleChange}
          />
          {errors.identificationNo && (
            <p className="text-danger">{errors.identificationNo.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            {...register('image')}
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
          {errors.image && <p className="text-danger">{errors.image.message}</p>}
        </div>

        <div className="col-md-12">
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

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  )
}

export default React.memo(CustomerCreateForm)
