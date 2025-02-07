/* eslint-disable prettier/prettier */
import { element } from 'prop-types'
import React from 'react'
import PrivateRoute from './privateRoute'

const Home = React.lazy(() => import('../views/client/Home'))
const About = React.lazy(() => import('../views/client/About'))
const News = React.lazy(() => import('../views/client/News'))
const NewsDetail = React.lazy(() => import('../views/client/NewsDetail'))
const Services = React.lazy(() => import('../views/client/Services'))
const ServicesDetail = React.lazy(() => import('../views/client/ServicesDetail'))
const Request = React.lazy(() => import('../views/client/Request'))
const Support = React.lazy(() => import('../views/client/Support'))
const Equipment = React.lazy(() => import('../views/client/Equipment'))
const Login = React.lazy(() => import('../views/client/Login'))
const ForgotPassword = React.lazy(() => import('../components/customerLogin/ForgotPassword'))
const ProfileUser = React.lazy(() => import('../components/userProfile/ProfileUser'))
const ChangePasswordTab = React.lazy(() => import('../components/userProfile/ChangePasswordTab'))
const OrderHistoryTab = React.lazy(() => import('../components/userProfile/OrderHistoryTab'))
const SupportHistoryTab = React.lazy(() => import('../components/userProfile/SupportHistoryTab'))
const RequestHistoryTab = React.lazy(() => import('../components/userProfile/RequestHistoryTab'))
const FeedbackHistoryTab = React.lazy(() => import('../components/userProfile/FeedbackHistoryTab'))
const TestPage = React.lazy(() => import('../views/admin/employees/TestPage'))

const routesClient = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/about', exact: true, name: 'About', element: About },
  { path: '/news', exact: true, name: 'News', element: News },
  { path: '/newsDetail/:id', exact: true, name: 'NewsDetail', element: NewsDetail },
  { path: '/services', exact: true, name: 'Services', element: Services },
  { path: '/servicesDetail/:planId', exact: true, name: 'ServicesDetail', element: ServicesDetail },
  { path: '/request', exact: true, name: 'Request', element: Request },
  { path: '/support', exact: true, name: 'Support', element: Support },
  { path: '/equipment', exact: true, name: 'Equipment', element: Equipment },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/forgotpassword', exact: true, name: 'ForgotPassword', element: ForgotPassword },
  { path: '/profile', exact: true, name: 'ProfileUser', element: () => <PrivateRoute element={ProfileUser} />, },
  { path: '/changepassword', exact: true, name: 'ChangePasswordTab', element: () => <PrivateRoute element={ChangePasswordTab} />, },
  { path: '/orderhistory', exact: true, name: 'OrderHistoryTab', element: () => <PrivateRoute element={OrderHistoryTab} />, },
  { path: '/supporthistory', exact: true, name: 'SupportHistoryTab', element: () => <PrivateRoute element={SupportHistoryTab} />, },
  { path: '/requesthistory', exact: true, name: 'RequestHistoryTab', element: () => <PrivateRoute element={RequestHistoryTab} />, },
  { path: '/feedbackhistory', exact: true, name: 'FeedbackHistoryTab', element: () => <PrivateRoute element={FeedbackHistoryTab} />, },
  { path: '/TestPage', exact: true, name: 'TestPage', element: TestPage },

]

export default routesClient
