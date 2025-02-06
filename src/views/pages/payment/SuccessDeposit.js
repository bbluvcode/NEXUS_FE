/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import axios from 'axios'
import { apiCustomer } from '../../../constant/apiConstant'
import styled from 'styled-components'

const StyledSuccessDeposit = styled.div`
  /* SuccessDeposit.css */
  .success-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
  }

  .success-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 50px;
    text-align: center;
    min-width: 450px;
  }

  .success-icon {
    font-size: 5rem;
    color: #28a745;
    margin-bottom: 15px;
  }

  .success-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #28a745;
    margin-bottom: 10px;
  }

  .success-text {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 20px;
  }

  .success-buttons button {
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 25px;
    transition: all 0.3s ease;
  }

  .success-buttons .btn-success:hover {
    background-color: #218838;
  }

  .success-buttons .btn-outline-primary:hover {
    background-color: #007bff;
    color: white;
  }
`

const SuccessDeposit = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const customerRequestId = queryParams.get('token')

    const capturePayment = async (customerRequestId) => {
      try {
        const response = await axios.post(apiCustomer + 'capture-deposit', { customerRequestId })
      } catch (error) {
        console.log('🚀 ~ capturePayment ~ error:', error)
      }
    }

    if (customerRequestId) {
      capturePayment(customerRequestId)
    }
  }, [])
  return (
    <StyledSuccessDeposit>
      <div className="success-container">
      <div className="success-card">
        <i className="fas fa-check-circle success-icon"></i>
        <h3 className="success-title">Deposit Successful!</h3>
        <p className="success-text">
          Your register has been successfully processed. Thank you for your purchase!
        </p>
        <div className="success-buttons">
          <button onClick={() => (window.location.href = "/")} className="btn btn-success me-2">
            Back to Home
          </button>
          <button onClick={() => (window.location.href = "/services")} className="btn btn-outline-primary">
            View other services
          </button>
        </div>
      </div>
    </div>
    </StyledSuccessDeposit>
  )
}

export default SuccessDeposit
