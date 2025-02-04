/* eslint-disable prettier/prettier */
import React from 'react';

function BtnModalClose(props) {
    return (
        <div className="d-flex justify-content-around mt-5">
        {/* Modal footer */}
        <button type="button" className="btn btn-danger text-white w-50" data-bs-dismiss="modal">
          Close
        </button>

      </div>
    );
}

export default BtnModalClose;