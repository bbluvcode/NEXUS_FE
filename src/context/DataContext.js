/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [retainShops, setRetainShops] = useState([]);

    const data = {
        employees,
        setEmployees,
        retainShops,
        setRetainShops
    };

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Xác định kiểu dữ liệu cho children
DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};
