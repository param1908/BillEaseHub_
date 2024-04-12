import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import moment from "moment";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  getAllCategoriesApi,
  getAllProductsApi,
  getAllTaxApi,
} from "../../../services/merchant.service";
import clsx from "clsx";
import { omit } from "lodash";
import { toast } from "react-toastify";

const GenerateBill = () => {
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
    disableQty: true,
    disablePrice: true,
  };
  const taxObj = {
    name: null,
    taxError: false,
    enableTaxCount: false,
    taxCountError: false,
  };
  const billObj = {
    name: "",
    phone: null,
    email: "",
    notes: "",
    invoiceDate: "",
    paymentMethod: null,
    enableTax: false,
    enableDiscount: false,
    // enableTaxCount: false,
    // addTax: null,
    addDiscount: null,
    // taxError: false,
    discError: false,
    taxFields: [{ ...taxObj }],
  };
  const invoiceDateRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [taxOptions, setTaxOptions] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  const [product, setProduct] = useState([productObj]);
  const [billDetails, setBillDetails] = useState(billObj);
  const [billCount, setBillCount] = useState("0000");

  useEffect(() => {
    // Initialize Flatpickr
    const invoiceDatePicker = flatpickr(invoiceDateRef.current, {
      dateFormat: "Y-m-d", // You can customize the date format
      // Add any other options you need
    });

    // Cleanup function
    getCategoryData();
    getAllTax();
    return () => {
      invoiceDatePicker.destroy();
    };
  }, []);

  const handleBillInput = (e) => {
    console.log("billdetails", billDetails);

    if (e.target.type === "checkbox") {
      if (billDetails?.addTax?.__isNew__) {
        billDetails.enableTaxCount = true;
      } else {
        billDetails.enableTaxCount = false;
      }
      e.target.name === "enableTax"
        ? (billDetails.taxError = false)
        : (billDetails.discError = false);
      setBillDetails({
        ...billDetails,
        [e.target.name]: e.target.checked,
        taxFields: [{ ...taxObj }],
        addDiscount: null,
      });
      return;
    }
  };

  const handleTaxChange = (option, index) => {
    if (option) {
      let fields = [...billDetails.taxFields];
      fields[index] = { name: { ...option }, taxError: false };

      if (option?.__isNew__) {
        fields[index].name = {
          ...option,
          __isNew__: true,
          tax: 0,
        };
        fields[index].taxCountError = true;
        fields[index].enableTaxCount = true;
      } else {
        fields[index].name = { ...option, __isNew__: false };
      }

      setBillDetails({
        ...billDetails,
        taxFields: fields,
      });
    }
    console.log("option", option);
  };

  const getAllTax = async () => {
    try {
      let payload = {
        sortBy: "name",
        sortOrder: "asc",
      };

      const taxData = await getAllTaxApi(payload);
      let tax = taxData?.data?.taxDetails.map((el) => {
        return { value: el._id, label: el.name, tax: el.tax };
      });
      setTaxOptions(tax);
    } catch (error) {
      console.log("err", error);
    }
  };

  function formatNumberWithLeadingZeros(number) {
    let numberString = number.toString();
    while (numberString.length < 4) {
      numberString = "0" + numberString;
    }
    return numberString;
  }

  const getCategoryData = async () => {
    try {
      const categoryData = await getAllCategoriesApi();
      let catData = categoryData?.data?.categoryDetails.map((el) => {
        return { value: el._id, label: el.name };
      });
      setCategoryOptions(catData);
      setBillCount(
        formatNumberWithLeadingZeros(categoryData?.data?.totalBills)
      );
    } catch (error) {
      console.log("err", error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return formattedDate;
  };

  const handleCategorySelect = async (option, index) => {
    if (option) {
      try {
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

        const payload = {
          categoryId: option?.value,
          page: 1,
          limit: 500000,
          status: "Active",
        };
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

  const paymentMethodOptions = [
    { value: "cash", label: "Cash" },
    { value: "online", label: "Online" },
  ];

  const handleAddItem = async () => {
    let productData = JSON.parse(JSON.stringify(product));
    await handleProductError(productData);
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

  const handleTaxCountChange = (e, index) => {
    let fields = [...billDetails.taxFields];
    fields[index].name.tax = e.target.value;
    !e.target.value || e.target.value == 0
      ? (fields[index].taxCountError = true)
      : (fields[index].taxCountError = false);
    setBillDetails({
      ...billDetails,
      taxFields: fields,
    });
  };

  const handleProductError = (productData) => {
    productData.forEach((el) => {
      if (!el.disablePrice && !el.price) {
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
      prodData[index].disablePrice = false;
      prodData[index].disableQty = false;
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

  const sendInvoice = async () => {
    console.log("mmm", product, billDetails);
    const productPayload = product;
    let billPayload = billDetails;
    const errors = validateBill({ ...billPayload });
    let productData = JSON.parse(JSON.stringify(product));
    await handleProductError(productData);
    let objectsWithNullName = productData.find(
      (obj) =>
        obj.priceErr === true ||
        obj.categoryErr == true ||
        obj.quantityErr == true ||
        obj.productErr == true
    );
    let filterTax = billDetails.taxFields.filter((el) => {
      return !el?.name || (el?.taxCountError && el?.taxCountError === true);
    });
    let taxError = billDetails.enableTax && filterTax?.length ? true : false;
    let discError =
      billDetails.enableDiscount && !billDetails?.addDiscount ? true : false;
    if (
      Object.keys(errors).length === 0 &&
      !objectsWithNullName &&
      !taxError &&
      !discError
    ) {
      let prepareObject = {
        ...billPayload,
        products: productPayload,
      };
      console.log("success", prepareObject);
    } else {
      let err = { ...billDetails };
      billDetails.taxFields.forEach((data) => {
        if (!data.name) {
          data.taxError = true;
        }
        if (data.name && !data.name.tax) {
          data.taxCountError = true;
        }
        if (data.name && data.name.__isNew__) {
          data.enableTaxCount = true;
        }
      });
      err = {
        ...err,
        taxError: taxError,
        discError: discError,
        taxFields: billDetails.taxFields,
      };
      console.log("-------------", err);
      setBillDetails(err);
      toast.error("Please fill all required fields");
      setProduct(productData);
      setErrorMessages(errors);
    }
  };

  const validateBill = (payload) => {
    let errors = {};
    const { name, phone, email, paymentMethod } = payload;
    if (
      email &&
      !RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/).test(email)
    ) {
      errors.emailError = "Please enter a valid email";
    }
    if (!name) {
      errors.nameError = "Customer name is required";
    }
    console.log("phone", phone);
    if (!phone) {
      errors.phoneError = "Phone number is required";
    } else if (phone.length < 10) {
      errors.phoneError = "Phone number must be 10 digits";
    }
    if (!paymentMethod) {
      errors.paymentMethodError = "Payment Method is required";
    }
    return errors;
  };

  const handleBillDetailsChange = (e, value) => {
    if (value === "paymentMethod") {
      setBillDetails({
        ...billDetails,
        [value]: e,
      });
    } else {
      setBillDetails({ ...billDetails, [e.target.name]: e.target.value });
    }
    let data = {
      name: value === "paymentMethod" ? value : e?.target?.name,
      value: value === "paymentMethod" ? e : e.target.value,
    };
    const errors = validateOnchange(data.name, data.value, errorMessages);

    setErrorMessages(errors);
  };

  const validateOnchange = (name, value, preserveError) => {
    let errors = { ...preserveError };
    switch (name) {
      case "name":
        if (!value) {
          errors.nameError = "Customer name is required";
        } else {
          const newErrors = omit(errors, "nameError");
          errors = newErrors;
        }
        break;
      case "phone":
        if (!value) {
          errors.phoneError = "Phone number is required";
        } else if (value.length < 10) {
          errors.phoneError = "Phone number must be 10 digits";
        } else {
          const newErrors = omit(errors, "phoneError");
          errors = newErrors;
        }
        break;
      case "email":
        if (
          value &&
          !RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/).test(value)
        ) {
          errors.emailError = "Please enter a valid email";
        } else {
          const newErrors = omit(errors, "emailError");
          errors = newErrors;
        }
        break;
      case "password":
        if (!value) {
          errors.passwordError = "Password is required";
        } else {
          const newErrors = omit(errors, "passwordError");
          errors = newErrors;
        }
        break;
      case "paymentMethod":
        if (!value) {
          errors.paymentMethodError = "Payment method is required";
        } else {
          const newErrors = omit(errors, "paymentMethodError");
          errors = newErrors;
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const handleAddTax = () => {
    let fields = billDetails.taxFields;
    billDetails?.taxFields.forEach((data) => {
      if (!data.name) {
        data.taxError = true;
      }
      if (data.name && !data.name.tax) {
        data.taxCountError = true;
      }
      if (data.name && data.name.__isNew__) {
        data.enableTaxCount = true;
      }
    });
    const filterFields = billDetails?.taxFields?.filter(
      (data) => data.taxError || data.taxCountError
    );
    if (!filterFields.length) {
      fields.push(taxObj);
    }
    setBillDetails({
      ...billDetails,
      taxFields: fields,
    });
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
                    value={billCount}
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
                        className={clsx(
                          "form-control form-control-solid",
                          errorMessages?.nameError && "is-invalid"
                        )}
                        placeholder="Full Name*"
                        name="name"
                        value={billDetails?.name}
                        onChange={handleBillDetailsChange}
                      />
                      {errorMessages?.nameError && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block px-2">
                            <span role="alert">{errorMessages?.nameError}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-5">
                      <input
                        type="text"
                        className={clsx(
                          "form-control form-control-solid",
                          errorMessages?.phoneError && "is-invalid"
                        )}
                        placeholder="Phone*"
                        name="phone"
                        maxLength={10}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={billDetails?.phone}
                        onChange={handleBillDetailsChange}
                      />
                      {errorMessages?.phoneError && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block px-2">
                            <span role="alert">
                              {errorMessages?.phoneError}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-5">
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Email"
                        name="email"
                        value={billDetails?.email}
                        onChange={handleBillDetailsChange}
                      />
                      {errorMessages?.emailError && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block px-2">
                            <span role="alert">
                              {errorMessages?.emailError}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-5">
                      <textarea
                        name="notes"
                        className="form-control form-control-solid"
                        rows="3"
                        placeholder="Add Customer Notes"
                        value={billDetails?.notes}
                        onChange={handleBillDetailsChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div
                  className="table-responsive mb-10"
                  style={{ overflowX: "inherit" }}
                >
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
                                disabled={el?.disableQty}
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
                                disabled={el?.disablePrice}
                              />
                            </td>
                            <td className="pt-8 text-end text-nowrap">
                              ₹<span data-kt-element="total">{el.total}</span>
                            </td>
                            <td className="pt-5 text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-icon btn-active-color-primary cursor-pointer"
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
                          colSpan="4"
                          className="border-bottom border-bottom-dashed text-end"
                        >
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="fs-5 pe-4">Subtotal</div>
                            <div>
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
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-link pe-4 d-flex align-items-center"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                title="Coming soon"
                              >
                                <span>Tax </span>
                              </button>
                              {billDetails?.enableTax && (
                                <div className="d-flex align-items-center justify-content-end me-1 ms-2">
                                  <button
                                    className="btn btn-sm btn-light-primary border fs-6 py-1 px-2 ms-2"
                                    data-kt-element="add-item"
                                    onClick={handleAddTax}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              {billDetails?.enableTax ? (
                                billDetails?.taxFields?.map((el, index) => {
                                  return (
                                    <div className="d-flex align-items-center justify-content-end">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-icon btn-active-color-primary cursor-pointer"
                                        data-kt-element="remove-item"
                                        onClick={() => {
                                          let taxData = JSON.parse(
                                            JSON.stringify(
                                              billDetails.taxFields
                                            )
                                          );
                                          taxData.splice(index, 1);
                                          setBillDetails({
                                            ...billDetails,
                                            taxFields: taxData,
                                          });
                                        }}
                                        disabled={
                                          billDetails?.taxFields?.length === 1
                                        }
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
                                      <div
                                        style={{
                                          minWidth: "130px",
                                          maxWidth: "145px",
                                        }}
                                      >
                                        <CreatableSelect
                                          options={taxOptions}
                                          placeholder={"Select Tax"}
                                          isDisabled={false}
                                          maxMenuHeight={120}
                                          value={el?.name}
                                          onChange={(value) =>
                                            handleTaxChange(value, index)
                                          }
                                          className={clsx(
                                            el?.taxError && "border-red"
                                          )}
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        className={clsx(
                                          "form-control form-control-solid text-end ms-3 me-1 px-2 py-2",
                                          el?.taxCountError && "border-red"
                                        )}
                                        name="price"
                                        placeholder="0"
                                        data-kt-element="price"
                                        id="price-input"
                                        style={{ width: "50px" }}
                                        maxLength={3}
                                        value={el?.name?.tax}
                                        disabled={!el?.enableTaxCount}
                                        onKeyPress={(event) => {
                                          const currentValue =
                                            event.target.value + event.key; // Combine current value with pressed key
                                          if (
                                            !/^\d*\.?\d*$/.test(currentValue) ||
                                            parseInt(currentValue) > 100
                                          ) {
                                            event.preventDefault();
                                          }
                                        }}
                                        onFocus={(e) => {
                                          e.target.select();
                                        }}
                                        onChange={(e) => {
                                          handleTaxCountChange(e, index);
                                        }}
                                      />
                                      %
                                    </div>
                                  );
                                })
                              ) : (
                                <div>0%</div>
                              )}
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <button
                              className="btn btn-link pe-4"
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              title="Coming soon"
                            >
                              Discount
                            </button>
                            {billDetails?.enableDiscount ? (
                              <div className="d-flex align-items-center">
                                <input
                                  type="text"
                                  className={clsx(
                                    "form-control form-control-solid text-end ms-3 me-1 ",
                                    billDetails?.discError && "border-red"
                                  )}
                                  name="discount"
                                  placeholder="Enter Discount"
                                  data-kt-element="discount"
                                  id="price-input"
                                  maxLength={3}
                                  onKeyPress={(event) => {
                                    const currentValue =
                                      event.target.value + event.key; // Combine current value with pressed key
                                    if (
                                      !/^\d*\.?\d*$/.test(currentValue) ||
                                      parseInt(currentValue) > 100
                                    ) {
                                      event.preventDefault();
                                    }
                                  }}
                                  value={billDetails?.addDiscount}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setBillDetails({
                                      ...billDetails,
                                      addDiscount: value,
                                      discError: value ? false : true,
                                    });
                                  }}
                                  style={{ width: "130px" }}
                                />
                                %
                              </div>
                            ) : (
                              <div>0%</div>
                            )}
                          </div>
                        </th>
                      </tr>
                      <tr className="align-top fw-bold text-gray-700">
                        <th></th>
                        <th colSpan="2" className="fs-4 ps-0">
                          Total
                        </th>
                        <th colSpan="2" className="text-end fs-4 text-nowrap">
                          ₹
                          <span data-kt-element="grand-total">
                            {(() => {
                              let total = 0;
                              product.forEach((el) => {
                                total += parseFloat(el.total);
                              });
                              let totalTax = 0;
                              if (billDetails?.taxFields?.length) {
                                billDetails?.taxFields.forEach((el) => {
                                  if (el?.name && el?.name?.tax != 0) {
                                    totalTax +=
                                      (parseFloat(total) *
                                        parseFloat(el?.name?.tax)) /
                                      100;
                                  }
                                });
                              }
                              total += totalTax; // Add totalTax to total outside the loop
                              total = Math.floor(total);
                              if (
                                billDetails?.enableDiscount &&
                                billDetails?.addDiscount
                              ) {
                                total =
                                  total -
                                  total *
                                    (parseFloat(billDetails?.addDiscount) /
                                      100);
                              }
                              console.log("============", billDetails);
                              return parseFloat(total.toFixed(2));
                            })()}
                          </span>
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
          <div
            className="card w-100 sticky-top"
            style={{ top: "97px", zIndex: 1 }}
          >
            <div class="card-body p-10">
              <div class="mb-10">
                <Select
                  options={paymentMethodOptions}
                  isClearable={true}
                  placeholder={"Select Payment Method"}
                  value={billDetails?.paymentMethod}
                  name="paymentMethod"
                  onChange={(option) => {
                    handleBillDetailsChange(option, "paymentMethod");
                  }}
                  className={clsx(
                    errorMessages?.paymentMethodError && "border-red"
                  )}
                  maxMenuHeight={150}
                />
                {errorMessages?.paymentMethodError && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block px-2">
                      <span role="alert">
                        {errorMessages?.paymentMethodError}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div class="separator separator-dashed mb-8"></div>
              <div class="mb-8">
                <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack mb-3">
                  <span class="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                    Add Tax
                  </span>
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    name="enableTax"
                    value={billDetails?.enableTax}
                    checked={billDetails?.enableTax == true ? true : false}
                    onChange={handleBillInput}
                  />
                </label>
                <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                  <span class="form-check-label ms-0 fw-bold fs-6 text-gray-700">
                    Add Discount
                  </span>
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    name="enableDiscount"
                    value={billDetails?.enableDiscount}
                    checked={billDetails?.enableDiscount == true ? true : false}
                    onChange={handleBillInput}
                  />
                </label>
              </div>
              <div class="separator separator-dashed mb-8"></div>
              <div class="mb-0">
                <button
                  type="submit"
                  href="#"
                  class="btn btn-primary w-100"
                  id="kt_invoice_submit_button"
                  onClick={sendInvoice}
                >
                  <span class="svg-icon svg-icon-3 me-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Send Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateBill;
