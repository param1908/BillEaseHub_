import { axiosApi } from "../../Axios.api";

export const allowNumber = (event, type) => {
  if (type === "Phone" && !/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export const getUserDetailsByToken = async () => {
  try {
    const userResponse = await axiosApi.get("/v1/auth/user-details-by-token");
    return userResponse.data;
  } catch (error) {
    throw error;
  }
};
