"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleEmployeeStatus = exports.updateEmployeeRole = exports.addEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiConstant = require("../constant/apiConstant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prettier/prettier */
// Get all employees
var getAllEmployees = function getAllEmployees() {
  var response;
  return regeneratorRuntime.async(function getAllEmployees$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(_apiConstant.apiEmployee));

        case 3:
          response = _context.sent;
          console.log(response.data);
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching employees", _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get employee by ID


exports.getAllEmployees = getAllEmployees;

var getEmployeeById = function getEmployeeById(id) {
  var response;
  return regeneratorRuntime.async(function getEmployeeById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_apiConstant.apiEmployee).concat(id)));

        case 3:
          response = _context2.sent;
          console.log(response.data);
          return _context2.abrupt("return", response.data);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching employee with ID ".concat(id), _context2.t0);
          throw _context2.t0;

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Add a new employee


exports.getEmployeeById = getEmployeeById;

var addEmployee = function addEmployee(employee) {
  var response;
  return regeneratorRuntime.async(function addEmployee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(_apiConstant.apiEmployee, employee));

        case 3:
          response = _context3.sent;
          console.log(response.data);
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error("Error adding employee", _context3.t0);
          throw _context3.t0;

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Update employee role


exports.addEmployee = addEmployee;

var updateEmployeeRole = function updateEmployeeRole(id, employee) {
  var response;
  return regeneratorRuntime.async(function updateEmployeeRole$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(_apiConstant.apiEmployee).concat(id, "/role"), employee));

        case 3:
          response = _context4.sent;
          console.log(response.data);
          return _context4.abrupt("return", response.data);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating role for employee with ID ".concat(id), _context4.t0);
          throw _context4.t0;

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Toggle employee status


exports.updateEmployeeRole = updateEmployeeRole;

var toggleEmployeeStatus = function toggleEmployeeStatus(id) {
  var response;
  return regeneratorRuntime.async(function toggleEmployeeStatus$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(_apiConstant.apiEmployee).concat(id, "/status")));

        case 3:
          response = _context5.sent;
          console.log(response.data);
          return _context5.abrupt("return", response.data);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error("Error toggling status for employee with ID ".concat(id), _context5.t0);
          throw _context5.t0;

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.toggleEmployeeStatus = toggleEmployeeStatus;