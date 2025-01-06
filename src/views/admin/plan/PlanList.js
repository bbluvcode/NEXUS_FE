import React, { useEffect, useState } from 'react'
import { getAllPlans } from '../../../services/planService'
import { getPlanFees } from '../../../services/planFeeService'

const PlanList = () => {
  const [plans, setPlans] = useState([])
  const [planFees, setPlanFees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPlans()
      .then((data) => {
        setPlans(data.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the plans!', error)
      })

    getPlanFees()
      .then((data) => {
        setPlanFees(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching the plan fees!', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Internet Plans</h1>
      {plans.length > 0 ? (
        plans.map((plan) => (
          <div
            key={plan.planId}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: '40px',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            {/* Thông tin kế hoạch */}
            <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ccc' }}>
              <h2 style={{ margin: '0 0 10px' }}>{plan.planName}</h2>
              <div style={{ margin: '5px 0' }}>{plan.description}</div>
              <div style={{ margin: '5px 0' }}>
                <strong>Security Deposit:</strong> <span>${plan.securityDeposit}</span>
              </div>
              <div style={{ margin: '5px 0' }}>
                <strong>Status:</strong> <span>{plan.isUsing ? 'Active' : 'Inactive'}</span>
              </div>
            </div>

            {/* Thông tin phí liên quan */}
            <div style={{ flex: 2, paddingLeft: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Plan Fees</h3>
              {planFees.filter((fee) => fee.planId === plan.planId).length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {planFees
                    .filter((fee) => fee.planId === plan.planId)
                    .map((fee) => (
                      <li
                        key={fee.planFeeId}
                        style={{
                          marginBottom: '20px',
                          padding: '10px',
                          borderBottom: '1px solid #ccc',
                        }}
                      >
                        <strong style={{ display: 'block', marginBottom: '5px' }}>
                          {fee.planFeeName}
                        </strong>
                        <div style={{ margin: '5px 0' }}>{fee.description}</div>
                        <div style={{ margin: '5px 0' }}>
                          <strong>Rental:</strong> <span>${fee.rental}</span>
                        </div>
                        {fee.callCharge !== null && fee.callCharge !== undefined && (
                          <div style={{ margin: '5px 0' }}>
                            <strong>Call Charge:</strong> <span>${fee.callCharge}</span>
                          </div>
                        )}
                        {fee.messageMobileCharge !== null &&
                          fee.messageMobileCharge !== undefined && (
                            <div style={{ margin: '5px 0' }}>
                              <strong>Message Mobile Charge:</strong>{' '}
                              <span>${fee.messageMobileCharge}</span>
                            </div>
                          )}
                        {fee.localCallCharge !== null && fee.localCallCharge !== undefined && (
                          <div style={{ margin: '5px 0' }}>
                            <strong>Local Call Charge:</strong> <span>${fee.localCallCharge}</span>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
              ) : (
                <div>No fees available for this plan.</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No plans available.</div>
      )}
    </div>
  )
}

export default PlanList
