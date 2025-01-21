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
      >
        Register
      </button>
    </div>
  )
}

export default BtnReq
