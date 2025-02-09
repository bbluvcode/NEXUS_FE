/* eslint-disable react/prop-types */ /* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const BtnReq = (props) => {
  const { setIform, setServiceSelected } = useContext(DataContext)
  const navigate = useNavigate()
  
  // handleRegisterClick.js
  const handleRegisterClick = () => {
    setServiceSelected(props.serviceSelected)    
    const customerInfo = localStorage.getItem('customerInfo')
    console.log("🚀 ~ handleRegisterClick ~ customerInfo:", customerInfo)
    const parsedCustomerInfo = customerInfo ? JSON.parse(customerInfo) : null
    console.log("🚀 ~ handleRegisterClick ~ parsedCustomerInfo:", parsedCustomerInfo)
    const cusId = parsedCustomerInfo?.customerId
    console.log("🚀 ~ handleRegisterClick ~ cusId:", cusId)

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('myModal'))

    if (cusId) {
      // User has a customer ID
      setIform('CusReqCreateForm')
      modalInstance.show()
    } else {
      modalInstance.hide()
      Swal.fire({
        title: 'Do you have an account?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Let log in', '', 'info')
          navigate('/login')
        } else if (result.isDenied) {
          Swal.fire('Enter Customer Info', '', 'info')
          setIform('CustomerCreateFormClient')
          modalInstance.show()
        }
      })
    }
  }

  return (
    <div>
      <button
        className="btn btn-info text-white nb"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        onClick={handleRegisterClick}
      >
        Register NOW
      </button>
    </div>
  )
}

export default BtnReq
