import { axiosApi } from "../Axios.api";

export const createBillTemplateApi = async (url, payload) => {
  try {
    const userResponse = await axiosApi.post(url, payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const updateBillTemplateApi = async (url, payload) => {
  try {
    const userResponse = await axiosApi.post(url, payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getBillTemplateApi = async (url) => {
  try {
    const userResponse = await axiosApi.get(url);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getOneBillTemplateApi = async (url) => {
  try {
    const userResponse = await axiosApi.get(url);
    return userResponse;
  } catch (error) {
    throw error;
  }
};

export const deleteBillTemplateApi = async (url) => {
  try {
    const userResponse = await axiosApi.get(url);
    return userResponse;
  } catch (error) {
    throw error;
  }
};
