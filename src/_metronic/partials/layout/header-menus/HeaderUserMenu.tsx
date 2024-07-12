/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../app/modules/auth";
import { Languages } from "./Languages";
import { toAbsoluteUrl } from "../../../helpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const HeaderUserMenu: FC = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: any) => state.user);
  console.log("ud", userDetails);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout successfully");
    navigate("/auth/login", { replace: true });
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            {userDetails?.user?.merchantData?.logo ? (
              <img
                alt="Logo"
                src={
                  userDetails?.user?.imageUrl +
                  userDetails?.user?.merchantData?.logo
                }
              />
            ) : (
              <div
                className="text-uppercase d-flex justify-content-center align-items-center"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "8px",
                  backgroundColor: "#868fa7 ",
                  color: "#f9f9f9",
                }}
              >
                {userDetails?.user?.merchantData?.companyName[0]}
              </div>
            )}
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5 text-capitalize mb-1">
              {userDetails?.user?.merchantData?.companyName}
            </div>
            <div className="fw-bold text-muted text-hover-primary fs-8 text-capitalize">
              {userDetails?.user?.fullName}
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {userDetails?.user?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to={"/merchant/profile"} className="menu-link px-5">
          My Profile
        </Link>
      </div>

      <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          <span className="menu-text">My Projects</span>
          <span className="menu-badge">
            <span className="badge badge-light-danger badge-circle fw-bolder fs-7">
              3
            </span>
          </span>
        </a>
      </div>

      <div
        className="menu-item px-5"
        data-kt-menu-trigger="hover"
        data-kt-menu-placement="left-start"
        data-kt-menu-flip="bottom"
      >
        <a href="#" className="menu-link px-5">
          <span className="menu-title">My Subscription</span>
          <span className="menu-arrow"></span>
        </a>

        <div className="menu-sub menu-sub-dropdown w-175px py-4">
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Referrals
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Billing
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link px-5">
              Payments
            </a>
          </div>

          <div className="menu-item px-3">
            <a href="#" className="menu-link d-flex flex-stack px-5">
              Statements
              <i
                className="fas fa-exclamation-circle ms-2 fs-7"
                data-bs-toggle="tooltip"
                title="View your statements"
              ></i>
            </a>
          </div>

          <div className="separator my-2"></div>

          <div className="menu-item px-3">
            <div className="menu-content px-3">
              <label className="form-check form-switch form-check-custom form-check-solid">
                <input
                  className="form-check-input w-30px h-20px"
                  type="checkbox"
                  value="1"
                  defaultChecked={true}
                  name="notifications"
                />
                <span className="form-check-label text-muted fs-7">
                  Notifications
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-item px-5">
        <a href="#" className="menu-link px-5">
          My Statements
        </a>
      </div>

      <div className="separator my-2"></div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link to="/crafted/account/settings" className="menu-link px-5">
          Account Settings
        </Link>
      </div>

      <div className="menu-item px-5">
        <a onClick={logout} className="menu-link px-5">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
