import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, ModalComponent } from '../components/index'
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

const AdminLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ModalComponent>
        <EquipmentCreateForm />
        <EquipmentEditForm />
        <CustomerCreateForm />
        <CustomerEditForm />
        <CusReqCreateForm />
        <CusReqEditForm />
        <CusReqDetail />
        <SupReqCreateForm />
        <SupReqEditForm />
        <FeedbackDetail />
      </ModalComponent>
    </div>
  )
}

export default AdminLayout
