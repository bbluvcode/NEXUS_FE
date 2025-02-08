import { useAuth } from './AuthContext'
import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const DataContext = createContext()
export const useDataContext = () => {
  return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
  const { employee } = useAuth() || {}
  const [employees, setEmployees] = useState([])
  const [plans, setPlans] = useState([])
  const [planFees, setPlanFees] = useState([])
  const [expandedPlans, setExpandedPlans] = useState({})
  const [selectedPlanFee, setSelectedPlanFee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [retailShops, setRetailShops] = useState([])
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [equipments, setEquipments] = useState([])
  const [equipmentTypes, setEquipmentTypes] = useState([])
  const [stocks, setStocks] = useState([])
  const [InstockOrders, setInStockOrders] = useState([])
  const [OutstockOrders, setOutStockOrders] = useState([])
  const [iform, setIform] = useState('')
  const [serviceSelected, setServiceSelected] = useState(null)
  const [currentEmployee, setCurrentEmployee] = useState(() => {
    return JSON.parse(localStorage.getItem('currentEmployee')) || null
  })
  const [newsTitle, setNewsTitle] = useState('')
  const [newsContent, setNewsContent] = useState('')
  const [newsEmployeeId, setNewsEmployeeId] = useState('')

  useEffect(() => {
    if (employee) {
      setCurrentEmployee(employee)
      localStorage.setItem('currentEmployee', JSON.stringify(employee))
    } else {
      setCurrentEmployee(null)
      localStorage.removeItem('currentEmployee')
    }
  }, [employee])

  const data = {
    currentEmployee,
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
    OutstockOrders,
    setOutStockOrders,
    iform,
    setIform,
    serviceSelected,
    setServiceSelected,
    newsTitle,
    setNewsTitle,
    newsContent,
    setNewsContent,
    newsEmployeeId,
    setNewsEmployeeId,
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

// Xác định kiểu dữ liệu cho children
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
