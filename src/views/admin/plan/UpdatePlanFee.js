import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useParams, useNavigate } from 'react-router-dom' // Dùng useParams để lấy ID từ URL và useHistory để chuyển hướng
import { getAllPlans } from '../../../services/planService'
import { getPlanFeeById, updatePlanFee } from '../../../services/planFeeService'

const schema = yup.object().shape({
  planFeeName: yup
    .string()
    .required('Plan Fee Name is required')
    .max(50, 'Max length is 50 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(1000, 'Max length is 1000 characters'),
  rental: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Rental must be at least 0')
    .required('Rental is required'),
  callCharge: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Call Charge must be at least 0')
    .required('Call Charge is required'),
  dtdCallCharge: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'DTD Call Charge must be at least 0')
    .required('DTD Call Charge is required'),
  messageMobileCharge: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Message Mobile Charge must be at least 0')
    .required('Message Charge is required'),
  localCallCharge: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Local Call Charge must be at least 0')
    .required('Local Call Charge is required'),
  planId: yup.string().required('Plan is required'),
  isUsing: yup.boolean(),
})

const UpdatePlanFee = () => {
  const [plans, setPlans] = useState([])
  const [planFee, setPlanFee] = useState(null)
  const { planId } = useParams() // Lấy id từ URL
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Lấy dữ liệu của PlanFee khi trang được tải
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getAllPlans()
        setPlans(data || [])
      } catch (error) {
        console.error('Failed to fetch plans:', error)
      }
    }

    const fetchPlanFee = async () => {
      try {
        const data = await getPlanFeeById(planId) // Lấy dữ liệu của PlanFee theo id
        if (data) {
          setPlanFee(data)
          reset(data) // Điền dữ liệu vào form
        }
      } catch (error) {
        console.error('Failed to fetch plan fee:', error)
      }
    }

    fetchPlans()
    fetchPlanFee()
  }, [planId, reset])

  const handleBack = () => {
    navigate(-1)
  }

  const onSubmit = async (data) => {
    try {
      await updatePlanFee(planId, data) // Gửi yêu cầu cập nhật PlanFee
      alert('Plan Fee updated successfully')
      navigate('/admin/planlist') // Điều hướng về trang danh sách
    } catch (error) {
      alert('Error updating Plan Fee')
      console.error(error)
    }
  }

  if (!planFee) {
    return <div>Loading...</div> // Hiển thị khi dữ liệu chưa được tải
  }

  return (
    <div className="container mt-4">
      <button onClick={handleBack} className="btn btn-outline-dark mb-4">
        Back
      </button>
      <h2>Update Plan Fee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Plan Fee Name</label>
          <input type="text" className="form-control" {...register('planFeeName')} />
          <p className="text-danger">{errors.planFeeName?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" {...register('description')} />
          <p className="text-danger">{errors.description?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Rental</label>
          <input type="number" className="form-control" {...register('rental')} />
          <p className="text-danger">{errors.rental?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Call Charge</label>
          <input type="number" className="form-control" {...register('callCharge')} />
          <p className="text-danger">{errors.callCharge?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">DTD Call Charge</label>
          <input type="number" className="form-control" {...register('dtdCallCharge')} />
          <p className="text-danger">{errors.dtdCallCharge?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Message Mobile Charge</label>
          <input type="number" className="form-control" {...register('messageMobileCharge')} />
          <p className="text-danger">{errors.messageMobileCharge?.message}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Local Call Charge</label>
          <input type="number" className="form-control" {...register('localCallCharge')} />
          <p className="text-danger">{errors.localCallCharge?.message}</p>
        </div>
        {/* 
        <div className="mb-3">
          <label className="form-label">Plan</label>
          <select className="form-control" {...register('planId')}>
            <option value="">Select Plan</option>
            {plans.map((plan) => (
              <option key={plan.planId} value={plan.planId}>
                {plan.planName}
              </option>
            ))}
          </select>
          <p className="text-danger">{errors.planId?.message}</p>
        </div> */}

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" {...register('isUsing')} />
          <label className="form-check-label">Is Using</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Plan Fee
        </button>
      </form>
    </div>
  )
}

export default UpdatePlanFee
