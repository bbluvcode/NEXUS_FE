/* eslint-disable prettier/prettier */
import { cilEnvelopeClosed, cilEnvelopeLetter, cilMap, cilPhone } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

const ClientFooter = () => {
  return (
    <footer className="pt-4">
      <div className="container text-center text-white">
        <div className="row">
          <div className="col-lg-4">
            <a href="index.html" className="logo">
              <img src="logo_textwhite_trans.png" alt="Company Logo" style={{ width: 160 }} />
            </a>
            <p>
              Propel Your Business Forward with Expert Technology Partnerships. At Nexus Systems
              Inc, we connect you with comprehensive IT strategies and support, tailored to navigate
              your unique business challenges.
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <h4>Our Services</h4>
            <a>Dial-up</a>
            <a>Landline</a>
            <a>Broadband</a>
            <a>Equipment</a>
          </div>
          <div className="col-lg-4">
            <h4>Contact infomation</h4>
            <ul className="info">
              <li>
                <a href="#">
                  <CIcon icon={cilPhone} style={{ transform: 'rotate(90deg)' }} /> 010-020-0340
                </a>
              </li>
              <li>
                <a href="#">
                  <CIcon icon={cilEnvelopeLetter} /> nexus@company.com
                </a>
              </li>
              <li>
                <a href="#">
                  <CIcon icon={cilMap} /> 391 NKKN, District 3, Ho Chi Minh City.
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <p>
              Copyright © 2024-2025 Nexus Service Marketing System Co., Ltd. All Rights Reserved. <br />
              T1.2308A0 - GROUP 4: MAN NHAT HUY BINH
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ClientFooter
