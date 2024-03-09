import { axiosApi } from "../../Axios.api";

export const registerApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post("/v1/auth/register", payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const userResponse = await axiosApi.post("/v1/auth/login", payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};
