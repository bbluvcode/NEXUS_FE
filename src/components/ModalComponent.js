/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

function ModalComponent(props) {
  const { iform } = useContext(DataContext)
  return (
    <div>
      {/* The Modal */}
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content" style={{ minWidth: '800px' }}>
            {/* Modal Header */}
            <div className="modal-header">
              {/* <h4 className="modal-title">Modal Heading</h4> */}
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            {/* Modal body */}
            <div className="modal-body">{props.children[iform]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModalComponent)
