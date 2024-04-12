/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import BEHLoginVector from "../../beh_images/login-vector.png";
import BEHSignupVector from "../../beh_images/signup-vector.png";
import BEHLogo from "../../beh_images/behlogo-green-white.png";

const AuthLayout = () => {
  const location = useLocation();
  console.log("location.pathname", location.pathname);

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      {/* begin::Aside */}
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/misc/auth-bg.png")})`,
        }}
      >
        {/* begin::Content */}
        <div className=" py-15 px-5 px-md-15 w-100">
          <div className="w-100 mb-4">
            <img src={BEHLogo} alt="" style={{ width: "180px" }} />
          </div>

          <div className="d-flex flex-column flex-center h-100">
            {/* begin::Logo */}
            <Link to="/" className="mb-12">
              {location.pathname === "/auth/login" ? (
                <img
                  alt="Logo"
                  src={BEHLoginVector}
                  style={{ height: "430px" }}
                />
              ) : (
                <img
                  alt="Logo"
                  src={BEHSignupVector}
                  style={{ height: "430px" }}
                />
              )}
            </Link>
            {/* end::Logo */}
          </div>
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}

      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 overflow-auto">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          {/* begin::Wrapper */}
          <div className="p-10">
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { AuthLayout };
