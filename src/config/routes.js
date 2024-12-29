import { element, exact } from 'prop-types'
import React from 'react'

//=================================================================================
//ADMIN START
//=================================================================================
//customer
const CustomerList = React.lazy(() => import('../views/admin/customer/CustomerList'))
const CustomerDetail = React.lazy(() => import('../views/admin/customer/CustomerDetail'))
const CustomerRequest = React.lazy(() => import('../views/admin/customer/CustomerRequest'))
const UpdateCustomer = React.lazy(() => import('../views/admin/customer/UpdateCustomer'))
const AddCustomer = React.lazy(() => import('../views/admin/customer/AddCustomer'))
const SupportRequest = React.lazy(() => import('../views/admin/customer/SupportRequest'))
const Feedbacks = React.lazy(() => import('../views/admin/customer/Feedbacks'))
//employee

//order
const ConnectionList = React.lazy(() => import('../views/admin/connections/ConnectionList'))
const ServiceOrder = React.lazy(() => import('../views/admin/orders/ServiceOrder'))
const ServiceBillList = React.lazy(() => import('../views/admin/bills/ServiceBillList'))
const Discount = React.lazy(() => import('../views/admin/discount/Discount'))
//stock

//=================================================================================
//ADMIN END
//=================================================================================
//=================================================================================
//TEMPLATE
//=================================================================================
const Dashboard = React.lazy(() => import('../views/template/dashboard/Dashboard'))
const Colors = React.lazy(() => import('../views/template/theme/colors/Colors'))
const Typography = React.lazy(() => import('../views/template/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('../views/template/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('../views/template/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('../views/template/base/cards/Cards'))
const Carousels = React.lazy(() => import('../views/template/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('../views/template/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('../views/template/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('../views/template/base/navs/Navs'))
const Paginations = React.lazy(() => import('../views/template/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('../views/template/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('../views/template/base/popovers/Popovers'))
const Progress = React.lazy(() => import('../views/template/base/progress/Progress'))
const Spinners = React.lazy(() => import('../views/template/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('../views/template/base/tabs/Tabs'))
const Tables = React.lazy(() => import('../views/template/base/tables/Tables'))
const Tooltips = React.lazy(() => import('../views/template/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('../views/template/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(
  () => import('../views/template/buttons/button-groups/ButtonGroups'),
)
const Dropdowns = React.lazy(() => import('../views/template/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('../views/template/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(
  () => import('../views/template/forms/floating-labels/FloatingLabels'),
)
const FormControl = React.lazy(() => import('../views/template/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('../views/template/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('../views/template/forms/layout/Layout'))
const Range = React.lazy(() => import('../views/template/forms/range/Range'))
const Select = React.lazy(() => import('../views/template/forms/select/Select'))
const Validation = React.lazy(() => import('../views/template/forms/validation/Validation'))

const Charts = React.lazy(() => import('../views/template/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('../views/template/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('../views/template/icons/flags/Flags'))
const Brands = React.lazy(() => import('../views/template/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('../views/template/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('../views/template/notifications/badges/Badges'))
const Modals = React.lazy(() => import('../views/template/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('../views/template/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('../views/template/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  //customer
  { path: '/AddCustomer', exact: true, name: 'AddCustomer', element: AddCustomer },
  { path: '/CustomerDetail', exact: true, name: 'CustomerDetail', element: CustomerDetail },
  { path: '/CustomerList', exact: true, name: 'CustomerList', element: CustomerList },
  { path: '/CustomerRequest', exact: true, name: 'CustomerRequest', element: CustomerRequest },
  { path: '/CustomerRequest', exact: true, name: 'CustomerRequest', element: CustomerRequest },
  { path: '/UpdateCustomer', exact: true, name: 'UpdateCustomer', element: UpdateCustomer },
  { path: '/Feedbacks', exact: true, name: 'Feedbacks', element: Feedbacks },
  { path: '/SupportRequest', exact: true, name: 'SupportRequest', element: SupportRequest },

  //order
  { path: '/ConnectionList', exact: true, name: 'ConnectionList', element: ConnectionList },
  { path: '/ServiceOrder', exact: true, name: 'ServiceOrder', element: ServiceOrder },
  { path: '/ServiceBillList', exact: true, name: 'ServiceBillList', element: ServiceBillList },
  { path: '/Discount', exact: true, name: 'Discount', element: Discount },
  //=================================================================================
  //TEMPLATE
  //=================================================================================
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
