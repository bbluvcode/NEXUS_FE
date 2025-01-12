/* eslint-disable prettier/prettier */
import React from 'react'
import CustomerCreateForm from './form/CustomerCreateForm'

function ModalComponent(props) {
  return (
    <div>
      {/* The Modal */}
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content" style={{'minWidth':'800px'}}>
            {/* Modal Header */}
            <div className="modal-header">
              {/* <h4 className="modal-title">Modal Heading</h4> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            {/* Modal body */}
            <div className="modal-body">
            <CustomerCreateForm/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModalComponent)
