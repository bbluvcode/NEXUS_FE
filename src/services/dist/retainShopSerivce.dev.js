"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRetailShop = exports.addRetailShop = exports.getRetailShopById = exports.getAllRetailShops = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _apiConstant = require("../constant/apiConstant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prettier/prettier */
// Get all RetailShops
var getAllRetailShops = function getAllRetailShops() {
  var response;
  return regeneratorRuntime.async(function getAllRetailShops$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(_apiConstant.apiRetailShop));

        case 3:
          response = _context.sent;
          console.log(response.data);
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching RetailShops", _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get RetailShop by ID


exports.getAllRetailShops = getAllRetailShops;

var getRetailShopById = function getRetailShopById(id) {
  var response;
  return regeneratorRuntime.async(function getRetailShopById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_apiConstant.apiRetailShop).concat(id)));

        case 3:
          response = _context2.sent;
          console.log(response.data);
          return _context2.abrupt("return", response.data);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching RetailShop with ID ".concat(id), _context2.t0);
          throw _context2.t0;

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Add new RetailShop


exports.getRetailShopById = getRetailShopById;

var addRetailShop = function addRetailShop(retailShop) {
  var response;
  return regeneratorRuntime.async(function addRetailShop$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(_apiConstant.apiRetailShop, retailShop));

        case 3:
          response = _context3.sent;
          console.log(response.data);
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error("Error adding RetailShop", _context3.t0);
          throw _context3.t0;

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Update existing RetailShop


exports.addRetailShop = addRetailShop;

var updateRetailShop = function updateRetailShop(id, retailShop) {
  var response;
  return regeneratorRuntime.async(function updateRetailShop$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(_apiConstant.apiRetailShop).concat(id), retailShop));

        case 3:
          response = _context4.sent;
          console.log(response.data);
          return _context4.abrupt("return", response.data);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating RetailShop with ID ".concat(id), _context4.t0);
          throw _context4.t0;

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.updateRetailShop = updateRetailShop;