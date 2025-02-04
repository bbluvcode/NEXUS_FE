/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiEmployee } from '../constant/apiConstant';

// Get all employees
export const getAllEmployees = async () => {
    try {
        let response = await axios.get(apiEmployee);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees", error);
        throw error;
    }
};
// Get all employees
export const getAllEmployeeRoles = async () => {
    try {
        let response = await axios.get(apiEmployee + 'role');
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching employees", error);
        throw error;
    }
};

// Get employee by ID
export const getEmployeeById = async (id) => {
    try {
        let response = await axios.get(`${apiEmployee}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee with ID ${id}`, error);
        throw error;
    }
};

// Add a new employee
export const addEmployee = async (employee) => {
    try {
        let response = await axios.post(apiEmployee, employee);
        return response.data;
    } catch (error) {
        console.error("Error adding employee", error);
        throw error;
    }
};

// Update employee role
export const updateRole = async (employeeId, roleId) => {
    try {
        const response = await axios.put(`${apiEmployee}${employeeId}/role`, {
            employeeId,
            employeeRoleId: roleId, // Gửi roleId mới
        });
        return response.data; // Dữ liệu trả về từ BE
    } catch (error) {
        console.error("Failed to update employee role:", error);
        throw error;
    }
};

// Toggle employee status
export const toggleEmployeeStatus = async (id) => {
    try {
        let response = await axios.put(`${apiEmployee}${id}/status`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEmployeeRole = async (employeeId, roleId, roleName) => {
    try {
        let response = await axios.put(`${apiEmployee}${employeeId}/EmployeeRole`, {
            roleId: roleId,
            roleName: roleName
        });

        return response.data; // Return the response data from the backend
    } catch (error) {
        console.error("Failed to update employee role:", error);
        throw error;
    }
};

// Add a new employee role
export const addEmployeeRole = async (employeeRole) => {
    try {
        // Send POST request to add a new employee role
        let response = await axios.post('http://localhost:5185/api/Employee/addRole', employeeRole);
        console.log(response.data); // Log the response for debugging
        return response.data; // Return the response from the backend
    } catch (error) {
        console.error("Error adding employee role", error);
        throw error; // Throw error to propagate it further if needed
    }
};
