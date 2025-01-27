/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiVendor } from '../constant/apiConstant';

// Get all Vendors
export const getAllVendors = async () => {
    try {
        let response = await axios.get(apiVendor);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Vendors", error);
        throw error;
    }
};

// Get Vendor by ID
export const getVendorById = async (id) => {
    try {
        let response = await axios.get(`${apiVendor}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Vendor with ID ${id}`, error);
        throw error;
    }
};

// Add new Vendor
export const addVendor = async (vendor) => {
    try {
        let response = await axios.post(apiVendor, vendor);
        return response.data;
    } catch (error) {
        console.error("Error adding Vendor", error);
        throw error;
    }
};

// Update existing Vendor
export const updateVendor = async (id, vendor) => {
    try {
        let response = await axios.put(`${apiVendor}${id}`, vendor);
        return response.data;
    } catch (error) {
        console.error(`Error updating Vendor with ID ${id}`, error);
        throw error;
    }
};
export const updateVendorStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${apiVendor}${id}/status`, status, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data; // Trả về toàn bộ response body
    } catch (error) {
        console.error(`Error updating Vendor status with ID ${id}`, error);
        throw error; // Ném lại lỗi để xử lý sau
    }
};
