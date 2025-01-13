import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRetailShops } from '../../../services/retailShopSerivce'

const RetailShopList = () => {
  const [shops, setShops] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await getAllRetailShops()
        // Assuming the response is in the format: { data: [...] }
        setShops(response.data)
      } catch (error) {
        console.error('Error loading retail shops', error)
      }
    }
    fetchShops()
  }, [])

  const handleShopClick = (id) => {
    navigate(`/admin/retailshop/${id}`)
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
            style={{ cursor: 'pointer', margin: '10px', padding: '10px', border: '1px solid #ccc' }}
          >
            {shop.retailShopName}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailShopList
