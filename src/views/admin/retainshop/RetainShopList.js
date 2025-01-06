/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RetainShopList = () => {
  const [shops, setShops] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('RSName');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching region data from a backend API
    const fetchRegions = async () => {
      const regionData = [
        { RegionID: 101, RegionName: 'North Region' },
        { RegionID: 102, RegionName: 'South Region' },
        { RegionID: 103, RegionName: 'East Region' },
        { RegionID: 104, RegionName: 'West Region' },
      ];
      setRegions(regionData);
    };

    // Simulate fetching shop data from a backend API
    const fetchShops = async () => {
      const data = [
        {
          RSID: 1,
          RegionID: 101,
          RSName: 'Main Office',
          Address: '123 Main St, City A',
          Email: 'mainoffice@example.com',
          Phone: '123-456-7890',
          isMainOffice: true,
          Fax: '123-456-7891',
        },
        {
          RSID: 2,
          RegionID: 102,
          RSName: 'Branch Office',
          Address: '456 Elm St, City B',
          Email: 'branchoffice@example.com',
          Phone: '987-654-3210',
          isMainOffice: false,
          Fax: '987-654-3211',
        },
      ];
      setShops(data);
    };

    fetchRegions();
    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop[searchField]?.toString().toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Retain Shop List</h2>

      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/AddRetainShop')}
        >
          Add Shop
        </button>

        <div className="d-flex">
          <select
            className="form-select me-2"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="RSName">Search by Name</option>
            <option value="Address">Search by Address</option>
            <option value="Email">Search by Email</option>
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
            <tr key={shop.RSID}>
              <td>{index + 1}</td>
              <td>
                {regions.find((region) => region.RegionID === shop.RegionID)
                  ?.RegionName || 'Unknown Region'}
              </td>
              <td>{shop.RSName}</td>
              <td>{shop.Address}</td>
              <td>{shop.Email}</td>
              <td>{shop.Phone}</td>
              <td>{shop.isMainOffice ? 'Yes' : 'No'}</td>
              <td>{shop.Fax}</td>
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

export default RetainShopList;
