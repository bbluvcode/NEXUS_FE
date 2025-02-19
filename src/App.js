import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './root.css'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import './style/BinhStyle.module.css'
import './style/HuyStyle.module.css'
import './style/NhatStyle.module.css'
import './style/ManStyle.module.css'
import ClientLayout from './layout/ClientLayout'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './Error Boundary'
import SuccessDeposit from './views/pages/payment/SuccessDeposit'

// Containers
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))

// Pages
const EmployeeLogin = React.lazy(() => import('./views/pages/login/EmployeeLogin'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
                </div>
              }
            >
              <Routes>
                <Route exact path="/employeelogin" name="Login Page" element={<EmployeeLogin />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route
                  exact
                  path="/success-deposit"
                  name="Success Deposit"
                  element={<SuccessDeposit />}
                />
                <Route path="/admin/*" name="Home" element={<AdminLayout />} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/*" name="Home" element={<ClientLayout />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
