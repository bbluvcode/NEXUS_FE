import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, ModalComponent } from '../components/index'

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
      <ModalComponent />
    </div>
  )
}

export default AdminLayout
