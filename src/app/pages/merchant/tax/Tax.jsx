import { useFormik } from "formik";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  addTaxApi,
  deleteTaxApi,
  getAllTaxApi,
  updateTaxApi,
} from "../../../services/merchant.service";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

const Tax = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [showAlert, setShowAlert] = useState(false);
  const [tempId, setTempId] = useState("");
  const [catId, setCatId] = useState("");
  const [tax, setTax] = useState([]);
  const [total, setTotal] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
    formik.resetForm();
    setSelectedImage(null);
  };

  const handlePageChange = (pageNumber) => {
    setPaginate({ ...paginate, page: pageNumber });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    console.log("file", event);
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!/^image\/(png|jpg|jpeg)$/.test(fileType)) {
        toast.error("Please select a valid image file (PNG, JPG, JPEG).");
        event.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = reader.result;
        console.log("baswe", base64String);
        setSelectedImage(base64String); // Set selected image when it's loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const taxSchema = Yup.object().shape({
    name: Yup.string().required("Tax name is required"),
    tax: Yup.number().required("Tax is required"),
  });

  const initialValues = {
    name: "",
    tax: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: taxSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let response;
        if (isEdit) {
          console.log("price", values);
          const payload = {
            taxId: values?.taxId,
          };
          if (values?.name) payload.name = values?.name;
          if (values?.tax) payload.tax = values?.tax;
          response = await updateTaxApi(payload);
        } else {
          const payload = {
            name: values?.name,
            tax: values?.tax,
          };
          console.log("val", values);
          response = await addTaxApi(payload);
        }
        console.log(values, selectedImage);

        if (response["ResponseCode"] == 1) {
          toast.success(response?.message);
          setShowModal(false);
          getAllTax();
        }
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getAllTax();
  }, [search, catId, paginate]);

  const getAllTax = async () => {
    setLoading(true);
    try {
      let payload = {
        ...paginate,
      };

      if (search) payload = { ...payload, search };
      const categoryData = await getAllTaxApi(payload);
      setTax(categoryData?.data?.taxDetails);
      setTotal(categoryData?.data?.total);
      console.log("product", categoryData);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleEdit = (el) => {
    setIsEdit(true);
    setSelectedImage(null);
    setShowModal(true);
    formik.setValues({
      name: el?.name,
      tax: el?.tax,
      taxId: el?._id,
    });
  };

  const deleteCategory = async () => {
    console.log("first", tempId);
    if (tempId) {
      let response = await deleteTaxApi(tempId);
      if (response["ResponseCode"] == 1) {
        toast.success(response?.message);
        setShowAlert(false);
        await getAllTax();
      }
    }
  };

  return (
    <>
      <div
        className="card card-custom card-stretch gutter-b mb-10"
        style={{ minHeight: "calc(100vh - 130px)" }}
      >
        <div className="card-header">
          <div className="card-title m-0 d-flex justify-content-between w-100">
            <h3 className="fw-bolder m-0 d-flex align-items-center">
              <p className="mb-0">All Tax [ {total} ]</p>
              {catId && (
                <div
                  className="card-toolbar ms-4"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-trigger="hover"
                  title="Click to show all tax"
                >
                  <a
                    onClick={() => {
                      setCatId("");
                      setPaginate({ ...paginate, page: 1 });
                      navigate("/merchant/product");
                    }}
                    className="btn btn-sm btn-light-primary py-2 cursor-pointer"
                  >
                    All tax
                  </a>
                </div>
              )}
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
                  placeholder="Search Tax"
                  onKeyUp={(e) => {
                    setPaginate({ ...paginate, page: 1 });
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a tax"
                onClick={() => {
                  handleOpenModal();
                  setIsEdit(false);
                }}
              >
                <a className="btn btn-sm btn-light-primary py-4 cursor-pointer">
                  <i className="ki-duotone ki-plus fs-3"></i>Add Tax
                </a>
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
                      No.
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Tax Name
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Tax Value
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
                  {tax.length &&
                    tax.map((el, index) => {
                      return (
                        <tr role="row" key={index}>
                          <td role="cell" className="text-capitalize">
                            {(paginate?.page - 1) * 10 + (index + 1)}
                          </td>
                          <td role="cell" className="">
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-column">
                                <a className="text-gray-800 text-hover-primary mb-1 text-capitalize cursor-pointer">
                                  {el?.name}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td role="cell" className="">
                            {el?.tax}%
                          </td>
                          <td role="cell" className="">
                            <div className="badge badge-light fw-bolder">
                              {moment(el?.createdAt).format("DD-MM-YYYY")}
                            </div>
                          </td>

                          <td
                            role="cell"
                            className="text-end min-w-100px d-flex justify-content-center"
                          >
                            <a
                              className="btn btn-light btn-active-light-primary btn-sm d-flex align-items-center cursor-pointer"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                              style={{ maxWidth: "100px" }}
                            >
                              Actions
                              <i className="ki-duotone ki-down fs-5 m-0 ms-2"></i>
                            </a>
                            <div
                              className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                              data-kt-menu="true"
                            >
                              <div className="menu-item px-3">
                                <a
                                  className="menu-link px-3"
                                  onClick={() => handleEdit(el)}
                                >
                                  Edit
                                </a>
                              </div>
                              <div className="menu-item px-3">
                                <a
                                  className="menu-link px-3"
                                  data-kt-users-table-filter="delete_row"
                                  onClick={() => {
                                    setShowAlert(true);
                                    setTempId(el?._id);
                                  }}
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {total > 12 && (
            <Pagination
              activePage={paginate?.page}
              itemsCountPerPage={paginate?.limit}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>

      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
        show={showModal}
        onHide={handleClose}
        backdrop={"static"}
      >
        <form
          className="form"
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          <div className="modal-header justify-content-between">
            <h2 className="m-0">{isEdit ? "Edit" : "Add"} Tax</h2>
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={handleClose}
            >
              <KTIcon className="fs-1" iconName="cross" iconType="solid" />
            </div>
          </div>

          <div className="modal-body py-lg-10 px-lg-10">
            <div className="row">
              <div className="col-12">
                <div className="card card-flush py-4 px-4 h-100 justify-content-between">
                  <div>
                    <div className="fv-row mb-8">
                      <input
                        placeholder="Enter Tax Name"
                        {...formik.getFieldProps("name")}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.name && formik.errors.name,
                          },
                          {
                            "is-valid":
                              formik.touched.name && !formik.errors.name,
                          }
                        )}
                        type="name"
                        name="name"
                        autoComplete="off"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="fv-row mb-8">
                      <input
                        placeholder="Enter Tax Value (in %)"
                        {...formik.getFieldProps("tax")}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.tax && formik.errors.tax,
                          },
                          {
                            "is-valid":
                              formik.touched.tax && !formik.errors.tax,
                          }
                        )}
                        type="text"
                        name="tax"
                        autoComplete="off"
                        onKeyPress={(event) => {
                          console.log("first", event.target.value);
                          if (
                            !/[0-9]/.test(event.key) ||
                            event.target.value.length >= 3
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                      {formik.touched.tax && formik.errors.tax && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.tax}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="reset"
                      onClick={() => handleClose()}
                      className="btn btn-light me-3"
                      data-kt-users-modal-action="cancel"
                      // disabled={formik.isSubmitting || isUserLoading}
                    >
                      Cancel
                    </button>

                    {isEdit ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-kt-users-modal-action="submit"
                      >
                        <span className="indicator-label">Update</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-kt-users-modal-action="submit"
                      >
                        <span className="indicator-label">Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {showAlert && (
        <SweetAlert
          warning
          title="Are you sure you want to delete?"
          customButtons={
            <React.Fragment>
              <Button
                variant="outlined btn btn-danger"
                onClick={() => setShowAlert(false)}
              >
                Cancel
              </Button>
              <Button
                className="ms-2 btn btn-primary"
                onClick={() => deleteCategory()}
              >
                Confirm
              </Button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </>
  );
};

export default Tax;
