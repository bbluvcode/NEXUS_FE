/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiRetainShop } from '../constant/apiConstant';

// Get all RetainShops
export const getAllRetainShops = async () => {
    try {
        let response = await axios.get(apiRetainShop);
        return response.data;
    } catch (error) {
        console.error("Error fetching RetainShops", error);
        throw error;
    }
};

// Get RetainShop by ID
export const getRetainShopById = async (id) => {
    try {
        let response = await axios.get(`${apiRetainShop}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching RetainShop with ID ${id}`, error);
        throw error;
    }
};

// Add new RetainShop
export const addRetainShop = async (retainShop) => {
    try {
        let response = await axios.post(apiRetainShop, retainShop);
        return response.data;
    } catch (error) {
        console.error("Error adding RetainShop", error);
        throw error;
    }
};

// Update existing RetainShop
export const updateRetainShop = async (id, retainShop) => {
    try {
        let response = await axios.put(`${apiRetainShop}${id}`, retainShop);
        return response.data;
    } catch (error) {
        console.error(`Error updating RetainShop with ID ${id}`, error);
        throw error;
    }
};
