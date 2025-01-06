/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiPlan } from '../constant/apiConstant';

// Get all Plans
export const getAllPlans = async () => {
    try {
        let response = await axios.get(apiPlan);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Plans", error);
        throw error;
    }
};

// Get Plan by ID
export const getPlanById = async (id) => {
    try {
        let response = await axios.get(`${apiPlan}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Plan with ID ${id}`, error);
        throw error;
    }
};

// Add new Plan
export const addPlan = async (plan) => {
    try {
        let response = await axios.post(apiPlan, plan);
        return response.data;
    } catch (error) {
        console.error("Error adding Plan", error);
        throw error;
    }
};

// Update existing Plan
export const updatePlan = async (id, plan) => {
    try {
        let response = await axios.put(`${apiPlan}${id}`, plan);
        return response.data;
    } catch (error) {
        console.error(`Error updating Plan with ID ${id}`, error);
        throw error;
    }
};

// Delete Plan by ID (optional, if needed)
export const deletePlan = async (id) => {
    try {
        let response = await axios.delete(`${apiPlan}${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting Plan with ID ${id}`, error);
        throw error;
    }
};
