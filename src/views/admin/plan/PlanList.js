import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPlans } from '../../../services/planService'
import { getAllPlanFees } from '../../../services/planFeeService'
import { changePlanStatus } from '../../../services/planService'
import { changePlanFeeStatus } from '../../../services/planFeeService'
import { useDataContext } from '../../../context/DataContext'

const PlanList = () => {
  const navigate = useNavigate()
  const {
    plans,
    setPlans,
    planFees,
    setPlanFees,
    expandedPlans,
    setExpandedPlans,
    selectedPlanFee,
    setSelectedPlanFee,
    loading,
    setLoading,
  } = useDataContext()

  useEffect(() => {
    Promise.all([getAllPlans(), getAllPlanFees()])
      .then(([plansData, planFeesData]) => {
        setPlans(plansData)
        setPlanFees(planFeesData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [setPlans, setPlanFees, setLoading])

  const toggleExpand = (planId) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }))
  }

  const handlePlanFeeClick = (fee) => {
    setSelectedPlanFee(fee)
  }

  const handleStatusChange = async (planId, currentStatus) => {
    const newStatus = !currentStatus

    const isConfirmed = showConfirmation(newStatus)
    if (!isConfirmed) return

    try {
      await changePlanStatus(planId, newStatus)
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.planId === planId ? { ...plan, isUsing: newStatus } : plan)),
      )
    } catch (error) {
      console.error('Error changing plan status', error)
    }
  }

  const handlePlanFeeStatusChange = async (planFeeId, currentStatus) => {
    const newStatus = !currentStatus

    const isConfirmed = showConfirmation(newStatus)
    if (!isConfirmed) return

    try {
      await changePlanFeeStatus(planFeeId, newStatus)
      setPlanFees((prevFees) =>
        prevFees.map((fee) => (fee.planFeeId === planFeeId ? { ...fee, isUsing: newStatus } : fee)),
      )
      setSelectedPlanFee((prevSelectedPlanFee) =>
        prevSelectedPlanFee?.planFeeId === planFeeId
          ? { ...prevSelectedPlanFee, isUsing: newStatus }
          : prevSelectedPlanFee,
      )
    } catch (error) {
      console.error('Error changing plan fee status', error)
    }
  }

  const showConfirmation = (newStatus) => {
    return window.confirm(`Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this?`)
  }

  if (loading) {
    return (
      <div style={{ fontSize: '24px', textAlign: 'center', marginTop: '50px' }}>Loading...</div>
    )
  }

  return (
    <div style={{ display: 'flex', padding: '40px' }}>
      {/* Plan list section */}
      <div style={{ flex: 1, marginRight: '40px', position: 'relative' }}>
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
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div style={{ flex: 1 }}>
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

                {expandedPlans[plan.planId] && (
                  <div
                    style={{
                      marginTop: '20px',
                      paddingLeft: '20px',
                      borderLeft: '3px solid #ccc',
                      fontSize: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <button
                        onClick={() => navigate(`/admin/UpdatePlan/${plan.planId}`)}
                        className="btn mb-2 btn-primary btn-sm me-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleStatusChange(plan.planId, plan.isUsing)}
                        style={{
                          backgroundColor: plan.isUsing ? '#dc3545' : '#007bff',
                          color: 'white',
                          border: '1px solid transparent',
                          padding: '0.375rem 0.75rem',
                          fontSize: '0.875rem',
                          borderRadius: '0.2rem',
                          cursor: 'pointer',
                          marginBottom: '0.5rem',
                          marginRight: '0.5rem',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = plan.isUsing ? '#c82333' : '#0056b3'
                          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = plan.isUsing ? '#dc3545' : '#007bff'
                          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {plan.isUsing ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                    <span style={{ display: 'block', marginBottom: '10px' }}>
                      {plan.description}
                    </span>
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
            </div>
          ))
        ) : (
          <div>No plans available.</div>
        )}
      </div>

      {/* Plan Fee Details */}
      <div
        style={{
          flex: 1,
          position: 'sticky',
          top: '80px',
          alignSelf: 'flex-start',
          height: 'calc(100vh - 180px)',
          overflowY: 'auto',
        }}
      >
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
              <strong>Description:</strong> {selectedPlanFee.description}
            </span>
            <span style={{ display: 'block', marginBottom: '10px', fontSize: '20px' }}>
              <strong>Call Charge:</strong> ${selectedPlanFee.callCharge}
            </span>
            <span style={{ display: 'block', marginBottom: '10px', fontSize: '20px' }}>
              <strong>DTD Call Charge:</strong> ${selectedPlanFee.dtdCallCharge}
            </span>
            <span style={{ display: 'block', marginBottom: '10px', fontSize: '20px' }}>
              <strong>Status:</strong> {selectedPlanFee.isUsing ? 'Active' : 'Inactive'}
            </span>
            <button
              onClick={() => navigate(`/admin/UpdatePlanFee/${selectedPlanFee.planFeeId}`)}
              className="btn mb-2 btn-primary btn-sm me-2"
            >
              Update
            </button>
            <button
              onClick={() =>
                handlePlanFeeStatusChange(selectedPlanFee.planFeeId, selectedPlanFee.isUsing)
              }
              style={{
                backgroundColor: selectedPlanFee.isUsing ? '#dc3545' : '#007bff',
                color: 'white',
                border: '1px solid transparent',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                borderRadius: '0.2rem',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                marginRight: '0.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = selectedPlanFee.isUsing ? '#c82333' : '#0056b3'
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = selectedPlanFee.isUsing ? '#dc3545' : '#007bff'
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {selectedPlanFee.isUsing ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ) : (
          <div>Select a plan fee to see details</div>
        )}
      </div>
    </div>
  )
}

export default PlanList
