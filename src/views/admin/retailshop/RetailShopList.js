import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRetailShops } from '../../../services/retailShopSerivce'
import { getAllRegions } from '../../../services/regionService'

const RetailShopList = () => {
  const [shops, setShops] = useState([])
  const [regions, setRegions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchField, setSearchField] = useState('retailShopName')
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate fetching region data from a backend API
    const fetchRegions = async () => {
      try {
        const data = await getAllRegions()
        setRegions(data.data)
      } catch (error) {
        console.error('Failed to fetch regions', error)
      }
    }

    // Fetch shops data from API
    const fetchShops = async () => {
      try {
        const response = await getAllRetailShops()
        if (Array.isArray(response.data)) {
          setShops(response.data)
        } else {
          console.error('Unexpected data format:', response)
          setShops([]) // Gán giá trị mặc định nếu không đúng định dạng
        }
      } catch (error) {
        console.error('Error loading retail shops:', error)
        setShops([]) // Gán giá trị mặc định nếu lỗi xảy ra
      }
    }

    fetchRegions()
    fetchShops()
  }, [])

  const filteredShops = shops.filter((shop) =>
    shop[searchField]?.toString().toLowerCase().includes(searchTerm),
  )

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Retail Shop List</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => navigate('/admin/AddRetailShop')}>
          Add Shop
        </button>

        <div className="d-flex">
          <select
            className="form-select me-2"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="retailShopName">Search by Name</option>
            <option value="address">Search by Address</option>
            <option value="email">Search by Email</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${searchField}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Region</th>
            <th>Shop Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Is Main Office</th>
            <th>Fax</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredShops.map((shop, index) => (
            <tr key={shop.retailShopId}>
              <td>{index + 1}</td>
              <td>
                {regions.find((region) => region.regionId === shop.regionId)?.regionName ||
                  'Unknown Region'}
              </td>
              <td>{shop.retailShopName}</td>
              <td>{shop.address}</td>
              <td>{shop.email}</td>
              <td>{shop.phone}</td>
              <td>{shop.isMainOffice ? 'Yes' : 'No'}</td>
              <td>{shop.fax || 'N/A'}</td>
              <td>
                <button className="btn btn-primary btn-sm">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RetailShopList
