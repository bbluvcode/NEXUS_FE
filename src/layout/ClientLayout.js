/* eslint-disable prettier/prettier */
import React from 'react'
import ClientHeader from '../components/client/layout/ClientHeader'
import ClientFooter from '../components/client/layout/ClientFooter'
import ClientContent from '../components/client/layout/ClientContent'

const ClientLayout = () => {
  return (
    <div>
      <ClientHeader />
      <div className="ClientContent" 
      style={{ paddingTop: '100px' }}
      >
        <ClientContent />
      </div>
      <ClientFooter />
    </div>
  )
}

export default ClientLayout
