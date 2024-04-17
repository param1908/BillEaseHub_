import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../../loaders/MainLoader";
import { getAllCustomerBillsApi } from "../../../services/merchant.service";
import moment from "moment";
import Pagination from "react-js-pagination";
import NotFoundLogo from "../../../beh_images/not-found.png";

const Customer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [customerBills, setCustomerBills] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    !search && setLoading(true);
    getALlCustomerBills();
  }, [search, paginate]);

  const handlePageChange = (pageNumber) => {
    setPaginate({ ...paginate, page: pageNumber });
  };

  const getALlCustomerBills = async () => {
    try {
      let payload = {
        ...paginate,
      };
      if (search) payload = { ...payload, search };
      const customerBillData = await getAllCustomerBillsApi(payload);
      console.log("customerBillData", customerBillData);
      setCustomerBills(customerBillData?.data?.getBillTemplateData);
      setTotal(customerBillData?.data?.totalBills);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("err", error);
    }
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
              <p className="mb-0">All Customers [{total}]</p>
            </h3>
            <div className="d-flex">
              <div className="d-flex align-items-center position-relative my-1 me-md-2">
                <i className="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Customer"
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
          {customerBills.length > 0 && (
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
                        Invoices
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
                    {customerBills.map((el, index) => (
                      <tr role="row" key={index}>
                        <td role="cell" className="">
                          <div className="d-flex align-items-center">
                            <div className="d-flex flex-column">
                              <a
                                className="text-gray-800 text-hover-primary mb-1 text-capitalize cursor-pointer"
                                onClick={() => {
                                  navigate("/merchant/customers-details", {
                                    state: el,
                                  });
                                }}
                              >
                                {el?.fullName}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td role="cell" className="">
                          {el?.email}
                        </td>
                        <td role="cell" className="text-capitalize">
                          +91 {el?.phone}
                        </td>
                        <td role="cell" className="text-capitalize">
                          {el?.billsData?.length || 0}
                        </td>
                        <td role="cell" className="">
                          <div className="badge badge-light fw-bolder">
                            {moment(el?.updatedAt).format("DD-MM-YYYY")}
                          </div>
                        </td>
                        <td
                          role="cell"
                          className="text-end min-w-100px d-flex justify-content-center"
                        >
                          <a
                            className="btn btn-sm btn-light-primary py-3 cursor-pointer"
                            onClick={() => {
                              navigate("/merchant/customers-details", {
                                state: el,
                              });
                            }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {customerBills.length === 0 && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "calc(100vh - 260px)" }}
            >
              <div>
                <img src={NotFoundLogo} alt="Logo" style={{ width: "430px" }} />
                <h3 className="mt-7 text-center">No Customer Found</h3>
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

export default Customer;
