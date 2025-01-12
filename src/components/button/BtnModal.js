/* eslint-disable prettier/prettier */
import React from 'react'

function BtnModal(props) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        {props.name}
      </button>
    </div>
  )
}

export default React.memo(BtnModal)
