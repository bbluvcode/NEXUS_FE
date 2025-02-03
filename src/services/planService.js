/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiPlan } from '../constant/apiConstant';

// Get all Plans
export const getAllPlans = async () => {
    try {
        let response = await axios.get(apiPlan);
        return response.data.data; // Trả về danh sách plans từ ApiResponse
    } catch (error) {
        console.error("Error fetching Plans", error);
        throw error;
    }
};


// Get Plan by ID
export const getPlanById = async (id) => {
    try {
        let response = await axios.get(`${apiPlan}${id}`);
        return response.data.data; // Trả về plan từ ApiResponse
    } catch (error) {
        console.error(`Error fetching Plan with ID ${id}`, error);
        throw error;
    }
};

// Add new Plan
export const addPlan = async (plan) => {
    try {
        let response = await axios.post(apiPlan, plan);
        return response.data.data; // Trả về plan đã tạo
    } catch (error) {
        console.error("Error adding Plan", error);
        throw error;
    }
};

// Update existing Plan
export const updatePlan = async (id, plan) => {
    try {
        let response = await axios.put(`${apiPlan}${id}`, plan);
        return response.data.data; // Trả về plan đã cập nhật
    } catch (error) {
        console.error(`Error updating Plan with ID ${id}`, error);
        throw error;
    }
};

export const changePlanStatus = async (planId, isUsing) => {
    try {
        // Gửi true hoặc false trực tiếp, không cần bao quanh trong một đối tượng
        let response = await axios.patch(`${apiPlan}${planId}/isusing`, isUsing, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.data; // Trả về thông tin kế hoạch sau khi thay đổi trạng thái
    } catch (error) {
        console.error(`Lỗi khi cập nhật trạng thái cho Plan ID ${planId}`, error); // Ghi lại lỗi với planId đúng
        throw error;
    }
};
