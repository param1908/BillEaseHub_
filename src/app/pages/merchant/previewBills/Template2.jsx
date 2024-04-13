import React from "react";

const Template2 = () => {
  return (
    <>
      <div id="kt_app_content_container" className="container-xxl p-0">
        <div className="card-body p-0">
          <div className=" w-100">
            <div className="d-flex justify-content-between flex-column flex-sm-row mb-19">
              <h4 className="fw-bolder text-gray-800 fs-2qx pe-5 pb-7">
                INVOICE
              </h4>
              <div className="text-sm-end">
                <a href="#">
                  <img
                    alt="Logo"
                    src="assets/media/svg/brand-logos/duolingo.svg"
                  />
                </a>
                <div className="text-sm-end fw-semibold fs-4 text-muted mt-7">
                  <div>Cecilia Chapman, 711-2880 Nulla St, Mankato</div>
                  <div>Mississippi 96522</div>
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
                    <p className="fs-6 text-gray-800 fw-semibold">
                      Iris Watson.
                    </p>
                  </div>
                  <div className="d-flex">
                    <p className="text-gray-600 fs-6 fw-semibold me-2">
                      Phone :
                    </p>
                    <p className="fs-6 text-gray-800 fw-semibold">1234567890</p>
                  </div>{" "}
                  <div className="d-flex mb-8">
                    <p className="text-gray-600 fs-6 fw-semibold me-2">
                      Email :
                    </p>
                    <p className="fs-6 text-gray-800 fw-semibold">
                      test@yopmail.com
                    </p>
                  </div>
                  <div className="text-gray-600 fs-6 fw-semibold mb-3">
                    INVOICE NO.
                  </div>
                  <div className="fs-6 text-gray-800 fw-semibold mb-8">
                    56758
                  </div>
                  <div className="text-gray-600 fs-6 fw-semibold mb-3">
                    INVOICE DATE
                  </div>
                  <div className="fs-6 text-gray-800 fw-semibold">
                    12 May, 2020
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <div className="flex-grow-1 pt-8 mb-13">
                  <div className="table-responsive border-bottom mb-14">
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
                        <tr className="fw-bold text-gray-700 fs-5 text-end">
                          <td className="d-flex align-items-center pt-11">
                            <i className="fa fa-genderless text-danger fs-1 me-2"></i>
                            Phone - Vivo
                          </td>
                          <td className="pt-11">80</td>
                          <td className="pt-11">₹40.00</td>
                          <td className="pt-11 fs-5 pe-lg-6 text-dark fw-bolder">
                            ₹3200.00
                          </td>
                        </tr>
                        <tr className="fw-bold text-gray-700 fs-5 text-end">
                          <td className="d-flex align-items-center">
                            <i className="fa fa-genderless text-success fs-1 me-2"></i>
                            Keyboard - Gaming
                          </td>
                          <td>120</td>
                          <td>₹40.00</td>
                          <td className="fs-5 text-dark fw-bolder pe-lg-6">
                            ₹4800.00
                          </td>
                        </tr>
                        <tr className="fw-bold text-gray-700 fs-5 text-end">
                          <td className="d-flex align-items-center pb-10">
                            <i className="fa fa-genderless text-primary fs-1 me-2"></i>
                            Phone - I Phone 15 Pro Max
                          </td>
                          <td>210</td>
                          <td>₹60.00</td>
                          <td className="fs-5 text-dark fw-bolder pe-lg-6">
                            ₹12600.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end">
                    <div className="fs-3 fw-bold text-muted mb-3">
                      TOTAL AMOUNT
                    </div>
                    <div className="fs-xl-2x fs-2 fw-bolder">₹20,600.00</div>
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
