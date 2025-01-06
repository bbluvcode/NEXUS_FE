/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiPlanFee } from '../constant/apiConstant';

// Lấy tất cả các kế hoạch phí
export const getPlanFees = async () => {
  try {
    const response = await axios.get(`${apiPlanFee}list`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching plan fees", error);
    throw error;
  }
};

// Lấy chi tiết một kế hoạch phí theo ID
export const getPlanFeeById = async (id) => {
  try {
    const response = await axios.get(`${apiPlanFee}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plan fee with ID ${id}`, error);
    throw error;
  }
};

// Tạo mới một kế hoạch phí
export const createPlanFee = async (planFeeData) => {
  try {
    const response = await axios.post(apiPlanFee, planFeeData);
    return response.data;
  } catch (error) {
    console.error("Error creating plan fee", error);
    throw error;
  }
};

// Cập nhật kế hoạch phí theo ID
export const updatePlanFee = async (id, planFeeData) => {
  try {
    const response = await axios.put(`${apiPlanFee}/${id}`, planFeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating plan fee with ID ${id}`, error);
    throw error;
  }
};

// Xóa kế hoạch phí theo ID
export const deletePlanFee = async (id) => {
  try {
    const response = await axios.delete(`${apiPlanFee}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting plan fee with ID ${id}`, error);
    throw error;
  }
};
