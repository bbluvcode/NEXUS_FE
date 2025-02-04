import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllVendors, updateVendorStatus } from '../../../services/vendorService'
import { getAllRegions } from '../../../services/regionService' // Thêm hàm lấy dữ liệu khu vực\
import styles from '../../../style/ManStyle.module.css'

const VendorList = () => {
  const [vendors, setVendors] = useState([])
  const [regions, setRegions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchField, setSearchField] = useState('vendorName')
  const navigate = useNavigate()

  useEffect(() => {
    fetchVendors()
    fetchRegions()
  }, [])

  const fetchVendors = async () => {
    try {
      const data = await getAllVendors()
      setVendors(data.data)
      console.log(data.data)
    } catch (error) {
      console.error('Failed to fetch vendors', error)
    }
  }

  const fetchRegions = async () => {
    try {
      const data = await getAllRegions()
      setRegions(data.data)
      console.log(data.data)
    } catch (error) {
      console.error('Failed to fetch regions', error)
    }
  }
  const toggleStatus = async (vendorId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus // Đảo ngược trạng thái hiện tại
      await updateVendorStatus(vendorId, updatedStatus) // Gọi API cập nhật trạng thái
      // Cập nhật trạng thái trong state sau khi thành công
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor.vendorId === vendorId ? { ...vendor, status: updatedStatus } : vendor,
        ),
      )
    } catch (error) {
      console.error('Error toggling vendor status:', error)
    }
  }

  const filteredVendors = vendors.filter((vendor) =>
    vendor[searchField]?.toString().toLowerCase().includes(searchTerm),
  )

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Vendor List</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => navigate('/admin/AddVendor')}>
          Add Vendor
        </button>

        <div className="d-flex">
          <select
            className="form-select me-2"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="VendorName">Search by Name</option>
            <option value="Address">Search by Address</option>
            <option value="Email">Search by Email</option>
            <option value="Phone">Search by Phone</option>
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
            <th>Region</th>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor, index) => (
            <tr key={vendor.vendorId}>
              <td>{index + 1}</td>
              <td>
                {regions.find((region) => region.regionId === vendor.regionId)?.regionName ||
                  'Unknown Region'}
              </td>
              <td>{vendor.vendorName}</td>
              <td>{vendor.address}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.fax || 'N/A'}</td>
              <td>{vendor.description}</td>
              <td>
                <span className={vendor.status ? styles.activeStatus : styles.inactiveStatus}>
                  {vendor.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button
                  className="btn mb-2 btn-primary btn-sm me-2"
                  onClick={() => navigate(`/admin/UpdateVendor/${vendor.vendorId}`)}
                >
                  Update
                </button>
                <button
                  onClick={() => toggleStatus(vendor.vendorId, vendor.status)}
                  className={`btn btn-outline-${vendor.status ? 'warning' : 'success'} btn-sm me-2 mb-2`}
                >
                  {vendor.status ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VendorList
