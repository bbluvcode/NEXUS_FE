/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema using Yup
const employeeSchema = yup.object().shape({
  employeeCode: yup
    .string()
    .required('Employee code is required.')
    .max(5, 'Employee code cannot exceed 5 characters.'),
  fullName: yup
    .string()
    .required('Full name is required.')
    .max(50, 'Full name cannot exceed 50 characters.'),
  gender: yup
    .string()
    .required('Gender is required.')
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender selection.'),
  dateOfBirth: yup
    .date('Invalid date format. Please use MM/DD/YYYY.')
    .transform((value, originalValue) => (originalValue === "" ? null : value)) // Convert empty string to null
    .nullable() // Allow null values to avoid "Invalid Date"
    .required('Birthdate is required.')
    .max(new Date(), 'Date of birth cannot be in the future.'),
  address: yup
    .string()
    .required('Address is required.')
    .max(200, 'Address cannot exceed 200 characters.'),
  email: yup
    .string()
    .email('Invalid email address format.')
    .required('Email is required.')
    .max(50, 'Email cannot exceed 50 characters.'),
  phone: yup
    .string()
    .required('Phone number is required.')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits.')
    .max(20, 'Phone number cannot exceed 20 characters.'),
  identificationNo: yup
    .string()
    .required('Identification number is required.')
    .max(20, 'Identification number cannot exceed 20 characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .max(20, 'Password cannot exceed 20 characters.'),
  status: yup.boolean().required('Status is required.'),
  employeeRoleId: yup
  .string()
  .nullable() // Allow null
  .notOneOf([""], "Role is required.") // Prevent empty value
  .required("Role is required."), // Ensures a role is selected
  retailShopId: yup
  .number()
  .typeError("Retail shop is required.") // Handles cases where no number is selected
  .required("Retail shop is required.") // Ensures the field is not empty
  .min(1, "Retail shop is required."), // Ensures a valid retail shop ID (e.g., assuming IDs start from 1)
});

const EmployeeForm = ({ onSubmit, retailShops, roles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-3">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Employee Code:</label>
            <input className="form-control" {...register('employeeCode')} />
            <p className="text-danger">{errors.employeeCode?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input className="form-control" {...register('fullName')} />
            <p className="text-danger">{errors.fullName?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <select className="form-select" {...register('gender')}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <p className="text-danger">{errors.gender?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input type="date" className="form-control" {...register('dateOfBirth')} />
            <p className="text-danger">{errors.dateOfBirth?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input className="form-control" {...register('address')} />
            <p className="text-danger">{errors.address?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Retail Shop:</label>
            <select className="form-select" {...register('retailShopId')}>
              <option value="">Select Retail Shop</option>
              {retailShops.map((shop) => (
                <option key={shop.retailShopId} value={shop.retailShopId}>
                  {shop.retailShopName}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors.retailShopId?.message}</p>
          </div>
        </div>
        {/* Right Column */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" {...register('email')} />
            <p className="text-danger">{errors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input className="form-control" {...register('phone')} />
            <p className="text-danger">{errors.phone?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Identification No:</label>
            <input className="form-control" {...register('identificationNo')} />
            <p className="text-danger">{errors.identificationNo?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" {...register('password')} />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Status:</label>
            <select className="form-select" {...register('status')}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
            <p className="text-danger">{errors.status?.message}</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Employee Role:</label>
            <select className="form-select" {...register('employeeRoleId')}>
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </select>
            <p className="text-danger">{errors.employeeRoleId?.message}</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </div>
    </form>
  );
};

EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  retailShops: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
};

export default EmployeeForm;
