/* eslint-disable prettier/prettier */
import { element } from 'prop-types'
import React from 'react'

const Home = React.lazy(() => import('../views/client/Home'))
const About = React.lazy(() => import('../views/client/About'))
const News = React.lazy(() => import('../views/client/News'))
const Services = React.lazy(() => import('../views/client/Services'))
const Request = React.lazy(() => import('../views/client/Request'))
const Support = React.lazy(() => import('../views/client/Support'))
const Equipment = React.lazy(() => import('../views/client/Equipment'))

const routesClient = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/about', exact: true, name: 'About', element: About },
  { path: '/news', exact: true, name: 'News', element: News },
  { path: '/services', exact: true, name: 'Services', element: Services },
  { path: '/request', exact: true, name: 'Request', element: Request },
  { path: '/support', exact: true, name: 'Support', element: Support },
  { path: '/equipment', exact: true, name: 'Equipment', element: Equipment },
]

export default routesClient
