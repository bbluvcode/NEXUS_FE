import React from 'react';
import { CButton, CCol, CContainer, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import "./page404.css"

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div
      className="bg-body-tertiary min-vh-100 d-flex flex-column justify-content-start"
      style={{
        backgroundImage: 'url(https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-3-800x534.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

      }}
    >
      <CContainer className='pt-5'>
        <CRow className="justify-content-start">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for was not found.
              </p>
            </div>
            <CInputGroup className="input-prepend">
            </CInputGroup>
            <button className="fs-4 mt-3 cssbuttons-io-button" onClick={handleGoHome}>
              Go to Home
              <div className="icon-backtohome">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>

          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page404;
