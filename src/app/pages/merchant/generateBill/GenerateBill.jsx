import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import moment from "moment";
import Select from "react-select";
import {
  getAllCategoriesApi,
  getAllProductsApi,
} from "../../../services/merchant.service";

const GenerateBill = () => {
  const invoiceDateRef = useRef(null);
  const [categoryData, setCategoryData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductShow, setIsProductShow] = useState(true);

  useEffect(() => {
    // Initialize Flatpickr
    const invoiceDatePicker = flatpickr(invoiceDateRef.current, {
      dateFormat: "Y-m-d", // You can customize the date format
      // Add any other options you need
    });

    // Cleanup function
    getCategoryData();
    return () => {
      invoiceDatePicker.destroy();
    };
  }, []);

  const getCategoryData = async () => {
    try {
      const response = await getAllCategoriesApi();
      setCategoryData(response?.data?.categoryDetails);
    } catch (error) {
      console.log("err", error);
    }
  };

  const categoryOptions = categoryData.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const formatDate = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleCategorySelect = async (option) => {
    if (option) {
      try {
        const payload = { categoryId: option?.value };
        const response = await getAllProductsApi(payload);
        setProductsData(response?.data?.productDetails)
        setIsProductShow(false)
      } catch (error) {
        console.log("err", error);
      }
    } else {
      setSelectedProduct(null);
      setIsProductShow(true);
    }
  };

  const productOptions = productsData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handleProductSelect = (option) => {
    if (option) {
      setSelectedProduct(option)
    } else {
      setSelectedProduct(null)
    }
  }

  const handleInvoiceDate = (e) => {
    console.log(e, "e");
    // invoiceDateRef.current.value = formatDate(dateStr);
  };

  return (
    <>
      <div className="row w-100">
        <div className="col-9 h-auto">
          <div className="card">
            <div className="card-body p-12">
              <div className="d-flex flex-column align-items-start flex-xxl-row">
                <div
                  className="d-flex align-items-center flex-equal fw-row me-4 order-2"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-kt-initialized="1"
                >
                  {/* Logo here */}
                </div>
                <div
                  className="d-flex flex-center flex-equal fw-row text-nowrap order-1 order-xxl-2 me-4"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-kt-initialized="1"
                >
                  <span className="fs-2x fw-bold text-gray-800">Invoice #</span>
                  <input
                    type="text"
                    className="form-control form-control-flush fw-bold text-muted fs-3 w-125px"
                    value="00000001"
                    placeholder="..."
                  />
                </div>
                <div
                  className="d-flex align-items-center justify-content-end flex-equal order-3 fw-row"
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-kt-initialized="1"
                >
                  <div className="fs-6 fw-bold text-gray-700 text-nowrap">
                    Invoice Date:
                  </div>
                  <div className="position-relative d-flex align-items-center w-150px">
                    <input
                      ref={invoiceDateRef}
                      className="form-control form-control-transparent fw-bold pe-5 flatpickr-input"
                      placeholder="Select date"
                      name="invoice_due_date"
                      type="text"
                      readOnly // Use readOnly instead of readonly
                      value={formatDate(new Date())}
                      onChangeCapture={(e) => {
                        handleInvoiceDate(e);
                      }}
                    />
                    <span className="svg-icon svg-icon-2 position-absolute end-0 ms-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="separator separator-dashed my-10"></div>
              <div className="mb-0">
                <div className="row gx-10 mb-5">
                  <div className="col-lg-6">
                    <label className="form-label fs-6 fw-bold text-gray-700 mb-3">
                      Bill From
                    </label>
                    <div className="mb-5">
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="mb-5">
                      <textarea
                        name="notes"
                        className="form-control form-control-solid"
                        rows="3"
                        placeholder="Who is this invoice from?"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mb-10">
                  <table
                    className="table g-5 gs-0 mb-0 fw-bold text-gray-700"
                    data-kt-element="items"
                  >
                    <thead>
                      <tr className="border-bottom fs-7 fw-bold text-gray-700 text-uppercase">
                        <th className="min-w-300px w-475px">Item</th>
                        <th className="min-w-100px w-100px">QTY</th>
                        <th className="min-w-150px w-150px">Price</th>
                        <th className="min-w-100px w-150px text-end">Total</th>
                        <th className="min-w-75px w-75px text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="border-bottom border-bottom-dashed"
                        data-kt-element="item"
                      >
                        <td className="pe-7">
                          <div className="row">
                            <div className="col-6">
                              <Select
                                options={categoryOptions}
                                isClearable={true}
                                placeholder={"Select Category"}
                                onChange={(value) => {
                                  handleCategorySelect(value);
                                }}
                                maxMenuHeight={150}
                              />
                            </div>
                            <div className="col-6">
                              <Select
                                options={productOptions}
                                isClearable={true}
                                placeholder={"Select Product"}
                                value={selectedProduct}
                                isDisabled={isProductShow}
                                onChange={(value) => {
                                  handleProductSelect(value);
                                }}
                                maxMenuHeight={150}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="ps-0">
                          <input
                            className="form-control form-control-solid"
                            type="number"
                            min="1"
                            name="quantity[]"
                            placeholder="1"
                            value="1"
                            data-kt-element="quantity"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-solid text-end"
                            name="price[]"
                            placeholder="0.00"
                            value="0.00"
                            data-kt-element="price"
                          />
                        </td>
                        <td className="pt-8 text-end text-nowrap">
                          $<span data-kt-element="total">0.00</span>
                        </td>
                        <td className="pt-5 text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-icon btn-active-color-primary"
                            data-kt-element="remove-item"
                          >
                            <span className="svg-icon svg-icon-3 text-danger">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                                  fill="currentColor"
                                />
                                <path
                                  opacity="0.5"
                                  d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                                  fill="currentColor"
                                />
                                <path
                                  opacity="0.5"
                                  d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700">
                        <th className="text-primary">
                          <button
                            className="btn btn-link py-1"
                            data-kt-element="add-item"
                          >
                            Add item
                          </button>
                        </th>
                        <th
                          colSpan="2"
                          className="border-bottom border-bottom-dashed ps-0"
                        >
                          <div className="d-flex flex-column align-items-start">
                            <div className="fs-5">Subtotal</div>
                            <button
                              className="btn btn-link py-1"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              title="Coming soon"
                            >
                              Add tax
                            </button>
                            <button
                              className="btn btn-link py-1"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              title="Coming soon"
                            >
                              Add discount
                            </button>
                          </div>
                        </th>
                        <th
                          colSpan="2"
                          className="border-bottom border-bottom-dashed text-end"
                        >
                          $<span data-kt-element="sub-total">0.00</span>
                        </th>
                      </tr>
                      <tr className="align-top fw-bold text-gray-700">
                        <th></th>
                        <th colSpan="2" className="fs-4 ps-0">
                          Total
                        </th>
                        <th colSpan="2" className="text-end fs-4 text-nowrap">
                          $<span data-kt-element="grand-total">0.00</span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          {/* Here in card add position sticky */}
          <div className="card">
            <div className="card-body p-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateBill;
