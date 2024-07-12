import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import {
  HeaderUserMenu,
  Search,
  ThemeModeSwitcher,
} from "../../../../_metronic/partials";
import { useLayout } from "../../core";
import { useSelector } from "react-redux";

const itemClass = "ms-1 ms-md-4";
const userAvatarClass = "symbol-35px";
const btnIconClass = "fs-2";

const Navbar = () => {
  const { config } = useLayout();
  const { userDetails } = useSelector((state: any) => state.user);
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx("app-navbar-item")}>
        <div className={clsx("position-relative")}>
          <Link
            to="/merchant/generate-invoice"
            className="btn btn-sm btn-light-primary fs-6 py-4"
          >
            Generate Invoice
            <KTIcon iconName="cheque" className="fs-3 ms-2" />
          </Link>
        </div>
      </div>

      <div className={clsx("app-navbar-item", itemClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx("btn-active-light-primary btn-custom")}
        />
      </div>

      <div className={clsx("app-navbar-item", itemClass)}>
        <div
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
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
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div
          className="app-navbar-item d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_header_menu_toggle"
          >
            <KTIcon iconName="text-align-left" className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  );
};

export { Navbar };
