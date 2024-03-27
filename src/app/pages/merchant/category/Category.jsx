import clsx from "clsx";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import Select from "react-select";
import product1 from "../../../../_metronic/assets/images/products/1.png";
import blackImage from "../../../../_metronic/assets/images/svg/files/blank-image.svg";
import { KTIcon } from "../../../../_metronic/helpers";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleOpenModal = () => {
    setShowModal(true);
    formik.resetForm();
    setSelectedImage(null);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result); // Set selected image when it's loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const categorySchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
    image: Yup.string().url("Image must be a valid URL"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    name: "",
    image: "",
    description: "",
    status: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="card card-custom card-stretch gutter-b mb-10">
        <div className="card-header">
          <div class="card-title m-0 d-flex justify-content-between w-100">
            <h3 class="fw-bolder m-0">ALL Categories [ ]</h3>
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
                  // value=""
                />
              </div>
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a user"
                onClick={() => handleOpenModal()}
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
            <div class="col-md-3 col-xxl-3 col-lg-12">
              <div class="card card-custom card-shadowless">
                <div class="card-body p-0">
                  <div class="overlay">
                    <div class="overlay-wrapper rounded bg-light text-center">
                      <img src={product1} alt="" class="mw-100 w-200px" />
                    </div>
                    <div class="overlay-layer">
                      <a
                        href="#"
                        class="btn btn-light-primary font-weight-bolder py-2 font-size-sm me-2"
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        class="btn font-weight-bolder btn-sm btn-light-primary"
                      >
                        Delete
                      </a>
                    </div>
                  </div>

                  <div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">
                    <a
                      href="#"
                      class="font-size-h5 font-weight-bolder text-dark-75 text-hover-primary mb-1"
                    >
                      Smart Watches
                    </a>
                    <span class="font-size-lg">
                      Outlines keep poorly thought
                    </span>
                  </div>
                </div>
              </div>
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
            <h2 className="m-0">Add Category</h2>
            {/* begin::Close */}
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={handleClose}
            >
              <KTIcon className="fs-1" iconName="cross" iconType="solid" />
            </div>
            {/* end::Close */}
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
                        backgroundImage: `url(${selectedImage || blackImage})`,
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
                          onChange={(e) => handleImageChange(e)}
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
                    theme={'dark'}
                    placeholder={"Select Status"} options={options} />
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

                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-kt-users-modal-action="submit"
                      // disabled={
                      //   isUserLoading ||
                      //   formik.isSubmitting ||
                      //   !formik.isValid ||
                      //   !formik.touched
                      // }
                    >
                      <span className="indicator-label">Submit</span>
                      {/* {(formik.isSubmitting || isUserLoading) && (
                <span className="indicator-progress">
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )} */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Category;
