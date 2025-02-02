/* eslint-disable prettier/prettier */
import axios from 'axios';
import { apiPlanFee } from '../constant/apiConstant';

// Lấy tất cả kế hoạch phí
export const getAllPlanFees = async () => {
  try {
    const response = await axios.get(apiPlanFee);
    return response.data.data; // Trả về danh sách kế hoạch phí từ ApiResponse
  } catch (error) {
    console.error("Error fetching plan fees", error);
    throw error;
  }
};

// Lấy thông tin PlanFee theo ID
export const getPlanFeeById = async (id) => {
  try {
    const response = await axios.get(`${apiPlanFee}${id}`);
    return response.data.data; // Trả về thông tin kế hoạch phí từ ApiResponse
  } catch (error) {
    console.error(`Error fetching plan fee with ID ${id}`, error);
    throw error;
  }
};

// Tạo mới một kế hoạch phí
export const createPlanFee = async (planFeeData) => {
  try {
    const response = await axios.post(apiPlanFee, planFeeData);
    return response.data.data; // Trả về kế hoạch phí đã tạo
  } catch (error) {
    console.error("Error creating plan fee", error);
    throw error;
  }
};

// Cập nhật thông tin kế hoạch phí theo ID
export const updatePlanFee = async (id, planFeeData) => {
  try {
    const response = await axios.put(`${apiPlanFee}${id}`, planFeeData);
    return response.data.data; // Trả về kế hoạch phí đã cập nhật
  } catch (error) {
    console.error(`Error updating plan fee with ID ${id}`, error);
    throw error;
  }
};

// Cập nhật trạng thái kế hoạch phí theo ID
export const changePlanFeeStatus = async (planId, isUsing) => {
  try {
    // Gửi trạng thái isUsing trực tiếp và sử dụng Content-Type là application/json
    let response = await axios.patch(`${apiPlanFee}${planId}/isusing`, isUsing, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data; // Trả về thông tin kế hoạch phí sau khi thay đổi trạng thái
  } catch (error) {
    console.error(`Error updating status for plan fee ID ${planId}`, error);
    throw error;
  }
};