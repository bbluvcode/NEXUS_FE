import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, ModalComponent } from '../components/index'
import CustomerCreateForm from '../components/form/CustomerCreateForm'
import CustomerEditForm from '../components/form/CustomerEditForm'

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
        <CustomerCreateForm />
        <CustomerEditForm />
      </ModalComponent>{' '}
    </div>
  )
}

export default AdminLayout
