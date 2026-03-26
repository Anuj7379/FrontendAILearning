import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const getDashboardProgress = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.PROGRESS.GET_DASHBOARD_PROGRESS);
    return response.data;
    } catch (error) {
    throw error.response?.data?.error || "Failed to fetch dashboard progress";
    }
};

const progressService = {
    getDashboardProgress,
};

export default progressService;