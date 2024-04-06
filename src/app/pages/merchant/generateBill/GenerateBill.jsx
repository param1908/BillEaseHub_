import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import moment from "moment";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  getAllCategoriesApi,
  getAllProductsApi,
} from "../../../services/merchant.service";
import clsx from "clsx";

const GenerateBill = () => {
  const invoiceDateRef = useRef(null);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const productObj = {
    category: null,
    product: null,
    quantity: 1,
    price: 0,
    total: 0.0,
    priceErr: false,
    categoryErr: false,
    productErr: false,
    quantityErr: false,
    disableProd: true,
  };
  const [product, setProduct] = useState([productObj]);

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
      const categoryData = await getAllCategoriesApi();
      let catData = categoryData?.data?.categoryDetails.map((el) => {
        return { value: el._id, label: el.name };
      });
      setCategoryOptions(catData);
    } catch (error) {
      console.log("err", error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleCategorySelect = async (option, index) => {
    console.log("option", option, index);
    if (option) {
      try {
        console.log("........");
        let prodData = JSON.parse(JSON.stringify(product));
        prodData[index].category = option;
        prodData[index].product = null;
        prodData[index].quantity = prodData[index].quantity
          ? prodData[index].quantity
          : 1;
        prodData[index].price = prodData[index].price
          ? prodData[index].price
          : 0;
        prodData[index].total = prodData[index].total
          ? prodData[index].total
          : 0.0;
        !prodData[index].category
          ? (prodData[index].categoryErr = true)
          : (prodData[index].categoryErr = false);
        prodData[index].disableProd = false;
        if (option?.__isNew__) {
          setProduct(prodData);
          return;
        }
        setProduct(prodData);

        const payload = { categoryId: option?.value };
        const response = await getAllProductsApi(payload);
        let produstDetail = response?.data?.productDetails.map((el) => {
          return { value: el._id, label: el.name, price: el.price };
        });
        setProductOptions(produstDetail);
      } catch (error) {
        console.log("err", error);
      }
    } else {
      setSelectedProduct(null);
    }
  };

  const handleAddItem = () => {
    let productData = JSON.parse(JSON.stringify(product));
    productData.forEach((el) => {
      if (!el.price) {
        el.priceErr = true;
      } else {
        el.priceErr = false;
      }
      if (!el.category) {
        el.categoryErr = true;
      } else {
        el.categoryErr = false;
      }
      if (!el.product) {
        el.productErr = true;
      } else {
        el.productErr = false;
      }
      if (!el.quantity) {
        el.quantityErr = true;
      } else {
        el.quantityErr = false;
      }
    });
    let objectsWithNullName = productData.find(
      (obj) =>
        obj.priceErr === true ||
        obj.categoryErr == true ||
        obj.quantityErr == true ||
        obj.productErr == true
    );
    if (objectsWithNullName) {
      setProduct(productData);
    } else {
      setProduct([...product, productObj]);
    }
    console.log("objectsWithNullName", objectsWithNullName);
  };

  const handleProductSelect = (option, index) => {
    if (option) {
      let prodData = product;
      prodData[index].product = option;
      prodData[index].price = option?.price ? Number(option?.price) : 0;
      prodData[index].total =
        (option?.price ? Number(option?.price) : 0) *
        Number(prodData[index].quantity);
      !prodData[index].product
        ? (prodData[index].productErr = true)
        : (prodData[index].productErr = false);
      !prodData[index].price
        ? (prodData[index].priceErr = true)
        : (prodData[index].priceErr = false);
      !prodData[index].quantity
        ? (prodData[index].quantityErr = true)
        : (prodData[index].quantityErr = false);
      setProduct(prodData);
      setSelectedProduct(option);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleInputChange = (e, index) => {
    let prodData = JSON.parse(JSON.stringify(product));
    prodData[index][e.target.name] = !e.target.value
      ? null
      : Number(e.target.value);
    if (e.target.name === "quantity") {
      prodData[index].total =
        Number(e.target.value) * Number(prodData[index].price);
      !prodData[index].quantity
        ? (prodData[index].quantityErr = true)
        : (prodData[index].quantityErr = false);
    } else {
      prodData[index].total =
        Number(e.target.value) * Number(prodData[index].quantity);
      !prodData[index].price
        ? (prodData[index].priceErr = true)
        : (prodData[index].priceErr = false);
    }

    console.log("prodData[index][e.target.name]", prodData[index]);
    setProduct(prodData);
  };

  const handleInvoiceDate = (e) => {
    console.log(e, "e");
    // invoiceDateRef.current.value = formatDate(dateStr);
  };

  const handleRemoveItem = (index) => {
    let prodData = JSON.parse(JSON.stringify(product));
    prodData.splice(index, 1);
    setProduct(prodData);
  };

  const submitBill = () => {
    console.log("mmm", product);
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
                        placeholder="Name*"
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="Phone*"
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="Email"
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
                      {product.map((el, index) => {
                        return (
                          <tr
                            className="border-bottom border-bottom-dashed"
                            data-kt-element="item"
                          >
                            <td className="pe-7">
                              <div className="row">
                                <div className="col-6">
                                  <CreatableSelect
                                    options={categoryOptions}
                                    placeholder={"Select Category"}
                                    onChange={(value) => {
                                      handleCategorySelect(value, index);
                                    }}
                                    className={clsx(
                                      el?.categoryErr && "border-red"
                                    )}
                                    value={el.category}
                                    maxMenuHeight={150}
                                  />
                                </div>
                                <div className="col-6">
                                  <CreatableSelect
                                    options={productOptions}
                                    placeholder={"Select Product"}
                                    isDisabled={el?.disableProd}
                                    onChange={(value) => {
                                      handleProductSelect(value, index);
                                    }}
                                    className={clsx(
                                      el?.productErr && "border-red"
                                    )}
                                    value={el.product}
                                    maxMenuHeight={150}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="ps-0">
                              <input
                                className={clsx(
                                  "form-control form-control-solid",
                                  el?.quantityErr && "border-red"
                                )}
                                type="number"
                                min="1"
                                name="quantity"
                                placeholder="0"
                                data-kt-element="quantity"
                                value={el.quantity}
                                onChange={(e) => {
                                  handleInputChange(e, index);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className={clsx(
                                  "form-control form-control-solid text-end",
                                  el?.priceErr && "border-red"
                                )}
                                name="price"
                                placeholder="0.00"
                                data-kt-element="price"
                                id="price-input"
                                value={el.price}
                                onChange={(e) => {
                                  handleInputChange(e, index);
                                }}
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                onFocus={(e) => {
                                  e.target.select();
                                }}
                              />
                            </td>
                            <td className="pt-8 text-end text-nowrap">
                              ₹<span data-kt-element="total">{el.total}</span>
                            </td>
                            <td className="pt-5 text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-icon btn-active-color-primary"
                                data-kt-element="remove-item"
                                onClick={() => handleRemoveItem(index)}
                                disabled={product?.length === 1}
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
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-top border-top-dashed align-top fs-6 fw-bold text-gray-700">
                        <th className="text-primary">
                          <button
                            className="btn btn-sm btn-light-primary fs-6 py-2"
                            data-kt-element="add-item"
                            onClick={handleAddItem}
                          >
                            + Add Item
                          </button>
                        </th>
                        <th
                          colSpan="2"
                          className="border-bottom border-bottom-dashed ps-0"
                        >
                          <div className="d-flex flex-column align-items-start">
                            <div className="fs-5 py-1">Subtotal</div>
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
                          ₹
                          <span data-kt-element="sub-total">
                            {(() => {
                              let total = 0;
                              product.forEach((el) => {
                                total += parseFloat(el.total);
                              });
                              return total;
                            })()}
                          </span>
                        </th>
                      </tr>
                      <tr className="align-top fw-bold text-gray-700">
                        <th></th>
                        <th colSpan="2" className="fs-4 ps-0">
                          Total
                        </th>
                        <th colSpan="2" className="text-end fs-4 text-nowrap">
                          ₹<span data-kt-element="grand-total">0.00</span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                  <button
                    className="btn btn-sm btn-light-primary fs-6 py-2"
                    data-kt-element="add-item"
                    onClick={submitBill}
                  >
                    Submit
                  </button>
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
