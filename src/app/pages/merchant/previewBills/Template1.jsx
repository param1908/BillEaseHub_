import React from "react";

const Template1 = () => {
  return (
    <>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="container-xxl p-0"
        >
            <div className="card-body">
              <div className="d-flex flex-column flex-xl-row">
                <div className="flex-lg-row-fluid mb-10 mb-xl-0">
                  <div className="mt-n1">
                    <div className="d-flex flex-stack pb-10">
                      <a href="#">
                        <img
                          alt="Logo"
                          src="assets/media/svg/brand-logos/code-lab.svg"
                        />
                      </a>
                    </div>
                    <div className="m-0">
                      <div className="fw-bold fs-3 text-gray-800 mb-8">
                        Invoice #34782
                      </div>
                      <div className="row g-5 mb-11">
                        <div className="col-sm-6">
                          <div className="fw-semibold fs-7 text-gray-600 mb-1">
                            Invoice Date:
                          </div>
                          <div className="fw-bold fs-6 text-gray-800">
                            12 Apr 2021
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
                            <div className="fw-bold fs-6 text-gray-800">
                              KeenThemes Inc.
                            </div>
                          </div>
                          <div className="d-flex">
                            <p className="me-1 fw-semibold fs-7 text-gray-600 mb-1">
                              Phone -
                            </p>
                            <div className="fw-bold fs-6 text-gray-800">
                              1234567890
                            </div>
                          </div>
                          <div className="d-flex">
                            <p className="me-1 fw-semibold fs-7 text-gray-600 mb-1">
                              Email -
                            </p>
                            <div className="fw-bold fs-6 text-gray-800">
                              test@yopmail.com
                            </div>
                          </div>
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
                                <th className="min-w-80px text-end pb-2">
                                  Rate
                                </th>
                                <th className="min-w-100px text-end pb-2">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="fw-bold text-gray-700 fs-5 text-end">
                                <td className="d-flex align-items-center pt-6">
                                  <i className="fa fa-genderless text-danger fs-2 me-2"></i>
                                  Phone - I Phone XS Max
                                </td>
                                <td className="pt-6">80</td>
                                <td className="pt-6">₹40.00</td>
                                <td className="pt-6 text-dark fw-bolder">
                                  ₹3200.00
                                </td>
                              </tr>
                              <tr className="fw-bold text-gray-700 fs-5 text-end">
                                <td className="d-flex align-items-center">
                                  <i className="fa fa-genderless text-success fs-2 me-2"></i>
                                  Headphone - Boat
                                </td>
                                <td>120</td>
                                <td>₹40.00</td>
                                <td className="fs-5 text-dark fw-bolder">
                                  ₹4800.00
                                </td>
                              </tr>
                              <tr className="fw-bold text-gray-700 fs-5 text-end">
                                <td className="d-flex align-items-center">
                                  <i className="fa fa-genderless text-primary fs-2 me-2"></i>
                                  Laptop - Asus Rog
                                </td>
                                <td>210</td>
                                <td>₹60.00</td>
                                <td className="fs-5 text-dark fw-bolder">
                                  ₹12600.00
                                </td>
                              </tr>
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
                                ₹ 20,600.00
                              </div>
                            </div>
                            <div className="d-flex flex-stack mb-3">
                              <div className="fw-semibold pe-10 text-gray-600 fs-7">
                                TAX 0%
                              </div>
                              <div className="text-end fw-bold fs-6 text-gray-800">
                                ₹ 0.00
                              </div>
                            </div>
                            <div className="d-flex flex-stack mb-3">
                              <div className="fw-semibold pe-10 text-gray-600 fs-7">
                                Discount 0%
                              </div>
                              <div className="text-end fw-bold fs-6 text-gray-800">
                                ₹ 0.00
                              </div>
                            </div>
                            <div className="d-flex flex-stack">
                              <div className="fw-semibold pe-10 text-gray-600 fs-7">
                                Total
                              </div>
                              <div className="text-end fw-bold fs-6 text-gray-800">
                                ₹ 20,600.00
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
