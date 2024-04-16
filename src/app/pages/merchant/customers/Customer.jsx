import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Customer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card card-custom card-stretch gutter-b mb-10"
        style={{ minHeight: "calc(100vh - 130px)" }}
      >
        <div className="card-header">
          <div className="card-title m-0 d-flex justify-content-between w-100">
            <h3 className="fw-bolder m-0 d-flex align-items-center">
              <p className="mb-0">All Customers [20]</p>
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
                  // onKeyUp={(e) => {
                  //   setPaginate({ ...paginate, page: 1 });
                  //   setSearch(e.target.value);
                  // }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          <div className="card-body py-4">
            <div className="table-responsive">
              <table
                id="kt_table_users"
                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                role="table"
              >
                <thead>
                  <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Name
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Email
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Phone
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Invoices
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
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
                  <tr role="row">
                    <td role="cell" className="">
                      <div className="d-flex align-items-center">
                        <div className="d-flex flex-column">
                          <a className="text-gray-800 text-hover-primary mb-1 text-capitalize cursor-pointer">
                            Customer Name
                          </a>
                        </div>
                      </div>
                    </td>
                    <td role="cell" className="">
                      customer@gmail.com
                    </td>
                    <td role="cell" className="text-capitalize">
                      1234567890
                    </td>
                    <td role="cell" className="text-capitalize">
                      3
                    </td>
                    <td role="cell" className="">
                      <div className="badge badge-light fw-bolder">
                        {/* {moment().format("DD-MM-YYYY")} */}
                        15/04/2024
                      </div>
                    </td>
                    <td role="cell" className="text-end min-w-100px">
                      <a className="btn btn-sm btn-light-primary py-3 cursor-pointer"
                      onClick={() => {navigate('/merchant/customers-details')}}>
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* {total > 12 && (
            <Pagination
              activePage={paginate?.page}
              itemsCountPerPage={paginate?.limit}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default Customer;
