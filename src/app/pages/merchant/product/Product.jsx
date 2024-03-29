import { useFormik } from "formik";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import product1 from "../../../../_metronic/assets/images/products/1.png";
import blackImage from "../../../../_metronic/assets/images/svg/files/blank-image.svg";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  addCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
  getAllProductsApi,
  updateCategoryApi,
} from "../../../services/merchant.service";
import SweetAlert from "react-bootstrap-sweetalert";

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [editableImage, setEditableImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tempId, setTempId] = useState("");

  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);

  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "In Active" },
  ];

  const handleOpenModal = () => {
    setShowModal(true);
    formik.resetForm();
    setSelectedImage(null);
    setEditableImage("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    console.log("file", event);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = reader.result;
        console.log("baswe", base64String);
        setSelectedImage(base64String); // Set selected image when it's loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const categorySchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
    image: !isEdit
      ? Yup.string().required("Profile image is required")
      : Yup.string(),
    description: Yup.string().required("Description is required"),
    status: Yup.object().required("Status is required"),
  });

  const initialValues = {
    name: "",
    image: "",
    description: "",
    status: null,
    categoryId: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let response;
        if (isEdit) {
          const payload = {
            categoryId: values?.categoryId,
          };
          if (values?.name) payload.name = values?.name;
          if (values?.description) payload.description = values?.description;
          if (values?.status) payload.status = values?.status?.value;
          if (selectedImage) payload.image = selectedImage;
          response = await updateCategoryApi(payload);
        } else {
          const payload = {
            name: values?.name,
            description: values?.description,
            status: values?.status?.value,
            image: selectedImage,
          };
          response = await addCategoryApi(payload);
        }
        console.log(values, selectedImage);

        if (response["ResponseCode"] == 1) {
          toast.success(response?.message);
          setShowModal(false);
          getAllProducts();
        }
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getAllProducts();
  }, [search]);

  const getAllProducts = async () => {
    try {
      const payload = {
        ...paginate,
      };
      if (search) payload.search = search;
      const categoryData = await getAllProductsApi(payload);
      setProducts(categoryData?.data?.productDetails);
      setTotal(categoryData?.data?.total);
      console.log("product", categoryData);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleEdit = (el) => {
    setIsEdit(true);
    setSelectedImage(null);
    console.log("el", el);
    setShowModal(true);
    formik.setValues({
      name: el?.name,
      description: el?.description,
      status:
        el?.status === "Active"
          ? { value: "Active", label: "Active" }
          : { value: "Inactive", label: "In Active" },
      categoryId: el?._id,
    });
    setEditableImage(el?.categoryImgUrl + el?.image);
    console.log("formic", formik.values);
  };

  const deleteCategory = async () => {
    console.log("first", tempId);
    if (tempId) {
      let response = await deleteCategoryApi(tempId);
      if (response["ResponseCode"] == 1) {
        toast.success(response?.message);
        await getAllProducts();
        setShowAlert(false);
      }
    }
  };
  return (
    <>
      <div className="card card-custom card-stretch gutter-b mb-10">
        <div className="card-header">
          <div class="card-title m-0 d-flex justify-content-between w-100">
            <h3 class="fw-bolder m-0">ALL Products [ {total} ]</h3>
            <div className="d-flex">
              <div class="d-flex align-items-center position-relative my-1 me-md-2">
                <i class="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  class="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Product"
                  onKeyUp={(e) => setSearch(e.target.value)}
                />
              </div>
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a user"
                onClick={() => {
                  handleOpenModal();
                  setIsEdit(false);
                }}
              >
                <a href="#" class="btn btn-sm btn-light-primary py-4">
                  <i class="ki-duotone ki-plus fs-3"></i>Add Product
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          <div class="card-body py-4">
            <div class="table-responsive">
              <table
                id="kt_table_users"
                class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                role="table"
              >
                <thead>
                  <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Name
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Role
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Last login
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Two steps
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Joined day
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      class="text-end min-w-100px"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold" role="rowgroup">
                  {products.length &&
                    products.map((el, index) => {
                      return (
                        <tr role="row">
                          <td role="cell" class="">
                            <div class="d-flex align-items-center">
                              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                                <a href="#">
                                  <div class="symbol-label fs-3 bg-light-danger text-danger">
                                    <img
                                      src={el?.productImageUrl + el?.image}
                                      alt="logo"
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </a>
                              </div>
                              <div class="d-flex flex-column">
                                <a
                                  href="#"
                                  class="text-gray-800 text-hover-primary mb-1 text-capitalize"
                                >
                                  {el?.name}
                                </a>
                                <span>melody@altbox.com</span>
                              </div>
                            </div>
                          </td>
                          <td role="cell" class="">
                            Analyst
                          </td>
                          <td role="cell" class="">
                            <div class="badge badge-light fw-bolder">
                              20 mins ago
                            </div>
                          </td>
                          <td role="cell" class="">
                            {" "}
                            <div class="badge badge-light-success fw-bolder">
                              Active
                            </div>
                          </td>
                          <td role="cell" class="">
                            10 Nov 2022, 8:43 pm
                          </td>
                          <td role="cell" class="text-end min-w-100px">
                            <a
                              href="#"
                              class="btn btn-light btn-active-light-primary btn-sm"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                            >
                              Actions<i class="ki-duotone ki-down fs-5 m-0"></i>
                            </a>
                            <div
                              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                              data-kt-menu="true"
                            >
                              <div class="menu-item px-3">
                                <a class="menu-link px-3">Edit</a>
                              </div>
                              <div class="menu-item px-3">
                                <a
                                  class="menu-link px-3"
                                  data-kt-users-table-filter="delete_row"
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
            <h2 className="m-0">{isEdit ? "Edit" : "Add"} Category</h2>
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={handleClose}
            >
              <KTIcon className="fs-1" iconName="cross" iconType="solid" />
            </div>
          </div>

          <div className="modal-body py-lg-10 px-lg-10">
            <div className="row">
              <div className="col-12 col-sm-4">
                <div class="card card-flush py-4 h-100">
                  <div class="card-header">
                    <div class="card-title">
                      <h2>Thumbnail</h2>
                    </div>
                  </div>

                  <div class="card-body text-center pt-0">
                    <div
                      class="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                      data-kt-image-input="true"
                      style={{
                        backgroundImage: `url(${
                          selectedImage || editableImage || blackImage
                        })`,
                      }}
                    >
                      <div class="image-input-wrapper w-150px h-150px"></div>

                      <label
                        class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        aria-label="Change avatar"
                        data-bs-original-title="Change avatar"
                        data-kt-initialized="1"
                      >
                        <i class="ki-duotone ki-pencil fs-7">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>

                        <input
                          type="file"
                          name="avatar"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => {
                            console.log("e", e.target.files[0]);
                            formik.setFieldValue("image", e.target.files[0]);
                            handleImageChange(e);
                          }}
                        />
                        <input type="hidden" name="avatar_remove" />
                      </label>

                      <span
                        class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="cancel"
                        data-bs-toggle="tooltip"
                        aria-label="Cancel avatar"
                        data-bs-original-title="Cancel avatar"
                        data-kt-initialized="1"
                      >
                        <i class="ki-duotone ki-cross fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>{" "}
                      </span>

                      <span
                        class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        aria-label="Remove avatar"
                        data-bs-original-title="Remove avatar"
                        data-kt-initialized="1"
                      >
                        <i class="ki-duotone ki-cross fs-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>{" "}
                      </span>
                    </div>

                    <div class="text-muted fs-7">
                      Set the category thumbnail image. Only *.png, *.jpg and
                      *.jpeg image files are accepted
                    </div>
                    {formik.touched.image && formik.errors.image && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.image}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div class="card card-flush py-4 px-4 h-100 justify-content-between">
                  <div>
                    <div className="fv-row mb-8">
                      <input
                        placeholder="Category Name"
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
                      <textarea
                        placeholder="Description"
                        {...formik.getFieldProps("description")}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.description &&
                              formik.errors.description,
                          },
                          {
                            "is-valid":
                              formik.touched.description &&
                              !formik.errors.description,
                          }
                        )}
                        type="text"
                        name="description"
                        autoComplete="off"
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">
                                {formik.errors.description}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                    <Select
                      theme={"dark"}
                      type="select"
                      placeholder={"Select Status"}
                      options={options}
                      onChange={(option) => {
                        formik.setFieldValue("status", option);
                      }}
                      value={formik.values.status}
                      className={clsx(
                        "form-control bg-transparent beh-select",
                        {
                          "is-invalid":
                            formik.touched.status && formik.errors.status,
                        },
                        {
                          "is-valid":
                            formik.touched.status && !formik.errors.status,
                        }
                      )}
                    />
                    {formik.touched.status && formik.errors.status && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.status}</span>
                        </div>
                      </div>
                    )}
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
                        <span className="indicator-label">Submit</span>
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

export default Product;
