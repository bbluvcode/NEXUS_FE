/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import BtnModalClose from '../button/BtnModalClose'

function CustomerEditForm(props) {
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

//   useEffect(() => {
//     if (props.customer) {
//       setFormData({
//         fullName: props.customer.fullName || '',
//         gender: props.customer.gender || '',
//         dateOfBirth: props.customer.dateOfBirth || '',
//         address: props.customer.address || '',
//         email: props.customer.email || '',
//         phoneNumber: props.customer.phoneNumber || '',
//         identificationNo: props.customer.identificationNo || '',
//         image: props.customer.image || null,
//         password: props.customer.password || '',
//       })
//     }
//   }, [props.customer])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (props.onSubmit) {
    //     props.onSubmit(formData);
    // }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({
      ...formData,
      image: file,
    })
  }

  return (
    <div className="customer-edit-form">
      <h2 className='text-center'>Edit Customer</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="identificationNo" className="form-label">
            Identification Number
          </label>
          <input
            type="text"
            id="identificationNo"
            name="identificationNo"
            className="form-control"
            value={formData.identificationNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <BtnModalClose />
      </form>
    </div>
  )
}

export default React.memo(CustomerEditForm)
