import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const Template1 = (props) => {
  const templateData = props.templateData;
  const { userDetails } = useSelector((state) => state.user);
  console.log("templateData1", templateData);
  return (
    <>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="container-xxl p-0">
          <div className="card-body">
            <div className="d-flex flex-column flex-xl-row">
              <div className="flex-lg-row-fluid mb-10 mb-xl-0">
                <div className="mt-n1">
                  <div className="pb-10">
                    <div className="symbol symbol-50px me-5 w-100">
                      <div className="fw-bold fs-3 text-gray-800 mb-8">
                        Invoice #{templateData?.billCount}
                      </div>
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="text-sm-start fw-semibold fs-4 text-muted mt-3">
                          <div className="text-capitalize fw-bold">
                            {userDetails?.user?.fullName}
                          </div>
                          <div className="text-capitalize">
                            Address: {userDetails?.user?.merchantData?.location}
                          </div>
                          {userDetails?.user?.email && (
                            <div>Email: {userDetails?.user?.email}</div>
                          )}
                          {userDetails?.user?.phoneNumber && (
                            <div>
                              Phone No: +91 {userDetails?.user?.phoneNumber}
                            </div>
                          )}
                          {userDetails?.user?.merchantData?.GSTIN && (
                            <div>
                              GSTIN: {userDetails?.user?.merchantData?.GSTIN}
                            </div>
                          )}
                        </div>
                        {userDetails?.user?.merchantData?.logo ? (
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              alt="Logo"
                              src={
                                userDetails?.user?.imageUrl +
                                userDetails?.user?.merchantData?.logo
                              }
                            />
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center align-items-center">
                            <div
                              className="text-uppercase d-flex justify-content-center align-items-center fw-bold"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                backgroundColor: "#868fa7 ",
                                color: "#f9f9f9",
                                fontSize: "19px",
                              }}
                            >
                              {userDetails?.user?.fullName[0]}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="m-0">
                    <div className="row g-5 mb-11">
                      <div className="col-sm-6">
                        <div className="fw-semibold fs-7 text-gray-600 mb-1">
                          Date:
                        </div>
                        <div className="fw-bold fs-6 text-gray-800">
                          {templateData?.invoiceDate}
                        </div>
                      </div>
                    </div>
                    <div className="row g-5 mb-12">
                      <div className="col-sm-6">
                        <div className="fw-semibold fs-7 text-gray-600 mb-1">
                          Invoice For:
                        </div>
                        <div className="d-flex">
                          <p className="me-1 fw-semibold fs-7 text-gray-600 mb-1">
                            Name -
                          </p>
                          <div className="fw-bold fs-6 text-gray-800 text-capitalize">
                            {templateData?.name}
                          </div>
                        </div>
                        <div className="d-flex">
                          <p className="me-1 fw-semibold fs-7 text-gray-600 mb-1">
                            Phone -
                          </p>
                          <div className="fw-bold fs-6 text-gray-800">
                            +91 {templateData?.phone}
                          </div>
                        </div>
                        {templateData?.email && (
                          <div className="d-flex">
                            <p className="me-1 fw-semibold fs-7 text-gray-600 mb-1">
                              Email -
                            </p>
                            <div className="fw-bold fs-6 text-gray-800">
                              {templateData?.email}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="table-responsive border-bottom mb-9">
                        <table className="table mb-3">
                          <thead>
                            <tr className="border-bottom fs-6 fw-bold text-muted">
                              <th className="min-w-175px pb-2">Items</th>
                              <th className="min-w-70px text-end pb-2">
                                Quantity
                              </th>
                              <th className="min-w-80px text-end pb-2">Rate</th>
                              <th className="min-w-100px text-end pb-2">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {templateData?.products?.map((product, index) => {
                              let className = "";
                              if (index % 3 === 0) {
                                className = "text-warning";
                              } else if (index % 3 === 1) {
                                className = "text-success";
                              } else if (index % 3 === 2) {
                                className = "text-info";
                              } else {
                                className = "text-yellow";
                              }

                              return (
                                <>
                                  <tr className="fw-bold text-gray-700 fs-5 text-end">
                                    <td className="d-flex align-items-center pt-6">
                                      <i
                                        className={clsx(
                                          "fa fa-genderless fs-2 me-2",
                                          className
                                        )}
                                      ></i>
                                      <span className="text-capitalize pe-1">
                                        {product?.category?.label}
                                        {" - "}
                                      </span>

                                      {product?.product?.label?.replace(
                                        /\b\w/g,
                                        (char) => char.toUpperCase()
                                      )}
                                    </td>
                                    <td className="pt-6">
                                      {product?.quantity || 1}
                                    </td>
                                    <td className="pt-6">
                                      ₹{product?.price || "00.00"}
                                    </td>
                                    <td className="pt-6 text-dark fw-bolder">
                                      ₹{product?.total}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="mw-300px">
                          <div className="d-flex flex-stack mb-3">
                            <div className="fw-semibold pe-10 text-gray-600 fs-7">
                              Subtotal:
                            </div>
                            <div className="text-end fw-bold fs-6 text-gray-800">
                              ₹ {templateData?.subTotalCount}
                            </div>
                          </div>
                          <div className="d-flex flex-stack mb-3 align-items-start">
                            <div
                              className="fw-semibold text-gray-600 fs-7"
                              style={{ paddingTop: "2px" }}
                            >
                              TAX
                            </div>
                            <div className="ps-2">
                              {templateData?.taxFields.map((el) => {
                                return (
                                  <div className="d-flex flex-stack mb-1">
                                    <div className="fw-semibold pe-17 text-gray-600 fs-7">
                                      {"(" +
                                        el?.name?.label +
                                        " " +
                                        el?.name?.tax +
                                        "%)"}
                                    </div>
                                    <div className="text-end fw-bold fs-6 text-gray-800">
                                      ₹ {el?.totalTaxCount}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="d-flex flex-stack mb-3">
                            <div className="fw-semibold pe-10 text-gray-600 fs-7">
                              Discount ({templateData?.addDiscount}%)
                            </div>
                            <div className="text-end fw-bold fs-6 text-gray-800">
                              ₹ {templateData?.discountCount}
                            </div>
                          </div>
                          <div className="d-flex flex-stack">
                            <div className="fw-semibold pe-10 text-gray-600 fs-7">
                              Total
                            </div>
                            <div className="text-end fw-bold fs-6 text-gray-800">
                              ₹ {templateData?.total}
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
        </div>
      </div>
    </>
  );
};

export default Template1;
