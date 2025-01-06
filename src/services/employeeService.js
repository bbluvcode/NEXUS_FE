/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiEmployee } from '../constant/apiConstant';

// Get all employees
export const getAllEmployees = async () => {
    try {
        let response = await axios.get(apiEmployee);
        console.log(response.data);
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
        console.log(response.data);
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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding employee", error);
        throw error;
    }
};

// Update employee role
export const updateEmployeeRole = async (employeeId, roleId) => {
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
