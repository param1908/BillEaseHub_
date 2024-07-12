import clsx from "clsx";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthHeader } from "../../../../Axios.api";
import { KTIcon } from "../../../../_metronic/helpers";
import { login, registerApi } from "../../../services/auth.service";
import {
  allowNumber,
  getUserDetailsByToken,
} from "../../../services/common.service";
import { storeUserDetails } from "../../../store/slice/user.slice";
import { useDispatch } from "react-redux";

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  companyName?: string;
  companyURL?: string;
  GSTIN?: string;
  password?: string;
  confirmPassword?: string;
}

export function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isForm, setIsForm] = useState(false);

  const commonSchema = {
    fullName: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    location: Yup.string(),
    companyName: Yup.string(),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .max(20, "Maximum 20 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  };

  const registrationSchema = (accountType: string) => {
    if (accountType !== "C") {
      return Yup.object().shape({
        ...commonSchema,
        location: Yup.string().required("Location is required"),
        companyName: Yup.string().required("Company name is required"),
      });
    } else {
      return Yup.object().shape({
        ...commonSchema,
      });
    }
  };

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    companyName: "",
    companyURL: "",
    GSTIN: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema(accountType),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
        const { confirmPassword, ...formData } = values;
        const response = await registerApi({ ...formData, role: accountType });
        if (response.success) {
          toast.success(response?.message);
          navigate("/auth/login");
        }
      } catch (error) {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const renderInput = (name: keyof FormErrors, label: string, type: string) => {
    return (
      <div className="fv-row mb-8">
        <input
          placeholder={label}
          {...formik.getFieldProps(name)}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched[name] && formik.errors[name] },
            { "is-valid": formik.touched[name] && !formik.errors[name] }
          )}
          type={type}
          name={name}
          autoComplete="off"
          onKeyPress={(event) => {
            allowNumber(event, label);
          }}
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors[name]}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {!isForm ? (
        <Formik
          initialValues={{ accountType: "M" }}
          onSubmit={(values, actions) => {
            setIsForm(true);
            setAccountType(values?.accountType);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="w-100">
                <div className="pb-10 pb-lg-15">
                  <h2 className="fw-bolder d-flex align-items-center text-dark">
                    Choose Account Type
                    <i
                      className="fas fa-exclamation-circle ms-2 fs-7"
                      data-bs-toggle="tooltip"
                      title="Billing is issued based on your selected account type"
                    ></i>
                  </h2>

                  <div className="text-gray-400 fw-bold fs-6">
                    If you need more info, please check out
                    <a href="/dashboard" className="link-primary fw-bolder">
                      {" "}
                      Help Page
                    </a>
                    .
                  </div>
                </div>

                <div className="fv-row">
                  <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                      <Field
                        type="radio"
                        className="btn-check"
                        name="accountType"
                        value="M"
                        id="kt_create_account_form_account_type_corporate"
                      />
                      <label
                        className="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                        htmlFor="kt_create_account_form_account_type_corporate"
                      >
                        <KTIcon iconName="briefcase" className="fs-3x me-5" />

                        <span className="d-block fw-bold text-start">
                          <span className="text-dark fw-bolder d-block fs-4 mb-2">
                            Merchant Account
                          </span>
                          <span className="text-gray-400 fw-bold fs-6">
                            Create merchant account to manage customers bills
                          </span>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <Field
                        type="radio"
                        className="btn-check"
                        name="accountType"
                        value="C"
                        id="kt_create_account_form_account_type_personal"
                      />
                      <label
                        className="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
                        htmlFor="kt_create_account_form_account_type_personal"
                      >
                        <KTIcon
                          iconName="address-book"
                          className="fs-3x me-5"
                        />

                        <span className="d-block fw-bold text-start">
                          <span className="text-dark fw-bolder d-block fs-4 mb-2">
                            Customer Account
                          </span>
                          <span className="text-gray-400 fw-bold fs-6">
                            If you need more info, please check it out
                          </span>
                        </span>
                      </label>
                    </div>

                    <div className="text-danger mt-2">
                      <ErrorMessage name="accountType" />
                    </div>
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      <div className="text-gray-500 text-center fw-semibold fs-6">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="link-primary">
                          Login
                        </Link>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary mx-auto mx-md-0 ms-md-auto"
                      >
                        <span className="indicator-label">
                          Continue
                          <KTIcon
                            iconName="arrow-right"
                            className="fs-3 ms-2 me-0"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <div>
          <form
            className="form w-lg-500px"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            {/* begin::Heading */}
            <div className="text-center mb-11">
              <h1 className="text-dark fw-bolder mb-3">
                {accountType === "M" ? "Merchant" : "Customer"} Sign Up
              </h1>
            </div>
            {/* begin::Heading */}

            {renderInput("fullName", "Full Name", "text")}
            {renderInput("phoneNumber", "Phone", "text")}
            {accountType !== "C" && renderInput("location", "Address", "text")}
            {renderInput("email", "Email", "email")}
            {accountType !== "C" &&
              renderInput("companyName", "Shop/Company Name", "text")}
            {accountType !== "C" &&
              renderInput(
                "companyURL",
                "Shop/Company website URL (optional)",
                "text"
              )}
            {accountType !== "C" &&
              renderInput("GSTIN", "GSTIN (optional)", "text")}
            {renderInput("password", "Password", "password")}
            {renderInput("confirmPassword", "Confirm Password", "password")}

            {/* begin::Action */}
            <div className="d-grid mb-7 mt-10">
              <button
                type="submit"
                id="kt_sign_in_submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className="indicator-label">Continue</span>}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
            {/* end::Action */}

            <div className="text-gray-500 text-center fw-semibold fs-6">
              Already have an account?{" "}
              <Link to="/auth/login" className="link-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
