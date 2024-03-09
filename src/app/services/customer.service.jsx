import { axiosApi } from "../Axios.api";

export const userDetailsApi = async (url) => {
  try {
    const userResponse = await axiosApi.get(url);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};
