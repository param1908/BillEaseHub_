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
  addProductApi,
  deleteProductApi,
  getAllCategoriesApi,
  getAllProductsApi,
  updateProductApi,
} from "../../../services/merchant.service";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import MainLoader from "../../../loaders/MainLoader";

const Product = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [paginate, setPaginate] = useState({ limit: 12, page: 1 });
  const [editableImage, setEditableImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tempId, setTempId] = useState("");
  const [catId, setCatId] = useState("");
  const [catName, setCatName] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const options = [
    { value: "Active", label: "In Stock" },
    { value: "Inactive", label: "Out Of Stock" },
  ];
  const [catOptions, setCatOptions] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
    formik.resetForm();
    setSelectedImage(null);
    setEditableImage("");
  };

  useEffect(() => {
    getCategories();
  }, [catId]);

  const handlePageChange = (pageNumber) => {
    setPaginate({ ...paginate, page: pageNumber });
  };

  const getCategories = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchValue = searchParams.get("category");
    const payload = {
      sortBy: "name",
      sortOrder: "asc",
    };
    const categoryData = await getAllCategoriesApi(payload);
    console.log("data", categoryData);
    let catData = categoryData?.data?.categoryDetails.map((el) => {
      return { value: el._id, label: el.name };
    });
    if (searchValue) {
      catData = catData.filter((el) => el.value === searchValue);
    }
    setCatOptions(catData);
    console.log("catData", catData);
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

  const categorySchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    image: !isEdit
      ? Yup.string().required("Product image is required")
      : Yup.string(),
    description: Yup.string().required("Description is required"),
    status: Yup.object().required("Status is required"),
    category: Yup.object().required("Category is required"),
    price: Yup.string().required("Price is required"),
  });

  const initialValues = {
    name: "",
    image: "",
    description: "",
    status: null,
    category: "",
    price: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let response;
        if (isEdit) {
          console.log("price", values);
          const payload = {
            productId: values?.productId,
          };
          if (values?.name) payload.name = values?.name;
          if (values?.description) payload.description = values?.description;
          if (values?.status) payload.status = values?.status?.value;
          if (values?.price) payload.price = String(values?.price);
          if (values?.category) payload.categoryId = values?.category?.value;
          if (selectedImage) payload.image = selectedImage;
          response = await updateProductApi(payload);
        } else {
          const payload = {
            name: values?.name,
            description: values?.description,
            status: values?.status?.value,
            price: String(values?.price),
            categoryId: values?.category?.value,
            image: selectedImage,
          };
          console.log("val", values);
          response = await addProductApi(payload);
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
    !search && setLoading(true);
    getAllProducts();
  }, [search, catId, paginate]);

  const getAllProducts = async () => {
    try {
      let payload = {
        ...paginate,
      };
      const searchParams = new URLSearchParams(window.location.search);
      const searchValue = searchParams.get("category");
      if (searchValue) {
        console.log("searchValue", searchValue);
        setCatId(searchValue);
        setCatName(searchParams.get("name"));
      }
      if (searchValue) payload = { ...payload, categoryId: searchValue };
      if (search) payload = { ...payload, search };
      const productData = await getAllProductsApi(payload);
      setProducts(productData?.data?.productDetails);
      setTotal(productData?.data?.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("err", error);
    }
  };

  const handleEdit = (el) => {
    let cat = catOptions.find((obj) => obj.value === el.categoryData._id);
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
      category: cat,
      price: String(el?.price),
      productId: el?._id,
    });
    setEditableImage(el?.productImageUrl + el?.image);
  };

  const deleteCategory = async () => {
    console.log("first", tempId);
    if (tempId) {
      let response = await deleteProductApi(tempId);
      if (response["ResponseCode"] == 1) {
        toast.success(response?.message);
        setShowAlert(false);
        await getAllProducts();
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
            <h3 class="fw-bolder m-0 d-flex align-items-center">
              <p className="mb-0">
                {catId ? catName + "'s" : "ALL"} Products [ {total} ]
              </p>
              {catId && (
                <div
                  className="card-toolbar ms-4"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-trigger="hover"
                  title="Click to show all products"
                >
                  <a
                    onClick={() => {
                      setCatId("");
                      setPaginate({ ...paginate, page: 1 });
                      navigate("/merchant/product");
                    }}
                    class="btn btn-sm btn-light-primary py-2 cursor-pointer"
                  >
                    All Products
                  </a>
                </div>
              )}
            </h3>
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
                title="Click to add a product"
                onClick={() => {
                  handleOpenModal();
                  setIsEdit(false);
                }}
              >
                <a class="btn btn-sm btn-light-primary py-4 cursor-pointer">
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
                      Product
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      DESCRIPTION
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Price
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Category
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      CREATED DATE
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Status
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      class="text-center min-w-100px"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold" role="rowgroup">
                  {products.length &&
                    products.map((el, index) => {
                      return (
                        <tr role="row" key={index}>
                          <td role="cell" class="">
                            <div class="d-flex align-items-center">
                              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                                <a>
                                  <div class="symbol-label fs-3 bg-light-danger text-danger cursor-pointer">
                                    <img
                                      src={el?.productImageUrl + el?.image}
                                      alt="logo"
                                      style={{ width: "100%" }}
                                    />
                                  </div>
                                </a>
                              </div>
                              <div class="d-flex flex-column">
                                <a class="text-gray-800 text-hover-primary mb-1 text-capitalize cursor-pointer">
                                  {el?.name}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td role="cell" class="">
                            {el.description?.length > 70
                              ? el.description?.slice(0, 70) + "...."
                              : el.description}
                          </td>
                          <td role="cell" class="text-capitalize">
                            {el?.price}
                          </td>
                          <td role="cell" class="text-capitalize">
                            {el?.categoryData?.name}
                          </td>
                          <td role="cell" class="">
                            <div class="badge badge-light fw-bolder">
                              {moment(el?.createdAt).format("DD-MM-YYYY")}
                            </div>
                          </td>
                          <td role="cell" class="">
                            {" "}
                            {el?.status == "Active" ? (
                              <div class="badge badge-light-success fw-bolder">
                                In Stock
                              </div>
                            ) : (
                              <div class="badge badge-light-danger fw-bolder">
                                Out Of Stock
                              </div>
                            )}
                          </td>

                          <td role="cell" class="text-end min-w-100px">
                            <a
                              class="btn btn-light btn-active-light-primary btn-sm d-flex align-items-center cursor-pointer"
                              data-kt-menu-trigger="click"
                              data-kt-menu-placement="bottom-end"
                            >
                              Actions
                              <i class="ki-duotone ki-down fs-5 m-0 ms-2"></i>
                            </a>
                            <div
                              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                              data-kt-menu="true"
                            >
                              <div class="menu-item px-3">
                                <a
                                  class="menu-link px-3"
                                  onClick={() => handleEdit(el)}
                                >
                                  Edit
                                </a>
                              </div>
                              <div class="menu-item px-3">
                                <a
                                  class="menu-link px-3"
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
            <h2 className="m-0">{isEdit ? "Edit" : "Add"} Product</h2>
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
                      Set the product thumbnail image. Only *.png, *.jpg and
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
                    <div className="fv-row mb-8">
                      <input
                        placeholder="Price"
                        {...formik.getFieldProps("price")}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.price && formik.errors.price,
                          },
                          {
                            "is-valid":
                              formik.touched.price && !formik.errors.price,
                          }
                        )}
                        type="text"
                        name="price"
                        autoComplete="off"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.price}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <Select
                        theme={"dark"}
                        type="select"
                        placeholder={"Select Category"}
                        options={catOptions}
                        onChange={(option) => {
                          formik.setFieldValue("category", option);
                        }}
                        value={formik.values.category}
                        className={clsx(
                          "form-control bg-transparent beh-select",
                          {
                            "is-invalid":
                              formik.touched.category && formik.errors.category,
                          },
                          {
                            "is-valid":
                              formik.touched.category &&
                              !formik.errors.category,
                          }
                        )}
                      />
                      {formik.touched.category && formik.errors.category && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.category}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-8">
                      {" "}
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

export default Product;
