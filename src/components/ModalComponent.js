/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import CustomerCreateForm from '../components/modalbody/CustomerCreateForm'
import CustomerEditForm from '../components/modalbody/CustomerEditForm'
import CusReqCreateForm from '../components/modalbody/CusReqCreateForm'
import CusReqEditForm from '../components/modalbody/CusReqEditForm'
import SupReqCreateForm from '../components/modalbody/SupReqCreateForm'
import SupReqEditForm from '../components/modalbody/SupReqEditForm'
import CusReqDetail from '../components/modalbody/CusReqDetail'
import FeedbackDetail from '../components/modalbody/FeedbackDetail'
import EquipmentCreateForm from '../components/modalbody/EquipmentCreateForm'
import EquipmentEditForm from '../components/modalbody/EquipmentEditForm'

function ModalComponent(props) {
  const { iform } = useContext(DataContext)

  const modalComponents = {
    EquipmentCreateForm: <EquipmentCreateForm />,
    EquipmentEditForm: <EquipmentEditForm />,
    CustomerCreateForm: <CustomerCreateForm />,
    CustomerEditForm: <CustomerEditForm />,
    CusReqCreateForm: <CusReqCreateForm />,
    CusReqEditForm: <CusReqEditForm />,
    CusReqDetail: <CusReqDetail />,
    SupReqCreateForm: <SupReqCreateForm />,
    SupReqEditForm: <SupReqEditForm />,
    FeedbackDetail: <FeedbackDetail />,
  }
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
            <div className="modal-body">
              {/* {props.children[iform]} */}
              {modalComponents[iform] || <p>No Content Available</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModalComponent)
