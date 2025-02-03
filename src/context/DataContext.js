/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { employee } = useAuth() || {};
    const [employees, setEmployees] = useState([]);
    const [retailShops, setRetailShops] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [stocks, setStocks] = useState([]); 
    const [InstockOrders, setInStockOrders] = useState([]); 
    const [iform, setIform] = useState("");
    const [serviceSelected, setServiceSelected] = useState(null);
    const [currentEmployee, setCurrentEmployee] = useState(() => {
        return JSON.parse(localStorage.getItem("currentEmployee")) || null;
    });

    useEffect(() => {
        if (employee) {
            setCurrentEmployee(employee);
            localStorage.setItem("currentEmployee", JSON.stringify(employee));
        }
        else{
            setCurrentEmployee(null);
            localStorage.removeItem("currentEmployee");
        }
    }, [employee]);

    const data = {
        currentEmployee,
        employees,
        setEmployees,
        retailShops,
        setRetailShops,
        employeeTypes,
        setEmployeeTypes,
        equipments, 
        setEquipments,
        equipmentTypes,
        setEquipmentTypes,
        stocks, 
        setStocks,
        InstockOrders,
        setInStockOrders,
        iform, setIform,
        serviceSelected, setServiceSelected,
    };

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Xác định kiểu dữ liệu cho children
DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};
