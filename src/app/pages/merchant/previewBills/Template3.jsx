import React from "react";

const Template3 = () => {
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
                <a href="#" className="d-block mw-150px ms-sm-auto">
                  <img
                    alt="Logo"
                    src="assets/media/svg/brand-logos/lloyds-of-london-logo.svg"
                    className="w-100"
                  />
                </a>
                <div className="text-sm-end fw-semibold fs-4 text-muted mt-7">
                  <div>Cecilia Chapman, 711-2880 Nulla St, Mankato</div>
                  <div>Mississippi 96522</div>
                </div>
              </div>
            </div>
            <div className="pb-12">
              <div className="d-flex flex-column gap-7 gap-md-10">
                <div className="fw-bold fs-2">
                  Dear Olivia Wild
                  <span className="fs-6">(olivia@corpmail.com)</span>,
                  <br />
                  <span className="text-muted fs-5">
                    Here are your order details. We thank you for your purchase.
                  </span>
                </div>
                <div className="separator"></div>
                <div className="d-flex flex-column flex-sm-row gap-7 gap-md-10 fw-bold">
                  <div className="flex-root d-flex flex-column">
                    <span className="text-muted">Invoice Date</span>
                    <span className="fs-5">14 July, 2022</span>
                  </div>
                  <div className="flex-root d-flex flex-column">
                    <span className="text-muted">Invoice ID</span>
                    <span className="fs-5">#INV-000414</span>
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
                      <p className="text-gray-600 fw-semibold me-2">
                        Name :
                      </p>
                      <p className="fs-6 text-gray-800 fw-semibold">
                        Iris Watson.
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-gray-600 fw-semibold me-2">
                        Phone :
                      </p>
                      <p className="fs-6 text-gray-800 fw-semibold">
                        1234567890
                      </p>
                    </div>{" "}
                    <div className="d-flex mb-8">
                      <p className="text-gray-600 fw-semibold me-2">
                        Email :
                      </p>
                      <p className="fs-6 text-gray-800 fw-semibold">
                        test@yopmail.com
                      </p>
                    </div>
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
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <a
                                href="../../demo1/dist/apps/ecommerce/catalog/edit-product.html"
                                className="symbol symbol-50px"
                              ></a>
                              <div className="ms-5">
                                <div className="fw-bold">Phone</div>
                                <div className="fs-7 text-muted">
                                  I Phone 15 Pro Max
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">2</td>
                          <td className="text-end">₹1,50,000</td>
                          <td className="text-end">₹240.00</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <a
                                href="../../demo1/dist/apps/ecommerce/catalog/edit-product.html"
                                className="symbol symbol-50px"
                              ></a>
                              <div className="ms-5">
                                <div className="fw-bold">Keyboard</div>
                                <div className="fs-7 text-muted">
                                  Zebronics Gaming Keyboard
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-end">1</td>
                          <td className="text-end">₹10,000</td>
                          <td className="text-end">₹24.00</td>
                        </tr>
                        <tr>
                          <td colspan="3" className="text-end">
                            Subtotal
                          </td>
                          <td className="text-end">₹264.00</td>
                        </tr>
                        <tr>
                          <td colspan="3" className="text-end">
                            TAX (0%)
                          </td>
                          <td className="text-end">₹0.00</td>
                        </tr>
                        <tr>
                          <td colspan="3" className="text-end">
                            Discount (0%)
                          </td>
                          <td className="text-end">₹0.00</td>
                        </tr>
                        <tr>
                          <td
                            colspan="3"
                            className="fs-3 text-dark fw-bold text-end"
                          >
                            Grand Total
                          </td>
                          <td className="text-dark fs-3 fw-bolder text-end">
                            ₹269.00
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
