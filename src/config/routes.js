import { element, exact } from 'prop-types'
import React from 'react'

//=================================================================================
//ADMIN START
//=================================================================================
//customer
const Account = React.lazy(() => import('../views/admin/customer/Account'))
const CustomerList = React.lazy(() => import('../views/admin/customer/CustomerList'))
const CustomerDetail = React.lazy(() => import('../views/admin/customer/CustomerDetail'))
const CustomerRequest = React.lazy(() => import('../views/admin/customer/CustomerRequest'))
const UpdateCustomer = React.lazy(() => import('../views/admin/customer/UpdateCustomer'))
const AddCustomer = React.lazy(() => import('../views/admin/customer/AddCustomer'))
const SupportRequest = React.lazy(() => import('../views/admin/customer/SupportRequest'))
const Feedbacks = React.lazy(() => import('../views/admin/customer/Feedbacks'))
//employee
const EmployeeList = React.lazy(() => import('../views/admin/employees/EmployeesList'))
const EmployeeDetail = React.lazy(() => import('../views/admin/employees/EmployeeDetail'))
const AddEmployee = React.lazy(() => import('../views/admin/employees/AddEmployee'))
const EmployeeType = React.lazy(() => import('../views/admin/employees/EmployeeType'))
const UpdateEmployee = React.lazy(() => import('../views/admin/employees/UpdateEmployee'))
//plan
const AddPlan = React.lazy(() => import('../views/admin/plan/AddPlan'))
const UpdatePlan = React.lazy(() => import('../views/admin/plan/UpdatePlan'))
const PlanList = React.lazy(() => import('../views/admin/plan/PlanList'))
//vendor

//order
const ServiceOrder = React.lazy(() => import('../views/admin/orders/ServiceOrder'))
//connection
const ConnectionList = React.lazy(() => import('../views/admin/connections/ConnectionList'))
const AddConnection = React.lazy(() => import('../views/admin/connections/AddConnection'))
// const UpdateConnection = React.lazy(() => import('../views/admin/connections/UpdateConnection'))

//bill
const ServiceBillList = React.lazy(() => import('../views/admin/bills/ServiceBillList'))
//discount
const Discount = React.lazy(() => import('../views/admin/discount/Discount'))

//equipment
const AddEquipment = React.lazy(() => import('../views/admin/equiments/AddEquipment'))
const EquipmentList = React.lazy(() => import('../views/admin/equiments/EquipmentList'))
const EquipmentType = React.lazy(() => import('../views/admin/equiments/EquipmentType'))

//others
const Region = React.lazy(() => import('../views/admin/others/Region'))
const NewsList = React.lazy(() => import('../views/admin/others/NewsList'))

//retainshop
const AddRetainShop = React.lazy(() => import('../views/admin/retainshop/AddRetainShop'))
const RetainShopList = React.lazy(() => import('../views/admin/retainshop/RetainShopList'))
const UpdateRetainShop = React.lazy(() => import('../views/admin/retainshop/UpdateRetainShop'))

//stock
const InStockOrder = React.lazy(() => import('../views/admin/stocks/InStockOrder'))
const OutStockOrder = React.lazy(() => import('../views/admin/stocks/OutStockOrder'))
const StockList = React.lazy(() => import('../views/admin/stocks/StockList'))
const StockRequest = React.lazy(() => import('../views/admin/stocks/StockRequest'))

//vendor
const AddVendor = React.lazy(() => import('../views/admin/vendor/AddVendor'))
const UpdateVendor = React.lazy(() => import('../views/admin/vendor/UpdateVendor'))
const VendorList = React.lazy(() => import('../views/admin/vendor/VendorList'))

