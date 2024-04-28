import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getAllInvoiceApi } from "../../../services/merchant.service";
import Pagination from "react-js-pagination";
import NotFoundLogo from "../../../beh_images/not-found.png";
import MainLoader from "../../../loaders/MainLoader";
import moment from "moment";
import clsx from "clsx";

const Invoices = () => {
  const lastSevenDays = [];
  const todayDate = moment().format("DD/MM/YYYY");
  const currentDate = moment();
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days").format("DD/MM/YYYY");
    lastSevenDays.push(date);
  }

  const filterOptions = [
    {
      value: 1,
      label: "Today",
      fromDate: todayDate,
      toDate: "",
    },
    {
      value: 2,
      label: "Last 7 days",
      date: lastSevenDays,
      fromDate: lastSevenDays[lastSevenDays.length - 1],
      toDate: lastSevenDays[0],
    },
    {
      value: 3,
      label: "Last 1 month",
      fromDate: currentDate
        .clone()
        .subtract(1, "month")
        .startOf("month")
        .format("DD/MM/YYYY"),
      toDate: todayDate,
    },
    {
      value: 4,
      label: "Last 6 month",
      fromDate: moment()
        .subtract(6, "months")
        .startOf("month")
        .format("DD/MM/YYYY"),
      toDate: todayDate,
    },
    {
      value: 5,
      label: "Last 1 year",
      fromDate: moment()
        .startOf("month")
        .subtract(1, "year")
        .format("DD/MM/YYYY"),
      toDate: todayDate,
    },
    { value: 6, label: "All invoices", fromDate: "", toDate: "" },
  ];
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [invoice, setInvoice] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(filterOptions[1]);

  useEffect(() => {
    !search && setLoading(true);
    getAllInvoices();
  }, [search, paginate]);

  const handlePageChange = (pageNumber) => {
    setPaginate({ ...paginate, page: pageNumber });
  };

  const getAllInvoices = async () => {
    try {
      let payload = {
        ...paginate,
        fromDate: filter?.fromDate,
        toDate: filter?.toDate,
      };
      if (search) payload = { ...payload, search };
      const invoices = await getAllInvoiceApi(payload);
      setInvoice(invoices?.data?.getBillTemplateData);
      setTotal(invoices?.data?.totalBills);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("err", error);
    }
  };

  const navigeteBillTemplate = (el) => {
    const prepareObject = {
      name: el?.customerName ? el?.customerName : "",
      phone: el?.phoneNumber,
      email: el?.customerEmail ? el?.customerEmail : "",
      notes: el?.notes ? el?.notes : "",
      invoiceDate: el?.billDate ? el?.billDate : "",
      paymentMethod: { label: el?.paymentMethod },
      addDiscount: el?.discount,
      products: [],
      taxFields: [],
      billCount: el?._id,
      subTotalCount: el?.subTotal ? el?.subTotal : 0,
      discountCount: el?.discountCount ? el?.discountCount : 0,
      total: el?.total ? el?.total : 0,
      templateId: el?.templateId,
      isShowTemplateSelection: true,
    };
    if (el?.products?.length) {
      el?.products?.forEach((el) => {
        prepareObject.products.push({
          category: { label: el?.categoryName },
          product: { label: el?.productName },
          quantity: el?.productquantity,
          price: el?.productprice,
          total: el?.productTotal,
        });
      });
    }
    let total = el?.total;
    if (el?.taxFields?.length) {
      el?.taxFields?.forEach((el) => {
        prepareObject.taxFields.push({
          name: { label: el?.taxName, tax: el?.value },
          totalTaxCount: JSON.parse(
            JSON.stringify(
              Math.floor((parseFloat(total) * parseFloat(el?.value)) / 100)
            )
          ),
        });
      });
    }
    navigate("/merchant/bill-templates", { state: prepareObject });
  };

  const handleFilterChange = (e) => {
    setFilter(e);
    setPaginate({ ...paginate, page: 1 });
  };

  return (
    <>
      <div
        className="card card-custom card-stretch gutter-b mb-10"
        style={{ minHeight: "calc(100vh - 130px)" }}
      >
        <div className="card-header">
          <div className="card-title m-0 d-flex justify-content-between w-100">
            <h3 className="fw-bolder m-0 d-flex align-items-center">
              <p className="mb-0">ALL Invoices [{total || 0}]</p>
            </h3>
            <div className="d-flex">
              <div className="card-toolbar me-md-2" style={{ width: "200px" }}>
                <Select
                  className="form-control bg-transparent beh-select"
                  classNamePrefix="select"
                  value={filter}
                  name="filter"
                  options={filterOptions}
                  onChange={(e) => handleFilterChange(e)}
                />
              </div>
              <div className="d-flex align-items-center position-relative my-1">
                <i className="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Invoice"
                  onKeyUp={(e) => {
                    setPaginate({ ...paginate, page: 1 });
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          {invoice.length > 0 && (
            <div className="card-body py-4">
              <div className="table-responsive">
                <table
                  id="kt_table_users"
                  className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                  role="table"
                >
                  <thead>
                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        Name
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        Email
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        Phone
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        Amount
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        Payment Method
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="min-w-125px"
                      >
                        CREATED DATE
                      </th>
                      <th
                        colspan="1"
                        role="columnheader"
                        className="text-center min-w-100px"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-bold" role="rowgroup">
                    {invoice.length &&
                      invoice.map((el, index) => {
                        return (
                          <tr role="row">
                            <td role="cell" className="text-capitalize">
                              {el?.customerName}
                            </td>
                            <td role="cell" className="">
                              {el?.customerEmail}
                            </td>
                            <td role="cell" className="text-capitalize">
                              {el?.phoneNumber ? "+91 " + el?.phoneNumber : "-"}
                            </td>
                            <td role="cell" className="text-capitalize">
                              ₹{el?.total}
                            </td>
                            <td role="cell" className="">
                              <span
                                className={clsx(
                                  "badge badge-light-success",
                                  el?.paymentMethod === "Online" &&
                                    "badge-light-warning"
                                )}
                              >
                                {el?.paymentMethod}
                              </span>
                            </td>
                            <td role="cell" className="">
                              <div className="badge badge-light fw-bolder">
                                {moment(el?.createdAt).format("DD-MM-YYYY")}
                              </div>
                            </td>
                            <td
                              role="cell"
                              className="text-end min-w-100px d-flex justify-content-center"
                            >
                              <a
                                className="btn btn-sm btn-light-primary py-3 cursor-pointer"
                                onClick={() => {
                                  navigeteBillTemplate(el);
                                }}
                              >
                                View Invoice
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {invoice.length === 0 && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "calc(100vh - 260px)" }}
            >
              <div>
                <img src={NotFoundLogo} alt="Logo" style={{ width: "430px" }} />
                <h3 className="mt-7 text-center">No Products Found</h3>
              </div>
            </div>
          )}
          {total > 12 && (
            <Pagination
              activePage={paginate?.page}
              itemsCountPerPage={paginate?.limit}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>
      {loading && <MainLoader />}
    </>
  );
};

export default Invoices;
