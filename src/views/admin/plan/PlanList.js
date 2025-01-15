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
    return (
      <div style={{ fontSize: '24px', textAlign: 'center', marginTop: '50px' }}>Loading...</div>
    )
  }

  return (
    <div style={{ display: 'flex', padding: '40px' }}>
      {/* Danh sách kế hoạch bên trái */}
      <div style={{ flex: 1, marginRight: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Internet Plans</h1>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div
              key={plan.planId}
              style={{
                marginBottom: '30px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
                onClick={() => toggleExpand(plan.planId)}
              >
                <h2 style={{ margin: 0 }}>{plan.planName}</h2>
                <span style={{ fontSize: '24px' }}>{expandedPlans[plan.planId] ? '▲' : '▼'}</span>
              </div>

              {/* Chỉ hiển thị phí thuê ban đầu */}
              <div style={{ marginTop: '20px', fontSize: '18px' }}>
                {/* {planFees
                  .filter((fee) => fee.planId === plan.planId)
                  .slice(0, 1) // Chỉ hiển thị phí thuê đầu tiên
                  .map((fee) => (
                    <div
                      key={fee.planFeeId}
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: 'blue',
                        fontSize: '20px',
                        marginTop: '10px',
                      }}
                      onClick={() => handlePlanFeeClick(fee)}
                    >
                      {fee.planFeeName}
                    </div>
                  ))} */}
              </div>

              {/* Hiển thị chi tiết nếu được mở rộng */}
              {expandedPlans[plan.planId] && (
                <div
                  style={{
                    marginTop: '20px',
                    paddingLeft: '20px',
                    borderLeft: '3px solid #ccc',
                    fontSize: '18px',
                  }}
                >
                  <span style={{ display: 'block', marginBottom: '10px' }}>{plan.description}</span>
                  <span style={{ display: 'block', marginBottom: '10px' }}>
                    <strong>Security Deposit:</strong> ${plan.securityDeposit}
                  </span>
                  <span style={{ display: 'block', marginBottom: '10px' }}>
                    <strong>Status:</strong> {plan.isUsing ? 'Active' : 'Inactive'}
                  </span>
                  <h4 style={{ fontSize: '24px', marginTop: '20px' }}>Plan Fees:</h4>
                  {planFees
                    .filter((fee) => fee.planId === plan.planId)
                    .map((fee) => (
                      <div
                        key={fee.planFeeId}
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                          color: '#007bff',
                          fontSize: '20px',
                          marginTop: '10px',
                          padding: '8px 15px',
                          borderRadius: '5px',
                          transition: 'background-color 0.3s, transform 0.3s',
                        }}
                        onClick={() => handlePlanFeeClick(fee)}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#e1f1ff')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
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
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Plan Fee Details</h1>
        {selectedPlanFee ? (
          <div
            style={{
              padding: '30px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '28px' }}>{selectedPlanFee.planFeeName}</h2>
            <span style={{ display: 'block', marginBottom: '10px', fontSize: '20px' }}>
              <strong>Rental Fee:</strong> ${selectedPlanFee.rental}
            </span>
            <span style={{ display: 'block', marginBottom: '10px', fontSize: '20px' }}>
              {selectedPlanFee.description}
            </span>
          </div>
        ) : (
          <div style={{ fontSize: '20px' }}>Please select a plan fee to see details.</div>
        )}
      </div>
    </div>
  )
}

export default PlanList
