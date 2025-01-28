/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiRegion } from '../constant/apiConstant';

// Get all Vendors
export const getAllRegions = async () => {
    try {
        let response = await axios.get(apiRegion);
        return response.data;
    } catch (error) {
        console.error("Error fetching Vendors", error);
        throw error;
    }
};