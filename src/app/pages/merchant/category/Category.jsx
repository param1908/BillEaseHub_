import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import blackImage from "../../../../_metronic/assets/images/svg/files/blank-image.svg";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  addCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi,
} from "../../../services/merchant.service";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import MainLoader from "../../../loaders/MainLoader";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [editableImage, setEditableImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tempId, setTempId] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const handlePageChange = (pageNumber) => {
    setPaginate({ ...paginate, page: pageNumber });
    // getAllCategories({ ...paginate, page: pageNumber });
  };

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
      ? Yup.string().required("Category image is required")
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
          getAllCategories();
        }
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    !search && setLoading(true);
    getAllCategories();
  }, [search, paginate]);

  const getAllCategories = async () => {
    try {
      let payload = {
        ...paginate,
      };
      // if (paginateData) payload = { ...paginateData };
      if (search) payload = { ...paginate, search };
      const categoryData = await getAllCategoriesApi(payload);
      setCategories(categoryData?.data?.categoryDetails);
      setTotal(categoryData?.data?.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        await getAllCategories();
        setShowAlert(false);
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
          <div class="card-title m-0 d-flex justify-content-between w-100">
            <h3 class="fw-bolder m-0">ALL Categories [ {total} ]</h3>
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
                  placeholder="Search Category"
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
                title="Click to add a category"
                onClick={() => {
                  handleOpenModal();
                  setIsEdit(false);
                }}
              >
                <a href="#" class="btn btn-sm btn-light-primary py-4">
                  <i class="ki-duotone ki-plus fs-3"></i>Add Category
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          <div className="row">
            {categories.length &&
              categories.map((el, index) => {
                return (
                  <div class="col-md-3 col-xxl-3 col-lg-12 mb-5" key={index}>
                    <div class="card card-custom card-shadowless h-100">
                      <div class="card-body p-0">
                        <div class="overlay">
                          <div class="overlay-wrapper rounded bg-light text-center">
                            <img
                              src={el.categoryImgUrl + el.image}
                              alt=""
                              style={{ width: "200px", height: "150px" }}
                            />
                          </div>
                          <div class="overlay-layer">
                            <a
                              class="btn btn-light-primary font-weight-bolder py-2 font-size-sm me-2 cursor-pointer"
                              onClick={() => {
                                handleEdit(el);
                              }}
                            >
                              Edit
                            </a>
                            <a
                              class="btn font-weight-bolder btn-sm btn-light-primary cursor-pointer"
                              onClick={() => {
                                setShowAlert(true);
                                setTempId(el?._id);
                              }}
                            >
                              Delete
                            </a>
                          </div>
                        </div>

                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              <strong> {el?.description}</strong>
                            </Tooltip>
                          }
                        >
                          <div
                            class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/merchant/product?category=${el?._id}&name=${el?.name}`
                              )
                            }
                          >
                            <a
                              href="#"
                              class="font-size-h5 font-weight-bolder text-dark-75 text-hover-primary mb-1"
                            >
                              {el?.name}
                            </a>
                            <span class="font-size-lg">
                              {el?.description?.length > 70
                                ? el?.description?.slice(0, 70) + "...."
                                : el?.description}
                            </span>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      {loading && <MainLoader />}
    </>
  );
};

export default Category;
