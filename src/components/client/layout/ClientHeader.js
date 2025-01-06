/* eslint-disable prettier/prettier */
import { cilEnvelopeLetter, cilFace, cilPhone, cilStar, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'

const ClientHeader = () => {
  return (
    <div>
      <div className="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-8 col-7">
              <ul className="info">
                <li>
                  <a href="#">
                    <CIcon icon={cilEnvelopeLetter}  /> nexus@company.com
                  </a>
                </li>
                <li>
                  <a href="#">
                    <CIcon icon={cilPhone} style={{ transform: 'rotate(90deg)' }} /> 010-020-0340
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-sm-4 col-5">
              <ul className="social-media">
                <li>
                  <a href="#">
                    <CIcon icon={cilStar}  /> 
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className='fa fa-facebook'></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                  <CIcon icon={cilUserPlus}  /> 
                  </a>
                </li>                
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Pre-header End */}
      {/* ***** Header Area Start ***** */}
      <header
        className="header-area header-sticky wow slideInDown"
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <a href="/" className="logo">
                  <img src="logo_textblack_trans.png" alt style={{ width: '10rem' }} />
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="#top" className="active">
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a className="dropdown-toggle" href role="button" data-bs-toggle="dropdown">
                      Services
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Dial-Up
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Broadband
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Landline
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#blog">Equipment</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#portfolio">News</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#about">About</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact">Support</a>
                  </li>
                  <li className="scroll-to-section dropdown">
                    <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Link
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another link
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          A third link
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="scroll-to-section">
                    <div className="border-first-button">
                      <a href="#contact">Log In</a>
                    </div>
                  </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default ClientHeader
