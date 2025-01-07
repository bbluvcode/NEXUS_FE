import React, { useEffect, useState } from 'react'
import { getAllPlans } from '../../../services/planService'
import { getPlanFees } from '../../../services/planFeeService'

const PlanList = () => {
  const [plans, setPlans] = useState([])
  const [planFees, setPlanFees] = useState([])
  const [expandedPlans, setExpandedPlans] = useState({})
  const [selectedPlanFee, setSelectedPlanFee] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllPlans(), getPlanFees()])
      .then(([plansData, planFeesData]) => {
        setPlans(plansData.data)
        setPlanFees(planFeesData.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  const toggleExpand = (planId) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }))
  }

  const handlePlanFeeClick = (fee) => {
    setSelectedPlanFee(fee)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Danh sách kế hoạch bên trái */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Internet Plans</h1>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan.planId}
              style={{
                marginBottom: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => toggleExpand(plan.planId)}
              >
                <h2 style={{ margin: 0 }}>{plan.planName}</h2>
                <span>{expandedPlans[plan.planId] ? '▲' : '▼'}</span>
              </div>

              {/* Chỉ hiển thị phí thuê ban đầu */}
              <div style={{ marginTop: '10px' }}>
                {planFees
                  .filter((fee) => fee.planId === plan.planId)
                  .slice(0, 1) // Chỉ hiển thị phí thuê đầu tiên
                  .map((fee) => (
                    <div
                      key={fee.planFeeId}
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: 'blue',
                      }}
                      onClick={() => handlePlanFeeClick(fee)}
                    ></div>
                  ))}
              </div>

              {/* Hiển thị chi tiết nếu được mở rộng */}
              {expandedPlans[plan.planId] && (
                <div
                  style={{
                    marginTop: '10px',
                    paddingLeft: '10px',
                    borderLeft: '2px solid #ccc',
                  }}
                >
                  <span style={{ display: 'block', marginBottom: '5px' }}>{plan.description}</span>
                  <span style={{ display: 'block', marginBottom: '5px' }}>
                    <strong>Security Deposit:</strong> ${plan.securityDeposit}
                  </span>
                  <span style={{ display: 'block', marginBottom: '5px' }}>
                    <strong>Status:</strong> {plan.isUsing ? 'Active' : 'Inactive'}
                  </span>
                  <h4>Plan Fees:</h4>
                  {planFees
                    .filter((fee) => fee.planId === plan.planId)
                    .map((fee) => (
                      <div
                        key={fee.planFeeId}
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          color: 'blue',
                        }}
                        onClick={() => handlePlanFeeClick(fee)}
                      >
                        <strong>{fee.planFeeName}:</strong> ${fee.rental}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No plans available.</div>
        )}
      </div>

      {/* Khu vực bên phải hiển thị chi tiết plan fee */}
      <div style={{ flex: 1 }}>
        <h1>Plan Fee Details</h1>
        {selectedPlanFee ? (
          <div
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h2>{selectedPlanFee.planFeeName}</h2>
            <span style={{ display: 'block', marginBottom: '5px' }}>
              <strong>Rental Fee:</strong> ${selectedPlanFee.rental}
            </span>
            <span style={{ display: 'block', marginBottom: '5px' }}>
              {selectedPlanFee.description}
            </span>
          </div>
        ) : (
          <div>Please select a plan fee to see details.</div>
        )}
      </div>
    </div>
  )
}

export default PlanList
