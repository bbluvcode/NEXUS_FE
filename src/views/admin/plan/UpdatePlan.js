import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getPlanById, updatePlan } from '../../../services/planService'
import { useNavigate, useParams } from 'react-router-dom' // Import useParams

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

const UpdatePlan = () => {
  const navigate = useNavigate()
  const { planId } = useParams() // Use useParams to get planId
  const [planData, setPlanData] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Lấy dữ liệu kế hoạch theo ID
    getPlanById(planId)
      .then((data) => {
        setPlanData(data)
        // Set dữ liệu vào form
        setValue('planName', data.planName)
        setValue('securityDeposit', data.securityDeposit)
        setValue('description', data.description)
        setValue('isUsing', data.isUsing)
      })
      .catch((error) => {
        console.error('Error fetching plan data:', error)
      })
  }, [planId, setValue])

  const handleBack = () => {
    navigate(-1)
  }

  const onSubmit = async (data) => {
    try {
      await updatePlan(planId, data)
      alert('Plan updated successfully')
      window.location.href = '/admin/planlist'
    } catch (error) {
      alert('Error updating plan')
    }
  }

  if (!planData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-4">
      <button onClick={handleBack} className="btn btn-outline-dark mb-4">
        Back
      </button>
      <h2>Update Plan</h2>
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
          Update Plan
        </button>
      </form>
    </div>
  )
}

export default UpdatePlan
