import clsx from "clsx";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerDetails = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const handleBillData = (el) => {
    try {
      console.log("first, el", el);
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
    } catch (error) {}
  };

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
                      {data?.profilePic ? (
                        <img src={data?.profilePic} alt="image" />
                      ) : (
                        <div
                          className="text-uppercase d-flex justify-content-center align-items-center"
                          style={{
                            width: "160px",
                            height: "160px",
                            borderRadius: "50%",
                            backgroundColor: "#868fa7 ",
                            color: "#f9f9f9",
                            fontSize: "50px",
                          }}
                        >
                          {data.fullName[0]}
                        </div>
                      )}
                    </div>
                    <a class="fs-3 text-gray-800 fw-bold mb-5 text-capitalize">
                      {data.fullName}{" "}
                    </a>
                    <div class="d-flex flex-wrap flex-center">
                      <div class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3 text-center">
                        <div class="fs-4 fw-bold text-gray-700">
                          <span class="w-75px">
                            {(() => {
                              let total = 0;
                              data?.billsData.forEach((el) => {
                                total += parseFloat(el.total);
                                console.log("eee", el.total);
                              });
                              return <>₹{total}</>;
                            })()}
                          </span>
                        </div>
                        <div class="fw-semibold text-muted">Total Paid</div>
                      </div>
                      <div class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3 text-center">
                        <div class="fs-4 fw-bold text-gray-700">
                          <span class="w-50px">
                            {data?.billsData?.length || 0}
                          </span>
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
                      <div class="text-gray-600">+91 {data?.phone}</div>
                      <div class="fw-bold mt-5">Email Address</div>
                      <div class="text-gray-600">
                        <a href="#" class="text-gray-600 text-hover-primary">
                          {data?.email ? data?.email : "-"}
                        </a>
                      </div>
                      <div class="fw-bold mt-5">Last Invoice Date</div>
                      <div class="text-gray-600">
                        {moment(data?.billsData[0]?.updatedAt).format(
                          "DD-MM-YYYY"
                        )}
                      </div>
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
                                  style={{ width: "322px" }}
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
                              {data?.billsData?.map((el) => {
                                return (
                                  <tr>
                                    <td data-order="Invalid date">
                                      <a
                                        class="text-gray-600 text-hover-primary cursor-pointer"
                                        onClick={() => {
                                          handleBillData(el);
                                        }}
                                      >
                                        {el?._id}
                                      </a>
                                    </td>
                                    <td class="text-success dt-type-numeric">
                                      {el?.total}
                                    </td>
                                    <td>
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
                                    <td>
                                      {moment(el?.updatedAt).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </td>
                                    <td class="text-end">
                                      <button class="btn btn-sm btn-light btn-active-light-primary">
                                        Download
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>{/* Dhruvik here add paginatio ok */}</tfoot>
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
