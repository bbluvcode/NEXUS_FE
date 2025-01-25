/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import axios from 'axios'
import { apiCustomer } from '../../../constant/apiConstant'

const SuccessDeposit = () => {
    
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const customerRequestId = queryParams.get('token')

    const capturePayment = async (customerRequestId) => {
      try {
          const response = await axios.post(apiCustomer + 'capture-deposit', {customerRequestId})
          console.log("🚀 ~ capturePayment ~ customerRequestId:", customerRequestId)
        console.log("🚀 ~ capturePayment ~ response SUCCESS:", response)
      } catch (error) {
      console.log("🚀 ~ capturePayment ~ error:", error)
  
      }
    }

    if (customerRequestId) {
      capturePayment(customerRequestId)
    }
  }, [])
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body text-center">
              <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
              <h3 className="card-title text-success mb-3">Deposit Successful!</h3>
              <p className="text-muted mb-4">Your resigter has been successfully processed. Thank you for your purchase!</p>
              <div>
                <button
                  onClick={() => window.location.href = "/"}
                  className="btn btn-success rounded-pill shadow-sm me-2"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.location.href = "/service"}
                  className="btn btn-outline-primary rounded-pill shadow-sm"
                >
                  View other service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessDeposit
