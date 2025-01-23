/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const BtnReq = (props) => {
  const { setIform } = useContext(DataContext)
  const navigate = useNavigate()

  const handleRegisterClick = () => {
    const customerInfo = localStorage.getItem('customerInfo')
    const parsedCustomerInfo = customerInfo ? JSON.parse(customerInfo) : null
    const cusId = parsedCustomerInfo?.customerId

    if (cusId) {
      // User has a customer ID
      setIform('CusReqCreateForm')
      bootstrap.Modal.getInstance(document.getElementById('myModal')).show()
    } else {
      bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
      Swal.fire({
        title: 'Do you have an account?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Let log in', '', 'info')
          navigate('/login')
          bootstrap.Modal.getInstance(document.getElementById('myModal')).hide()
        } else if (result.isDenied) {
          Swal.fire('Enter Customer Info', '', 'info')
          setIform('CustomerCreateFormClient')
          bootstrap.Modal.getInstance(document.getElementById('myModal')).show()
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
        Register
      </button>
    </div>
  )
}

export default BtnReq
