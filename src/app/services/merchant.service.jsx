import { axiosApi } from "../../Axios.api";

export const createBillTemplateApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/create-bill-template",
      payload
    );
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

export const getAllCategoriesApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/get-category",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const addCategoryApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/add-category",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryApi = async (payload) => {
  try {
    const userResponse = await axiosApi.put(
      "/v1/merchant/update-category",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryApi = async (payload) => {
  try {
    const userResponse = await axiosApi.delete(
      "/v1/merchant/delete-category/" + payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/get-product",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const addProductApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/add-product",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductApi = async (payload) => {
  try {
    const userResponse = await axiosApi.put(
      "/v1/merchant/update-product",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (payload) => {
  try {
    const userResponse = await axiosApi.delete(
      "/v1/merchant/delete-product/" + payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTaxApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post("/v1/merchant/get-tax", payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const addTaxApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post("/v1/merchant/add-tax", payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaxApi = async (payload) => {
  try {
    const userResponse = await axiosApi.put("/v1/merchant/update-tax", payload);
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaxApi = async (payload) => {
  try {
    const userResponse = await axiosApi.delete(
      "/v1/merchant/delete-tax/" + payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserDetailsApi = async (payload) => {
  try {
    const userResponse = await axiosApi.put(
      "/v1/merchant/update-user-details",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCustomerBillsApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/get-bill-template",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllInvoiceApi = async (payload) => {
  try {
    const userResponse = await axiosApi.post(
      "/v1/merchant/customer-bills",
      payload
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardCustomerBillsApi = async () => {
  try {
    const userResponse = await axiosApi.get(
      "/v1/merchant/get-dashboard-customers-data"
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardCustomerTotalApi = async () => {
  try {
    const userResponse = await axiosApi.get(
      "/v1/merchant/get-dashboard-customers-total"
    );
    return userResponse?.data;
  } catch (error) {
    throw error;
  }
};