//=================================================================================
//ADMIN END
//=================================================================================
//=================================================================================
//TEMPLATE
//=================================================================================
const Dashboard = React.lazy(() => import('../views/template/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/', exact: true, name: '', element:  },

  //customer
  { path: '/Account', exact: true, name: 'Account', element: Account },
  { path: '/AddCustomer', exact: true, name: 'AddCustomer', element: AddCustomer },
  { path: '/CustomerDetail', exact: true, name: 'CustomerDetail', element: CustomerDetail },
  { path: '/CustomerList', exact: true, name: 'CustomerList', element: CustomerList },
  { path: '/CustomerRequest', exact: true, name: 'CustomerRequest', element: CustomerRequest },
  { path: '/CustomerRequest', exact: true, name: 'CustomerRequest', element: CustomerRequest },
  { path: '/UpdateCustomer', exact: true, name: 'UpdateCustomer', element: UpdateCustomer },
  { path: '/Feedbacks', exact: true, name: 'Feedbacks', element: Feedbacks },
  { path: '/SupportRequest', exact: true, name: 'SupportRequest', element: SupportRequest },
  //employee
  { path: '/EmployeeList', exact: true, name: 'EmployeeList', element: EmployeeList },
  { path: '/EmployeeDetail/:id', exact: true, name: 'EmployeeDetail', element: EmployeeDetail },
  { path: '/AddEmployee', exact: true, name: 'AddEmployee', element: AddEmployee },
  { path: '/EmployeeType', exact: true, name: 'EmployeeType', element: EmployeeType },
  { path: '/UpdateEmployee', exact: true, name: 'UpdateEmployee', element: UpdateEmployee },

  //plan
  { path: '/AddPlan', exact: true, name: 'AddPlan', element: AddPlan },
  { path: '/UpdatePlan', exact: true, name: 'UpdatePlan', element: UpdatePlan },
  { path: '/PlanList', exact: true, name: 'PlanList', element: PlanList },

  //order
  { path: '/ConnectionList', exact: true, name: 'ConnectionList', element: ConnectionList },
  { path: '/ServiceOrder', exact: true, name: 'ServiceOrder', element: ServiceOrder },
  { path: '/ServiceBillList', exact: true, name: 'ServiceBillList', element: ServiceBillList },
  { path: '/Discount', exact: true, name: 'Discount', element: Discount },
  //equipment
  { path: '/AddEquipment', exact: true, name: 'AddEquipment', element: AddEquipment },
  { path: '/EquipmentList', exact: true, name: 'EquipmentList', element: EquipmentList },
  { path: '/AddEmployee', exact: true, name: 'AddEmployee', element: AddEmployee },
  { path: '/EquipmentType', exact: true, name: 'EquipmentType', element: EquipmentType },

  //connection
  { path: '/AddConnection', exact: true, name: 'AddConnection', element: AddConnection },

  //others
  { path: '/Region', exact: true, name: 'Region', element: Region },
  { path: '/NewsList', exact: true, name: 'NewsList', element: NewsList },

  //retainshop
  { path: '/AddRetainShop', exact: true, name: 'AddRetainShop', element: AddRetainShop },
  { path: '/RetainShopList', exact: true, name: 'RetainShopList', element: RetainShopList },
  { path: '/UpdateRetainShop', exact: true, name: 'UpdateRetainShop', element: UpdateRetainShop },

  //stock
  { path: '/InStockOrder', exact: true, name: 'InStockOrder', element: InStockOrder },
  { path: '/OutStockOrder', exact: true, name: 'OutStockOrder', element: OutStockOrder },
  { path: '/StockList', exact: true, name: 'StockList', element: StockList },
  { path: '/StockRequest', exact: true, name: 'StockRequest', element: StockRequest },

  //vendor
  { path: '/AddVendor', exact: true, name: 'AddVendor', element: AddVendor },
  { path: '/UpdateVendor', exact: true, name: 'UpdateVendor', element: UpdateVendor },
  { path: '/VendorList', exact: true, name: 'VendorList', element: VendorList },

  //=================================================================================
  //TEMPLATE
  //=================================================================================
]

export default routes
