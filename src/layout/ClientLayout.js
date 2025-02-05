/* eslint-disable prettier/prettier */
import React from 'react'
import ClientHeader from '../components/client/layout/ClientHeader'
import ClientFooter from '../components/client/layout/ClientFooter'
import ClientContent from '../components/client/layout/ClientContent'
import { ModalComponent } from '../components'

const ClientLayout = () => {
  return (
    <div>
      <ClientHeader />
      <div className="ClientContent" style={{ paddingTop: '100px' }}>
      {/* <BtnModal iform="ClientCusReq" name="ClientCusReq" style="info" /> */}
        <ClientContent />
      </div>
      <ClientFooter />
      <ModalComponent/>
    </div>
  )
}

export default ClientLayout
