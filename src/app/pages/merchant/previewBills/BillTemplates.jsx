import React, { useState, useEffect } from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { useLocation, useNavigate } from "react-router-dom";
import { createBillTemplateApi } from "../../../services/merchant.service";
import { toast } from "react-toastify";
import clsx from "clsx";
import MainLoader from "../../../loaders/MainLoader";

const BillTemplates = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");
  const [isShowTemplateSelection, setIsShowTemplateSelection] = useState(false);

  useEffect(() => {
    if (data?.isShowTemplateSelection) {
      setIsShowTemplateSelection(data?.isShowTemplateSelection);
      setSelectedTemplate(data?.templateId);
    }
  }, []);

  const sendInvoice = async () => {
    setLoading(true);
    try {
      const prepareObject = {
        email: data.email,
        phone: data?.phone,
        name: data?.name,
        paymentMethod: data?.paymentMethod?.label,
        discount: Number(data?.addDiscount),
        subTotal: Number(data?.subTotalCount),
        total: Number(data?.total),
        notes: data?.notes,
        templateId: selectedTemplate,
        billDate: data?.invoiceDate,
        discountCount: Number(data?.discountCount),
        products: [],
        taxFields: [],
      };
      if (data?.products?.length) {
        data?.products?.forEach((el) => {
          prepareObject.products.push({
            categoryName: el?.category?.label,
            productName: el?.product?.label,
            productquantity: Number(el?.quantity),
            productprice: Number(el?.price),
            productTotal: Number(el?.total),
          });
        });
      }
      if (data?.taxFields?.length) {
        data?.taxFields?.forEach((el) => {
          prepareObject.taxFields.push({
            taxName: el?.name?.label,
            value: Number(el?.name?.tax),
            totalTaxCount: Number(el?.totalTaxCount),
          });
        });
      }
      let response = await createBillTemplateApi(prepareObject);
      if (response["ResponseCode"] == 1) {
        toast.success(response?.message);
        navigate("/merchant/invoices");
      }
      setLoading(false);
      if (data.email) prepareObject.email = data.email;
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        <div
          className={clsx(
            "col-12 col-lg-9 h-auto mb-5",
            data?.isShowTemplateSelection && "col-lg-12"
          )}
        >
          <div className="card">
            <div className="car-body p-12">
              {selectedTemplate === "Template1" && (
                <Template1 templateData={data} />
              )}
              {selectedTemplate === "Template2" && (
                <Template2 templateData={data} />
              )}
              {selectedTemplate === "Template3" && (
                <Template3 templateData={data} />
              )}
            </div>
          </div>
        </div>
        {!isShowTemplateSelection && (
          <div className="col-12 col-lg-3">
            <div
              className="card w-100 sticky-top"
              style={{ top: "97px", zIndex: 1 }}
            >
              <div className="card-body p-10">
                <div className="d-flex flex-column">
                  <h3 className="card-title mb-5 text-gray-900 fw-bold fs-3">
                    Select Template
                  </h3>
                  <div className="separator separator-dashed mb-8"></div>
                  <ul className="nav nav-tabs nav-pills flex-row border-0 flex-md-column mb-5 fs-6 min-w-lg-200px">
                    <li
                      className="nav-item w-100 me-0 mb-5"
                      onClick={() => {
                        setSelectedTemplate("Template1");
                      }}
                    >
                      <a
                        className="nav-link w-100 active btn btn-flex btn-active-light-success border border-success-subtle text-success"
                        data-bs-toggle="tab"
                        href="#kt_vtab_pane_4"
                      >
                        <span className="svg-icon fs-2">
                          <svg>...</svg>
                        </span>
                        <span className="d-flex flex-column align-items-start">
                          <span className="fs-4 fw-bold">Template 1</span>
                          <span className="fs-7">Description</span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="nav-item w-100 me-0 mb-5"
                      onClick={() => {
                        setSelectedTemplate("Template2");
                      }}
                    >
                      <a
                        className="nav-link w-100 btn btn-flex btn-active-light-info border border-info-subtle text-info"
                        data-bs-toggle="tab"
                        href="#kt_vtab_pane_5"
                      >
                        <span className="svg-icon fs-2">
                          <svg>...</svg>
                        </span>
                        <span className="d-flex flex-column align-items-start">
                          <span className="fs-4 fw-bold">Template 2</span>
                          <span className="fs-7">Description</span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="nav-item w-100"
                      onClick={() => {
                        setSelectedTemplate("Template3");
                      }}
                    >
                      <a
                        className="nav-link w-100 btn btn-flex btn-active-light-warning border border-warning-subtle text-warning"
                        data-bs-toggle="tab"
                        href="#kt_vtab_pane_6"
                      >
                        <span className="svg-icon fs-2">
                          <svg>...</svg>
                        </span>
                        <span className="d-flex flex-column align-items-start">
                          <span className="fs-4 fw-bold">Template 3</span>
                          <span className="fs-7">Description</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="separator separator-dashed mt-3 mb-8"></div>
                  <a
                    className="btn btn-primary mb-4 p-3 cursor-pointer"
                    onClick={() => sendInvoice()}
                  >
                    <span className="svg-icon svg-icon-3 me-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z"
                          fill="currentColor"
                        />
                        <path
                          opacity="0.3"
                          d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    Send Invoice
                  </a>

                  <a
                    className="btn btn-secondary btn-color-gray-700 p-3 cursor-pointer"
                    onClick={() => navigate("/merchant/generate-invoice")}
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && <MainLoader />}
    </>
  );
};

export default BillTemplates;
