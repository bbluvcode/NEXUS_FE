"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRetailShop = exports.apiEmployee = void 0;
var API_PORT = 5185;
var apiEmployee = "http://localhost:".concat(API_PORT, "/api/Employee/");
exports.apiEmployee = apiEmployee;
var apiRetailShop = "http://localhost:".concat(API_PORT, "/api/RetailShop/");
exports.apiRetailShop = apiRetailShop;