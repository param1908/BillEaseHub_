import axios from "axios";
import { config } from "./config";
import { toast } from "react-toastify";

const axiosApi = axios.create({
  baseURL: config.API_URL,
});

const setAuthHeader = (token) => {
  axiosApi.defaults.headers.Authorization =
    token || `Bearer ${localStorage.getItem("_token")}`;
  axiosApi.defaults.headers.requestToken = config?.REQUEST_TOKEN;
};

axiosApi.defaults.headers = {
  Authorization: localStorage.getItem("_token")
    ? `Bearer ${localStorage.getItem("_token")}`
    : "",
  requestToken: config?.REQUEST_TOKEN,
};

// setting up interceptors
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(
      error?.response?.data?.message?.validationMessage
        ? error?.response?.data?.message?.validationMessage
        : error?.response?.data?.message || "Server Error"
    );
    if (error?.response?.status === 404) {
      console.log(" ERROR => 404 => API not available");
    } else if (error?.response?.status === 500) {
      console.log(" ERROR => 500 => Server Error");
    } else if (error?.response?.status === 401) {
      console.log(" ERROR => 401 => User is not authorized");
      if (localStorage.getItem("_token")) {
        localStorage.removeItem("_token");
        window.location("/");
      }
    } else {
      console.log("/other-errors.");
    }

    return Promise.reject(error);
  }
);

export { axiosApi, setAuthHeader };
