/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getAllPlans } from '../../../services/planService'
import { createPlanFee } from '../../../services/planFeeService'
import Swal from 'sweetalert2'  // Import SweetAlert2

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
        .positive('Must be positive')
        .required('Rental is required'),
    callCharge: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Call Charge is required'),
    dtdCallCharge: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('DTD Call Charge is required'),
    messageMobileCharge: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Message Charge is required'),
    localCallCharge: yup
        .number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Local Call Charge is required'),
    planId: yup.string().required('Plan is required'),
    isUsing: yup.boolean(),
})

const AddPlanFee = () => {
    const [plans, setPlans] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getAllPlans()
                console.log(data);

                setPlans(data || []) // Ensure data is not undefined
            } catch (error) {
                console.error('Failed to fetch plans:', error)
            }
        }
        fetchPlans()
    }, [])

    const onSubmit = async (data) => {
        try {
            await createPlanFee(data)

            // Success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Plan Fee added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            })

            window.location.href = '/admin/planlist'  // Redirect to plan list page
        } catch (error) {
            // Error message with SweetAlert2
            Swal.fire({
                title: 'Error!',
                text: 'There was an error adding the Plan Fee',
                icon: 'error',
                confirmButtonText: 'OK',
            })
            console.error(error)
        }
    }

    return (
        <div className="container mt-4">
            <h2>Add New Plan Fee</h2>
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
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" {...register('isUsing')} />
                    <label className="form-check-label">Is Using</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Plan Fee
                </button>
            </form>
        </div>
    )
}

export default AddPlanFee
