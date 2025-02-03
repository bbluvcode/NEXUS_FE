import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addPlan } from '../../../services/planService'

const schema = yup.object().shape({
  planName: yup.string().required('Plan name is required').max(50, 'Max length is 50 characters'),
  securityDeposit: yup
    .number()
    .typeError('Security Deposit must be a number')
    .positive('Must be positive')
    .required('Security Deposit is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(1000, 'Max length is 1000 characters'),
  isUsing: yup.boolean().required('Usage status is required'),
})

const AddPlan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await addPlan(data)
      alert('Plan added successfully')
      window.location.href = '/admin/planlist'
    } catch (error) {
      alert('Error adding plan')
    }
  }

  return (
    <div className="container mt-4">
      <h2>Add New Plan</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Plan Name</label>
          <input type="text" className="form-control" {...register('planName')} />
          <p className="text-danger">{errors.planName?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Security Deposit</label>
          <input type="number" className="form-control" {...register('securityDeposit')} />
          <p className="text-danger">{errors.securityDeposit?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" {...register('description')} />
          <p className="text-danger">{errors.description?.message}</p>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" {...register('isUsing')} />
          <label className="form-check-label">Is Using</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Plan
        </button>
      </form>
    </div>
  )
}

export default AddPlan
