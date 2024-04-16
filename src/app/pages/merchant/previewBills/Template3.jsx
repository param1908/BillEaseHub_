import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const Template3 = (props) => {
  const templateData = props.templateData;
  const { userDetails } = useSelector((state) => state.user);

  return (
    <>
      <div
        id="kt_app_content_container"
        className="app-container container-xxl p-0"
      >
        <div className="card-body py-10 px-0">
          <div className=" w-100">
            <div className="d-flex justify-content-between flex-column flex-sm-row mb-19">
              <h4 className="fw-bolder text-gray-800 fs-2qx pe-5 pb-7">
                INVOICE
              </h4>
              <div className="text-sm-end">
                {userDetails?.user?.merchantData?.logo ? (
                  <div className="d-flex justify-content-end align-items-center">
                    <img
                      alt="Logo"
                      src={
                        userDetails?.user?.imageUrl +
                        userDetails?.user?.merchantData?.logo
                      }
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-end align-items-center">
                    <div
                      className="text-uppercase d-flex justify-content-center align-items-center fw-bold"
                      style={{
                        width: "35px",
                        height: "35px",
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
                <div className="text-sm-end fw-semibold fs-4 text-muted mt-3">
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
                    <div>Phone No: +91 {userDetails?.user?.phoneNumber}</div>
                  )}
                  {userDetails?.user?.merchantData?.GSTIN && (
                    <div>GSTIN: {userDetails?.user?.merchantData?.GSTIN}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="pb-12">
              <div className="d-flex flex-column gap-7 gap-md-10">
                <div className="fw-bold fs-2">
                  <span className="text-capitalize">{templateData?.name}</span>
                  {templateData?.email && (
                    <span className="fs-6">({templateData?.email})</span>
                  )}
                  ,
                  <br />
                  <span className="text-muted fs-5">
                    Here are your order details. We thank you for your purchase.
                  </span>
                </div>
                <div className="separator"></div>
                <div className="d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bold">
                  <div className="flex-root d-flex flex-column">
                    <span className="text-muted">Date</span>
                    <span className="fs-5">{templateData?.invoiceDate}</span>
                  </div>
                  <div className="flex-root d-flex flex-column">
                    <span className="text-muted">Invoice ID</span>
                    <span className="fs-5">#{templateData?.billCount}</span>
                  </div>
                  {/* <div className="flex-root d-flex flex-column">
                    <span className="text-muted">Payment Method</span>
                    <span className="fs-5">Cash</span>
                  </div> */}
                </div>
                <div className="d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bold">
                  <div className="flex-root d-flex flex-column">
                    <span className="text-muted mb-3">Invoice To</span>
                    <div className="d-flex">
                      <p className="text-gray-600 fw-semibold me-2">Name :</p>
                      <p className="fs-6 text-gray-800 fw-semibold text-capitalize">
                        {templateData?.name}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-gray-600 fw-semibold me-2">Phone :</p>
                      <p className="fs-6 text-gray-800 fw-semibold">
                        +91 {templateData?.phone}
                      </p>
                    </div>{" "}
                    {templateData?.email && (
                      <div className="d-flex mb-8">
                        <p className="text-gray-600 fw-semibold me-2">
                          Email :
                        </p>
                        <p className="fs-6 text-gray-800 fw-semibold">
                          {templateData?.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  <div className="table-responsive border-bottom mb-9">
                    <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                      <thead>
                        <tr className="border-bottom fs-6 fw-bold text-muted">
                          <th className="min-w-175px pb-2">Products</th>
                          <th className="min-w-70px text-end pb-2">QTY</th>
                          <th className="min-w-80px text-end pb-2">PRICE</th>
                          <th className="min-w-100px text-end pb-2">Total</th>
                        </tr>
                      </thead>
                      <tbody className="fw-semibold text-gray-600">
                        {templateData?.products?.map((product, index) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <a
                                      href="../../demo1/dist/apps/ecommerce/catalog/edit-product.html"
                                      className="symbol symbol-50px"
                                    ></a>
                                    <div className="ms-5">
                                      <div className="fw-bold text-capitalize">
                                        {product?.category?.label}
                                      </div>
                                      <div className="fs-7 text-muted">
                                        {product?.product?.label?.replace(
                                          /\b\w/g,
                                          (char) => char.toUpperCase()
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-end">
                                  {product?.quantity || 1}
                                </td>
                                <td className="text-end">
                                  ₹{product?.price || "00.00"}
                                </td>
                                <td className="text-end">₹{product?.total}</td>
                              </tr>
                            </>
                          );
                        })}

                        <tr>
                          <td colspan="3" className="text-end">
                            Subtotal
                          </td>
                          <td className="text-end">
                            ₹{templateData?.subTotalCount}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" className="text-end">
                            <div className="d-flex align-items-start justify-content-end">
                              <span className="me-3">TAX</span>{" "}
                              <div>
                                {templateData?.taxFields.map((el) => {
                                  return (
                                    <>
                                      <div className="mb-2">
                                        {"(" +
                                          el?.name?.label +
                                          " " +
                                          el?.name?.tax +
                                          "%)"}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="text-end">
                            {templateData?.taxFields?.length ? (
                              templateData?.taxFields.map((el) => {
                                return (
                                  <>
                                    <div className="mb-2">
                                      ₹{el?.totalTaxCount}
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <div className="d-flex justify-content-end mb-1">
                                ₹ 0
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" className="text-end">
                            Discount ({templateData?.addDiscount || 0}%)
                          </td>
                          <td className="text-end">
                            ₹{templateData?.discountCount || 0}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="3"
                            className="fs-3 text-dark fw-bold text-end"
                          >
                            Grand Total
                          </td>
                          <td className="text-dark fs-3 fw-bolder text-end">
                            ₹{templateData?.total}
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default Template3;
