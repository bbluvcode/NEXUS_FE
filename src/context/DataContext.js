/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DataContext = createContext()
export const useDataContext = () => {
    return useContext(DataContext);
};
export const DataProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [plans, setPlans] = useState([]);
    const [planFees, setPlanFees] = useState([]);
    const [expandedPlans, setExpandedPlans] = useState({});
    const [selectedPlanFee, setSelectedPlanFee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retailShops, setRetailShops] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [InstockOrders, setInStockOrders] = useState([]);
    //usestate form
    const [iform, setIform] = useState("");
    const [serviceSelected, setServiceSelected] = useState(null);

    const data = {
        employees,
        setEmployees,
        plans,
        setPlans,
        planFees,
        setPlanFees,
        expandedPlans,
        setExpandedPlans,
        selectedPlanFee,
        setSelectedPlanFee,
        loading,
        setLoading,
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
