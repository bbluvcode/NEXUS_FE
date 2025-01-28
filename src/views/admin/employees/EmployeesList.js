import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRetailShops } from '../../../services/retailShopSerivce'
import { getAllEmployees } from '../../../services/employeeService'
import { apiImage } from '../../../constant/apiConstant'

const RetailShopList = () => {
  const [shops, setShops] = useState([])
  const [employeeStatus, setEmployeeStatus] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchShopsAndEmployees = async () => {
      try {
        const shopResponse = await getAllRetailShops()
        const fetchedShops = shopResponse.data
        setShops(fetchedShops)

        const statusMap = {}
        for (const shop of fetchedShops) {
          const employeeResponse = await getAllEmployees(shop.retailShopId)
          const employees = employeeResponse.data
          const relevantEmployees = employees.filter(
            (employee) => employee.retailShopId === shop.retailShopId,
          )
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
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/AddRetailShop')}>
        Add Shop
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {shops.map((shop) => (
          <div
            key={shop.retailShopId}
            className="shop-card"
            onClick={() => handleShopClick(shop.retailShopId)}
            style={{
              cursor: 'pointer',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              marginBottom: '20px',
            }}
          >
            <img
              src={`${apiImage}${shop.image.split('/').pop()}`}
              alt={shop.retailShopName}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h3>{shop.retailShopName}</h3>
            <p>{shop.address}</p>
            {renderEmployeeDots(employeeStatus[shop.retailShopId] || [])}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailShopList
