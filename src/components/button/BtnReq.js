/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'

const BtnReq = (props) => {
  const { setIform } = useContext(DataContext)

  return (
    <div>
      <button
        className="btn btn-info text-white nb "
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        onClick={() => {
          const cusId = localStorage.getItem('cusId')
          console.log('🚀 ~ BtnReq ~ cusId:', cusId)
          if (cusId) {
            setIform('CusReqCreateForm')
          } else{
            setIform('CustomerCreateFormClient')
          }
        }}
      >
        Register
      </button>
    </div>
  )
}

export default BtnReq
