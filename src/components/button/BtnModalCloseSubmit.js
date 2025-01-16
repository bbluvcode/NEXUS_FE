/* eslint-disable prettier/prettier */
import React from 'react'

function BtnModalCloseSubmit(props) {
  return (
    <div className="d-flex justify-content-around">
      {/* Modal footer */}
      <button type="button" className="btn btn-danger text-white w-50 me-1" data-bs-dismiss="modal">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary w-50">
        Submit
      </button>
    </div>
  )
}

export default BtnModalCloseSubmit
