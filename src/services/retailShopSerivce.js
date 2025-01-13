/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiRetailShop } from '../constant/apiConstant';

// Get all RetailShops
export const getAllRetailShops = async () => {
    try {
        let response = await axios.get(apiRetailShop);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching RetailShops", error);
        throw error;
    }
};

// Get RetailShop by ID
export const getRetailShopById = async (id) => {
    try {
        let response = await axios.get(`${apiRetailShop}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching RetailShop with ID ${id}`, error);
        throw error;
    }
};

// Add new RetailShop
export const addRetailShop = async (retailShop) => {
    try {
        let response = await axios.post(apiRetailShop, retailShop);
        return response.data;
    } catch (error) {
        console.error("Error adding RetailShop", error);
        throw error;
    }
};

// Update existing RetailShop
export const updateRetailShop = async (id, retailShop) => {
    try {
        let response = await axios.put(`${apiRetailShop}${id}`, retailShop);
        return response.data;
    } catch (error) {
        console.error(`Error updating RetailShop with ID ${id}`, error);
        throw error;
    }
};
