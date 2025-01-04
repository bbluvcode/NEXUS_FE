/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('VendorName');
  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      {
        VendorID: 1,
        RegionID: 101,
        VendorName: 'Vendor A',
        Address: '123 Vendor St, City A',
        Email: 'vendora@example.com',
        Phone: '123-456-7890',
        Fax: '123-456-7891',
        Description: 'Main vendor for supplies',
      },
      {
        VendorID: 2,
        RegionID: 102,
        VendorName: 'Vendor B',
        Address: '456 Supplier Rd, City B',
        Email: 'vendorb@example.com',
        Phone: '987-654-3210',
        Fax: '987-654-3211',
        Description: 'Secondary vendor for products',
      },
    ];
    setVendors(data);
  }, []);

  const filteredVendors = vendors.filter((vendor) =>
    vendor[searchField]?.toString().toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Vendor List</h2>

      {/* Nút Add */}
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/AddVendor')}
        >
          Add Vendor
        </button>

        {/* Bộ lọc tìm kiếm */}
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

      {/* Bảng hiển thị */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Region ID</th>
            <th>Vendor Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor, index) => (
            <tr key={vendor.VendorID}>
              <td>{index + 1}</td>
              <td>{vendor.RegionID}</td>
              <td>{vendor.VendorName}</td>
              <td>{vendor.Address}</td>
              <td>{vendor.Email}</td>
              <td>{vendor.Phone}</td>
              <td>{vendor.Fax}</td>
              <td>{vendor.Description}</td>
              <td>
                <button className="btn btn-primary btn-sm">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorList;
