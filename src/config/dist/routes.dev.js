"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = require("prop-types");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//=================================================================================
//ADMIN START
//=================================================================================
//customer
var Account = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/Account'));
  });
});

var CustomerList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/CustomerList'));
  });
});

var CustomerDetail = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/CustomerDetail'));
  });
});

var CustomerRequest = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/CustomerRequest'));
  });
});

var UpdateCustomer = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/UpdateCustomer'));
  });
});

var AddCustomer = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/AddCustomer'));
  });
});

var SupportRequest = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/SupportRequest'));
  });
});

var Feedbacks = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/customer/Feedbacks'));
  });
}); //employee


var EmployeeList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/employees/EmployeesList'));
  });
});

var EmployeeDetail = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/employees/EmployeeDetail'));
  });
});

var AddEmployee = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/employees/AddEmployee'));
  });
});

var EmployeeType = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/employees/EmployeeType'));
  });
});

var UpdateEmployee = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/employees/UpdateEmployee'));
  });
}); //plan


var AddPlan = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/plan/AddPlan'));
  });
});

var UpdatePlan = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/plan/UpdatePlan'));
  });
});

var PlanList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/plan/PlanList'));
  });
}); //vendor
//order


var ServiceOrder = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/orders/ServiceOrder'));
  });
}); //connection


var ConnectionList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/connections/ConnectionList'));
  });
});

var AddConnection = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/connections/AddConnection'));
  });
}); // const UpdateConnection = React.lazy(() => import('../views/admin/connections/UpdateConnection'))
//bill


var ServiceBillList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/bills/ServiceBillList'));
  });
}); //discount


var Discount = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/discount/Discount'));
  });
}); //equipment


var AddEquipment = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/equiments/AddEquipment'));
  });
});

var EquipmentList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/equiments/EquipmentList'));
  });
});

var EquipmentType = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/equiments/EquipmentType'));
  });
}); //others


var Region = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/others/Region'));
  });
});

var NewsList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/others/NewsList'));
  });
}); //retainshop


var AddRetainShop = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/retainshop/AddRetainShop'));
  });
});

var RetainShopList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/retainshop/RetainShopList'));
  });
});

var UpdateRetainShop = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/retainshop/UpdateRetainShop'));
  });
}); //stock


var InStockOrder = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/stocks/InStockOrder'));
  });
});

var OutStockOrder = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/stocks/OutStockOrder'));
  });
});

var StockList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/stocks/StockList'));
  });
});

var StockRequest = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/stocks/StockRequest'));
  });
}); //vendor


var AddVendor = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/vendor/AddVendor'));
  });
});

var UpdateVendor = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/vendor/UpdateVendor'));
  });
});

var VendorList = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/admin/vendor/VendorList'));
  });
}); //=================================================================================
//ADMIN END
//=================================================================================
//=================================================================================
//TEMPLATE
//=================================================================================


var Dashboard = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/template/dashboard/Dashboard'));
  });
});

