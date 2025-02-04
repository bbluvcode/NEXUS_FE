import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRetailShops, updateRetailShopStatus } from '../../../services/retailShopSerivce'
import { getAllRegions } from '../../../services/regionService'
import { apiImage } from '../../../constant/apiConstant'

const RetailShopList = () => {
  const [shops, setShops] = useState([])
  const [regions, setRegions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchField, setSearchField] = useState('retailShopName')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRegions()
    fetchShops()
  }, [])

  const fetchRegions = async () => {
    try {
      const data = await getAllRegions()
      setRegions(data.data)
    } catch (error) {
      console.error('Failed to fetch regions', error)
    }
  }

  const fetchShops = async () => {
    try {
      const response = await getAllRetailShops()
      setShops(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error loading retail shops:', error)
      setShops([])
    }
  }

  const toggleStatus = async (shopId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus
      await updateRetailShopStatus(shopId, updatedStatus)
      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop.retailShopId === shopId ? { ...shop, status: updatedStatus } : shop,
        ),
      )
    } catch (error) {
      console.error('Error toggling retail shop status:', error)
    }
  }

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

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Region</th>
            <th>Shop Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredShops.map((shop, index) => (
            <tr key={shop.retailShopId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`${apiImage}${shop.image.split('/').pop()}`}
                  alt={shop.retailShopName}
                  style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  data-bs-toggle="modal"
                  data-bs-target={`#imageModal${shop.retailShopId}`}
                />

                <div
                  className="modal fade"
                  id={`imageModal${shop.retailShopId}`}
                  tabIndex="-1"
                  aria-labelledby={`imageModalLabel${shop.retailShopId}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`imageModalLabel${shop.retailShopId}`}>
                          {shop.retailShopName}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          src={`${apiImage}${shop.image.split('/').pop()}`}
                          alt={shop.retailShopName}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {regions.find((region) => region.regionId === shop.regionId)?.regionName ||
                  'Unknown Region'}
              </td>
              <td>{shop.retailShopName}</td>
              <td>{shop.address}</td>
              <td>{shop.email}</td>
              <td>{shop.phone}</td>
              <td>
                <span className={shop.status ? 'text-success' : 'text-danger'}>
                  {shop.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button
                  className="btn mb-2 btn-primary btn-sm me-2"
                  onClick={() => navigate(`/admin/UpdateRetailShop/${shop.retailShopId}`)}
                >
                  Update
                </button>
                <button
                  onClick={() => toggleStatus(shop.retailShopId, shop.status)}
                  className={`btn btn-outline-${shop.status ? 'warning' : 'success'} btn-sm me-2 mb-2`}
                >
                  {shop.status ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RetailShopList
