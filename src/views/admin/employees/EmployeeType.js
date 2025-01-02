/* eslint-disable prettier/prettier */
import React, { useState } from 'react'; 

const EmployeeType = () => {
  // Dữ liệu tạm thời
  const [employeeTypes, setEmployeeTypes] = useState([
    { RoleID: 1, RoleName: 'Manager', isActive: true },
    { RoleID: 2, RoleName: 'Engineer', isActive: false },
    { RoleID: 3, RoleName: 'HR', isActive: true },
    { RoleID: 4, RoleName: 'Intern', isActive: false },
  ]);

  // Xử lý kích hoạt/deactivate
  const toggleActive = (roleID) => {
    setEmployeeTypes((prev) =>
      prev.map((type) =>
        type.RoleID === roleID ? { ...type, isActive: !type.isActive } : type
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Employee Types</h1>
        <button className="btn btn-primary">Create</button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeTypes.map((type) => (
            <tr key={type.RoleID}>
              <td>{type.RoleID}</td>
              <td>{type.RoleName}</td>
              <td>{type.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button
                  className={`btn ${
                    type.isActive ? 'btn-danger' : 'btn-success'
                  }`}
                  onClick={() => toggleActive(type.RoleID)}
                >
                  {type.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeType;