var routes = [{
  path: '/',
  exact: true,
  name: 'Home'
}, {
  path: '/dashboard',
  name: 'Dashboard',
  element: Dashboard
}, // { path: '/', exact: true, name: '', element:  },
//customer
{
  path: '/Account',
  exact: true,
  name: 'Account',
  element: Account
}, {
  path: '/AddCustomer',
  exact: true,
  name: 'AddCustomer',
  element: AddCustomer
}, {
  path: '/CustomerDetail',
  exact: true,
  name: 'CustomerDetail',
  element: CustomerDetail
}, {
  path: '/CustomerList',
  exact: true,
  name: 'CustomerList',
  element: CustomerList
}, {
  path: '/CustomerRequest',
  exact: true,
  name: 'CustomerRequest',
  element: CustomerRequest
}, {
  path: '/CustomerRequest',
  exact: true,
  name: 'CustomerRequest',
  element: CustomerRequest
}, {
  path: '/UpdateCustomer',
  exact: true,
  name: 'UpdateCustomer',
  element: UpdateCustomer
}, {
  path: '/Feedbacks',
  exact: true,
  name: 'Feedbacks',
  element: Feedbacks
}, {
  path: '/SupportRequest',
  exact: true,
  name: 'SupportRequest',
  element: SupportRequest
}, //employee
{
  path: '/EmployeeList',
  exact: true,
  name: 'EmployeeList',
  element: EmployeeList
}, {
  path: '/EmployeeDetail',
  exact: true,
  name: 'EmployeeDetail',
  element: EmployeeDetail
}, {
  path: '/AddEmployee',
  exact: true,
  name: 'AddEmployee',
  element: AddEmployee
}, {
  path: '/EmployeeType',
  exact: true,
  name: 'EmployeeType',
  element: EmployeeType
}, {
  path: '/UpdateEmployee',
  exact: true,
  name: 'UpdateEmployee',
  element: UpdateEmployee
}, //plan
{
  path: '/AddPlan',
  exact: true,
  name: 'AddPlan',
  element: AddPlan
}, {
  path: '/UpdatePlan',
  exact: true,
  name: 'UpdatePlan',
  element: UpdatePlan
}, {
  path: '/PlanList',
  exact: true,
  name: 'PlanList',
  element: PlanList
}, //order
{
  path: '/ConnectionList',
  exact: true,
  name: 'ConnectionList',
  element: ConnectionList
}, {
  path: '/ServiceOrder',
  exact: true,
  name: 'ServiceOrder',
  element: ServiceOrder
}, {
  path: '/ServiceBillList',
  exact: true,
  name: 'ServiceBillList',
  element: ServiceBillList
}, {
  path: '/Discount',
  exact: true,
  name: 'Discount',
  element: Discount
}, //equipment
{
  path: '/AddEquipment',
  exact: true,
  name: 'AddEquipment',
  element: AddEquipment
}, {
  path: '/EquipmentList',
  exact: true,
  name: 'EquipmentList',
  element: EquipmentList
}, {
  path: '/AddEmployee',
  exact: true,
  name: 'AddEmployee',
  element: AddEmployee
}, {
  path: '/EquipmentType',
  exact: true,
  name: 'EquipmentType',
  element: EquipmentType
}, //connection
{
  path: '/AddConnection',
  exact: true,
  name: 'AddConnection',
  element: AddConnection
}, //others
{
  path: '/Region',
  exact: true,
  name: 'Region',
  element: Region
}, {
  path: '/NewsList',
  exact: true,
  name: 'NewsList',
  element: NewsList
}, //retainshop
{
  path: '/AddRetainShop',
  exact: true,
  name: 'AddRetainShop',
  element: AddRetainShop
}, {
  path: '/RetainShopList',
  exact: true,
  name: 'RetainShopList',
  element: RetainShopList
}, {
  path: '/UpdateRetainShop',
  exact: true,
  name: 'UpdateRetainShop',
  element: UpdateRetainShop
}, //stock
{
  path: '/InStockOrder',
  exact: true,
  name: 'InStockOrder',
  element: InStockOrder
}, {
  path: '/OutStockOrder',
  exact: true,
  name: 'OutStockOrder',
  element: OutStockOrder
}, {
  path: '/StockList',
  exact: true,
  name: 'StockList',
  element: StockList
}, {
  path: '/StockRequest',
  exact: true,
  name: 'StockRequest',
  element: StockRequest
}, //vendor
{
  path: '/AddVendor',
  exact: true,
  name: 'AddVendor',
  element: AddVendor
}, {
  path: '/UpdateVendor',
  exact: true,
  name: 'UpdateVendor',
  element: UpdateVendor
}, {
  path: '/VendorList',
  exact: true,
  name: 'VendorList',
  element: VendorList
} //=================================================================================
//TEMPLATE
//=================================================================================
];
var _default = routes;
exports["default"] = _default;