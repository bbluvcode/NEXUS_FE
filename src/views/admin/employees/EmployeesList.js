import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRetailShops } from '../../../services/retailShopSerivce'
import { getAllEmployees } from '../../../services/employeeService'

const RetailShopList = () => {
  const [shops, setShops] = useState([])
  const [employeeStatus, setEmployeeStatus] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchShopsAndEmployees = async () => {
      try {
        // Fetch retail shops
        const shopResponse = await getAllRetailShops()
        const fetchedShops = shopResponse.data
        setShops(fetchedShops)

        // Fetch employees for each shop and map their status
        const statusMap = {}
        for (const shop of fetchedShops) {
          // Fetch employees for this shop only
          const employeeResponse = await getAllEmployees(shop.retailShopId)
          const employees = employeeResponse.data

          // Filter employees to only those matching the current shop's retailShopId
          const relevantEmployees = employees.filter(
            (employee) => employee.retailShopId === shop.retailShopId,
          )

          // Map statuses of relevant employees
          const statusCounts = relevantEmployees.map((employee) => employee.status)
          statusMap[shop.retailShopId] = statusCounts
        }

        setEmployeeStatus(statusMap)
      } catch (error) {
        console.error('Error loading retail shops or employees', error)
      }
    }
    fetchShopsAndEmployees()
  }, [])

  const handleShopClick = (id) => {
    navigate(`/admin/retailshop/${id}`)
  }

  const renderEmployeeDots = (statuses = []) => {
    const maxDots = 5
    const statusColors = statuses.slice(0, maxDots).map((status) => (status ? 'green' : 'red'))

    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        {statusColors.map((color, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Retail Shops</h1>
      <div className="shop-list">
        {shops.map((shop) => (
          <div
            key={shop.retailShopId}
            className="shop-item"
            onClick={() => handleShopClick(shop.retailShopId)}
            style={{
              cursor: 'pointer',
              margin: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{shop.retailShopName}</span>
            {renderEmployeeDots(employeeStatus[shop.retailShopId] || [])}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailShopList
