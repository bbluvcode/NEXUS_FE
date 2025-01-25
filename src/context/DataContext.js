/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [retailShops, setRetailShops] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [stocks, setStocks] = useState([]); 
    //usestate form
    const [iform, setIform] = useState("");
    const [serviceSelected, setServiceSelected] = useState(null);

    const data = {
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
        iform, setIform,
        serviceSelected, setServiceSelected,
    };

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Xác định kiểu dữ liệu cho children
DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};
