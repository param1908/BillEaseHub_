import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const Template2 = (props) => {
  const templateData = props.templateData;
  const { userDetails } = useSelector((state) => state.user);

  return (
    <>
      <div id="kt_app_content_container" className="container-xxl p-0">
        <div className="card-body p-0">
          <div className=" w-100">
            <div className="d-flex justify-content-between flex-column flex-sm-row mb-15">
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
            <div className="border-bottom pb-12">
              <div className="d-flex flex-row-fluid card-rounded mb-10">
                <div className="text-start">
                  <div className="text-gray-600 fs-6 fw-semibold mb-3">
                    INVOICE TO.
                  </div>
                  <div className="d-flex">
                    <p className="text-gray-600 fs-6 fw-semibold me-2">
                      Name :
                    </p>
                    <p className="fs-6 text-gray-800 fw-semibold text-capitalize">
                      {templateData?.name}
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="text-gray-600 fs-6 fw-semibold me-2">
                      Phone :
                    </p>
                    <p className="fs-6 text-gray-800 fw-semibold">
                      +91 {templateData?.phone}
                    </p>
                  </div>{" "}
                  {templateData?.email && (
                    <div className="d-flex mb-8">
                      <p className="text-gray-600 fs-6 fw-semibold me-2">
                        Email :
                      </p>
                      <p className="fs-6 text-gray-800 fw-semibold">
                        {templateData?.email}
                      </p>
                    </div>
                  )}
                  <div className="text-gray-600 fs-6 fw-semibold mb-3">
                    INVOICE NO.
                  </div>
                  <div className="fs-6 text-gray-800 fw-semibold mb-8">
                    {templateData?.billCount}
                  </div>
                  <div className="text-gray-600 fs-6 fw-semibold mb-3">
                    DATE
                  </div>
                  <div className="fs-6 text-gray-800 fw-semibold">
                    {templateData?.invoiceDate}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <div className="flex-grow-1 pt-8 mb-19">
                  <div className="table-responsive border-bottom mb-10">
                    <table className="table">
                      <thead>
                        <tr className="border-bottom fs-6 fw-bold text-muted text-uppercase">
                          <th className="min-w-175px pb-9">Items</th>
                          <th className="min-w-70px pb-9 text-end">Quantity</th>
                          <th className="min-w-80px pb-9 text-end">Price</th>
                          <th className="min-w-100px pe-lg-6 pb-9 text-end">
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
                                <td className="d-flex align-items-center pt-11">
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
                                <td className="pt-11">
                                  {product?.quantity || 1}
                                </td>
                                <td className="pt-11">
                                  ₹{product?.price || "00.00"}
                                </td>
                                <td className="pt-11 fs-5 pe-lg-6 text-dark fw-bolder">
                                  ₹{product?.total}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end mb-7">
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
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fs-3 fw-bold text-muted mb-3">
                      TOTAL AMOUNT
                    </div>
                    <div className="fs-xl-2x fs-2 fw-bolder">
                      ₹{templateData?.total}
                    </div>
                    <div className="text-muted fw-semibold">Taxes included</div>
                    <div className="border-bottom w-100 my-7 my-lg-16"></div>
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

export default Template2;
