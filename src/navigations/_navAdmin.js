import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAirplay,
  cilAudio,
  cilBell,
  cilBolt,
  cilCalculator,
  cilCenterFocus,
  cilChartPie,
  cilCog,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilFire,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNav, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'ORDER',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ConnectionList',
        to: '/admin/ConnectionList',
      },
      {
        component: CNavItem,
        name: 'ServiceOrder',
        to: '/admin/ServiceOrder',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'BILL PAYMENT',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ServiceBillList',
        to: '/admin/ServiceBillList',
      },
      {
        component: CNavItem,
        name: 'Discount',
        to: '/admin/Discount',
      },
    ],
  },

  // {
  //   component: CNavTitle,
  //   name: 'Customer',
  // },
  {
    component: CNavGroup,
    name: 'CUSTOMER',
    to: '/admin',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CustomerList',
        to: '/admin/CustomerList',
      },
      {
        component: CNavItem,
        name: 'CustomerRequest',
        to: '/admin/CustomerRequest',
      },
      {
        component: CNavItem,
        name: 'SupportRequest',
        to: '/admin/SupportRequest',
      },
      // {
      //   component: CNavItem,
      //   name: 'Feedbacks',
      //   to: '/admin/Feedbacks',
      // },
    ],
  },

  //employee
  {
    component: CNavGroup,
    name: 'EMPLOYEE',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'EmployeeType',
        to: '/admin/EmployeeType',
        // icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'EmployeeList',
        to: '/admin/EmployeeList',
      }, // {
      //   component: CNavItem,
      //   name: 'EmployeeDetail',
      //   to: '/admin/EmployeeDetail',
      //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: 'AddEmployee',
        to: '/admin/AddEmployee',
      },
    ],
  },

  //plan

  {
    component: CNavGroup,
    name: 'PLAN',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PlanList',
        to: '/admin/PlanList',
      },
      {
        component: CNavItem,
        name: 'AddPlan',
        to: '/admin/AddPlan',
      },
      {
        component: CNavItem,
        name: 'AddPlanFee',
        to: '/admin/AddPlanFee',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'UpdatePlan',
  //   to: '/admin/UpdatePlan',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'AddPlan',
  //   to: '/admin/AddPlan',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  //equipment
  {
    component: CNavGroup,
    name: 'EQUIPMENT',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'AddEquipment',
        to: '/admin/AddEquipment',
      },
      {
        component: CNavItem,
        name: 'EquipmentList',
        to: '/admin/EquipmentList',
      },
      {
        component: CNavItem,
        name: 'EquipmentType',
        to: '/admin/EquipmentType',
      },
    ],
  },

  //connection
  {
    component: CNavGroup,
    name: 'CONNECTION',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ConnectionList',
        to: '/admin/ConnectionList',
      },
      {
        component: CNavItem,
        name: 'AddConnection',
        to: '/admin/AddConnection',
      },
    ],
  },

  //others
  {
    component: CNavGroup,
    name: 'OTHERS',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Keyword',
      //   to: '/admin/Keyword',
      // },
      {
        component: CNavItem,
        name: 'Region',
        to: '/admin/Region',
      },
      {
        component: CNavItem,
        name: 'NewsList',
        to: '/admin/NewsList',
      },
    ],
  },

  //retailshop
  {
    component: CNavGroup,
    name: 'RETAILSHOPS',
    icon: <CIcon icon={cilBolt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'AddRetailShop',
        to: '/admin/AddRetailShop',
      },
      {
        component: CNavItem,
        name: 'RetailShopList',
        to: '/admin/RetailShopList',
      },
    ],
  },

  //vendor
  {
    component: CNavGroup,
    name: 'VENDOR',
    icon: <CIcon icon={cilCenterFocus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'AddVendor',
        to: '/admin/AddVendor',
      },
      {
        component: CNavItem,
        name: 'VendorList',
        to: '/admin/VendorList',
      },
    ],
  },

  //stock
  {
    component: CNavGroup,
    name: 'STOCK',
    icon: <CIcon icon={cilFire} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'StockList',
        to: '/admin/StockList',
      },
      {
        component: CNavItem,
        name: 'OutStockOrder',
        to: '/admin/OutStockOrder',
      },
      {
        component: CNavItem,
        name: 'InStockOrder',
        to: '/admin/InStockOrder',
      },
      {
        component: CNavItem,
        name: 'StockRequest',
        to: '/admin/StockRequest',
      },
    ],
  },
]

export default _nav
