/* eslint-disable prettier/prettier */
import { element } from 'prop-types'
import React from 'react'

const Home = React.lazy(() => import('../views/client/Home'))
const Request = React.lazy(() => import('../views/client/Request'))

const routesClient = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/Request', exact: true, name: 'Request', element: Request },
]

export default routesClient
