"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRetainShop = exports.apiEmployee = void 0;
var API_PORT = 5185;
var apiEmployee = "http://localhost:".concat(API_PORT, "/api/Employee/");
exports.apiEmployee = apiEmployee;
var apiRetainShop = "http://localhost:".concat(API_PORT, "/api/RetainShop/");
exports.apiRetainShop = apiRetainShop;