/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import CustomerCreateForm from './modalbody/admin/CustomerCreateForm'
import CustomerEditForm from './modalbody/admin/CustomerEditForm'
import CusReqCreateForm from './modalbody/admin/CusReqCreateForm'
import CusReqEditForm from './modalbody/admin/CusReqEditForm'
import SupReqCreateForm from './modalbody/admin/SupReqCreateForm'
import SupReqEditForm from './modalbody/admin/SupReqEditForm'
import CusReqDetail from './modalbody/admin/CusReqDetail'
import FeedbackDetail from './modalbody/admin/FeedbackDetail'
import EquipmentCreateForm from './modalbody/admin/EquipmentCreateForm'
import EquipmentEditForm from './modalbody/admin/EquipmentEditForm'
import StockCreateForm from './modalbody/admin/StockCreateForm'
import StockEditForm from './modalbody/admin/StockEditForm'
import KeywordCreateForm from './modalbody/admin/KeywordCreateForm'
import EquipmentTypeCreateForm from './modalbody/admin/EquipmentTypeCreateForm'
import InStockOrderCreateForm from './modalbody/admin/InStockOrderCreateForm'
import OutStockOrderCreateForm from './modalbody/admin/OutStockOrderCreateForm'
import SupportResponseForm from './modalbody/admin/SupportResponseForm'


function ModalComponent(props) {
  const { iform } = useContext(DataContext)

  const modalComponents = {
    EquipmentCreateForm: <EquipmentCreateForm />,
    EquipmentEditForm: <EquipmentEditForm />,
    EquipmentTypeCreateForm: <EquipmentTypeCreateForm/>,
    StockCreateForm: <StockCreateForm/>,
    StockEditForm: <StockEditForm/>,
    InStockOrderCreateForm: <InStockOrderCreateForm/>,
    OutStockOrderCreateForm: <OutStockOrderCreateForm/>,
    CustomerCreateForm: <CustomerCreateForm />,
    KeywordCreateForm: <KeywordCreateForm />,
    CustomerCreateFormClient: <CustomerCreateForm client={true} />,
    CustomerEditForm: <CustomerEditForm />,
    CusReqCreateForm: <CusReqCreateForm />,
    CusReqEditForm: <CusReqEditForm />,
    CusReqDetail: <CusReqDetail />,
    SupReqCreateForm: <SupReqCreateForm />,
    SupReqEditForm: <SupReqEditForm />,
    FeedbackDetail: <FeedbackDetail />,
    SupportResponseForm : <SupportResponseForm/>
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
