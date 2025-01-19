/* eslint-disable prettier/prettier */
import { cilEnvelopeLetter, cilFace, cilPhone, cilStar, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.div`
  nav a {
    cursor: pointer;
  }

`


const ClientHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()


  const isActive = (path) => (location.pathname === path ? 'active' : '')
  return (
    <StyledHeader>
      <div className="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-8 col-7">
              <ul className="info">
                <li>
                  <a href="#">
                    <CIcon icon={cilEnvelopeLetter} /> nexus@company.com
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
                    <CIcon icon={cilStar} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <CIcon icon={cilUserPlus} />
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
                <a onClick={() => navigate('/')} className="logo">
                  <img
                    src="logo_textblack_trans.png"
                    alt="textBlack"
                    style={{ width: '10rem', cursor: 'pointer' }}
                  />
                </a>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/')} className={isActive('/')}>
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/services')} className={isActive('/services')}>
                      Services
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/equipment')} className={isActive('/equipment')}>
                      Equipment
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/news')} className={isActive('/news')}>
                      News
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/about')} className={isActive('/about')}>
                      About
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a onClick={() => navigate('/support')} className={isActive('/support')}>
                      Support
                    </a>
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
                      <a onClick={() => navigate('/login')}>
                        Login
                      </a>
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
    </StyledHeader>
  )
}

export default ClientHeader
