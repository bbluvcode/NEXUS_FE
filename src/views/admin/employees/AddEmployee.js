/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import { addEmployee, getAllEmployeeRoles } from '../../../services/employeeService';
import { getAllRetailShops } from '../../../services/retailShopSerivce';

const AddEmployee = () => {
  const [retailShopData, setRetailShopData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [retailShopsResponse, rolesResponse] = await Promise.all([
          getAllRetailShops(),
          getAllEmployeeRoles(),
        ]);

        // Filter out roles with id === 1 (e.g., Admin role)
        const filteredRoles = (rolesResponse.data || []).filter((role) => role.roleId !== 1);

        setRetailShopData(retailShopsResponse.data || []);
        setRoles(filteredRoles);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch retail shops or roles data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddEmployee = async (data) => {
    try {
      const addedEmployee = await addEmployee(data);
      console.log('Added Employee:', addedEmployee);
      alert('Employee added successfully!');
      navigate('/admin/EmployeeList');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px', margin: 'auto' }}>
      <h1 className="my-4 text-center">Add Employee</h1>
      <EmployeeForm
        onSubmit={handleAddEmployee}
        retailShops={retailShopData}
        roles={roles}
      />
    </div>
  );
};

export default AddEmployee;
