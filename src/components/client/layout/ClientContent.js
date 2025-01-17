/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../../../config/routesClient'
const ClientContent = () => {
  return (
    <div>
      {/* <CContainer className="px-4" lg> */}
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              )
            })}
            <Route path="/admin" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      {/* </CContainer> */}
    </div>
  )
}

export default ClientContent
