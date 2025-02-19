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
      {
        component: CNavItem,
        name: 'Feedbacks',
        to: '/admin/Feedbacks',
      },
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
      {
        component: CNavItem,
        name: 'Keyword',
        to: '/admin/Keyword',
      },
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

  //TEMPLATE============================================================================

  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/admin/',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/admin/',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/admin/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '',
        to: '/admin/base/',
      },
      {
        component: CNavItem,
        name: '',
        to: '/admin/base/s',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Calendar'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: '/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/admin/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/admin/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/admin/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/admin/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/admin/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/admin/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/admin/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/admin/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/admin/base/progress',
      },
      {
        component: CNavItem,
        name: 'Smart Pagination',
        href: 'https://coreui.io/react/docs/components/smart-pagination/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Smart Table'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: '/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/admin/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/admin/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/admin/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/admin/base/tooltips',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Virtual Scroller'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/virtual-scroller/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/admin/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/admin/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/admin/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/admin/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Loading Button'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/loading-button/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/admin/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/admin/forms/select',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Multi Select'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/multi-select/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/admin/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/admin/forms/range',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Range Slider'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/range-slider/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Rating'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/rating/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/admin/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/admin/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Date Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/date-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Date Range Picker',
        href: 'https://coreui.io/react/docs/forms/date-range-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Time Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/time-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/admin/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/admin/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/admin/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/admin/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/admin/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/admin/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/admin/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/admin/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/admin/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/admin/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/admin/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/admin/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/admin/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/admin/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/admin/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    to: '/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/admin/',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/admin/',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav
