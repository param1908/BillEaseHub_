import React from "react";

const CustomerDetails = () => {
  return (
    <>
      <div id="kt_app_content" className="app-content  flex-column-fluid">
        <div id="kt_app_content_container" className="app-container-fluid">
          <div className="d-flex flex-column flex-xl-row">
            <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
              <div class="card mb-5 mb-xl-8">
                <div class="card-body pt-15">
                  <div class="d-flex flex-center flex-column mb-5">
                    <div class="symbol symbol-100px symbol-circle mb-7">
                      <img
                        src="/metronic8/demo1/assets/media/avatars/300-1.jpg"
                        alt="image"
                      />
                    </div>
                    <a
                      href="#"
                      class="fs-3 text-gray-800 text-hover-primary fw-bold mb-5"
                    >
                      Max Smith{" "}
                    </a>
                    <div class="d-flex flex-wrap flex-center">
                      <div class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3 text-center">
                        <div class="fs-4 fw-bold text-gray-700">
                          <span class="w-75px">₹6,900</span>
                        </div>
                        <div class="fw-semibold text-muted">Total Paid</div>
                      </div>
                      <div class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3 text-center">
                        <div class="fs-4 fw-bold text-gray-700">
                          <span class="w-50px">130</span>
                        </div>
                        <div class="fw-semibold text-muted">Invoices</div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-stack fs-4 py-3">
                    <div class="fw-bold">
                      Details
                      <span class="ms-2 rotate-180">
                        <i class="ki-duotone ki-down fs-3"></i>{" "}
                      </span>
                    </div>
                  </div>

                  <div class="separator separator-dashed my-3"></div>
                  <div id="kt_customer_view_details" class="collapse show">
                    <div class="py-5 fs-6">
                      <div class="fw-bold">Phone No.</div>
                      <div class="text-gray-600">+91 1234567890</div>
                      <div class="fw-bold mt-5">Email Address</div>
                      <div class="text-gray-600">
                        <a href="#" class="text-gray-600 text-hover-primary">
                          info@keenthemes.com
                        </a>
                      </div>
                      <div class="fw-bold mt-5">Last Invoice Date</div>
                      <div class="text-gray-600">54238-8693</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-lg-row-fluid ms-lg-15">
              <div class="card pt-2 mb-6 mb-xl-9">
                <div class="card-header border-0">
                  <div class="card-title">
                    <h2>Invoices</h2>
                  </div>
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
                        placeholder="Search Invoice"
                        // onKeyUp={(e) => {
                        //   setPaginate({ ...paginate, page: 1 });
                        //   setSearch(e.target.value);
                        // }}
                      />
                    </div>
                  </div>
                </div>
                <div class="card-body pt-0">
                  <div id="kt_referred_users_tab_content" class="tab-content">
                    <div
                      id="kt_customer_details_invoices_1"
                      class="py-0 tab-pane fade show active"
                      role="tabpanel"
                      aria-labelledby="kt_referrals_year_tab"
                    >
                      <div
                        id="kt_customer_details_invoices_table_1_wrapper"
                        class="dt-container dt-bootstrap5 dt-empty-footer"
                      >
                        <div id="" class="table-responsive">
                          <table
                            id="kt_customer_details_invoices_table_1"
                            class="table align-middle table-row-dashed fs-6 fw-bold gy-5 dataTable"
                            style={{ width: " 800.75px" }}
                          >
                            <colgroup>
                              <col style={{ width: "152.516px" }} />
                              <col style={{ width: "152.516px" }} />
                              <col style={{ width: "152.516px" }} />
                              <col style={{ width: "190.641px" }} />
                              <col style={{ width: "152.562px" }} />
                            </colgroup>
                            <thead class="border-bottom border-gray-200 fs-7 text-uppercase fw-bold">
                              <tr class="text-start text-muted gs-0" role="row">
                                <th
                                  class="min-w-100px dt-orderable-asc dt-orderable-desc"
                                  data-dt-column="0"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Order ID: Activate to sort"
                                  tabindex="0"
                                >
                                  <span class="dt-column-title" role="button">
                                    Invoice ID
                                  </span>
                                  <span class="dt-column-order"></span>
                                </th>
                                <th
                                  class="min-w-100px dt-type-numeric dt-orderable-asc dt-orderable-desc"
                                  data-dt-column="1"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Amount: Activate to sort"
                                  tabindex="0"
                                >
                                  <span class="dt-column-title" role="button">
                                    Amount
                                  </span>
                                  <span class="dt-column-order"></span>
                                </th>
                                <th
                                  class="min-w-100px dt-orderable-asc dt-orderable-desc"
                                  data-dt-column="2"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Status: Activate to sort"
                                  tabindex="0"
                                >
                                  <span class="dt-column-title" role="button">
                                    payment Method
                                  </span>
                                  <span class="dt-column-order"></span>
                                </th>
                                <th
                                  class="min-w-125px dt-orderable-asc dt-orderable-desc"
                                  data-dt-column="3"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Date: Activate to sort"
                                  tabindex="0"
                                >
                                  <span class="dt-column-title" role="button">
                                    Date
                                  </span>
                                  <span class="dt-column-order"></span>
                                </th>
                                <th
                                  class="min-w-100px text-end pe-7 dt-orderable-none"
                                  data-dt-column="4"
                                  rowspan="1"
                                  colspan="1"
                                  aria-label="Action"
                                >
                                  <span class="dt-column-title">Action</span>
                                  <span class="dt-column-order"></span>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="fs-6 fw-semibold text-gray-600">
                              <tr>
                                <td data-order="Invalid date">
                                  <a
                                    href="#"
                                    class="text-gray-600 text-hover-primary"
                                  >
                                    102445788
                                  </a>
                                </td>
                                <td class="text-success dt-type-numeric">
                                  ₹38.00
                                </td>
                                <td>
                                  <span class="badge badge-light-success">
                                    Cash
                                  </span>
                                </td>
                                <td>Nov 01, 2020</td>
                                <td class="text-end">
                                  <button class="btn btn-sm btn-light btn-active-light-primary">
                                    Download
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              {/* Dhruvik here add paginatio ok */}
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
