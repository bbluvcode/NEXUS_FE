/* eslint-disable prettier/prettier */
import { cilEnvelopeLetter, cilPhone, cilStar, cilUserPlus, cilEnvelopeOpen, cilUser, cilBasket, cilCart, cilHttps, cilPenNib, cilNewspaper, cilPaperPlane } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownHeader, CDropdownItem, CDropdownDivider, CBadge, CAvatar } from '@coreui/react';
import avatar10 from '../../../assets/images/avatars/10.png';
import { useAuth } from '../../../context/AuthContext';

const StyledHeader = styled.div`
  nav a {
    cursor: pointer;
  }
`;

const ClientHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, logoutCustomer } = useAuth();

  const handleLogout = () => {
    logoutCustomer();
    navigate('/'); // Redirect after logout
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

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

      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a onClick={() => navigate('/')} className="logo">
                  <img src="logo_textblack_trans.png" alt="textBlack" style={{ width: '10rem', cursor: 'pointer' }} />
                </a>

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
                  {customer ? (
                    <div className="scroll-to-section">
                      <CDropdown variant="nav-item">
                        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                          <CAvatar src={customer?.avatar || avatar10} size="md" />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                          <CDropdownHeader className="bg-body-secondary fw-semibold my-2 text-center">
                            Account
                          </CDropdownHeader>
                          <CDropdownItem href="#">
                            <CIcon icon={cilEnvelopeOpen} className="me-2" />
                            Messages
                            <CBadge color="success" className="ms-2">
                              42
                            </CBadge>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigate('/profile')}>
                            <CIcon icon={cilUser} className="me-2" />
                            Profile
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigate('/changepassword')}>
                            <CIcon icon={cilPenNib} className="me-2" />
                            Change Password
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigate('/requesthistory')}>
                            <CIcon icon={cilBasket} className="me-2" />
                            Request History
                          </CDropdownItem>           
                          <CDropdownItem onClick={() => navigate('/orderhistory')}>
                            <CIcon icon={cilCart} className="me-2" />
                            Order History
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigate('/supporthistory')}>
                            <CIcon icon={cilPaperPlane} className="me-2" />
                            Support History
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigate('/feedbackhistory')}>
                            <CIcon icon={cilNewspaper} className="me-2" />
                            Feedback History
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem onClick={handleLogout}>
                            <CIcon icon={cilHttps} className="me-2" />
                            Logout
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  ) : (
                    <div className="scroll-to-section">
                      <div className="border-first-button">
                        <a onClick={() => navigate('/login')}>Login</a>
                      </div>
                    </div>
                  )}
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </StyledHeader>
  );
};

export default ClientHeader;
