/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'

function BtnModal(props) {
  const {setIform} = useContext(DataContext);
  
  return (
    <div>
      <button
        type="button"
        className={`me-1 btn btn-${props.style}`}
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        onClick={()=>setIform(props.iform)}        
      >
        {props.name}
      </button>
      
    </div>
  )
}

export default React.memo(BtnModal)
