import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HeaderWrapper } from "./components/header";
import { ScrollTop } from "./components/scroll-top";
import { Content } from "./components/content";
import {
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
} from "../../_metronic/partials";
import { PageDataProvider } from "./core";
import { reInitMenu } from "../../_metronic/helpers";
import { Sidebar } from "../modules/auth/components/sidebar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDetailsByToken } from "../services/common.service";
import { storeUserDetails } from "../store/slice/user.slice";
import { UserDetails } from "../models/common.model";
import clsx from "clsx";

const MasterLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isToken = localStorage.getItem("_token");
  const { userDetails } = useSelector((state: UserDetails) => state?.user);
  useEffect(() => {
    reInitMenu();
    getUserDetails();
    console.log("topppppppppppp", userDetails);
  }, [location.key]);

  const getUserDetails = async () => {
    try {
      if (isToken && !userDetails) {
        const userDetailsResponse = await getUserDetailsByToken();
        dispatch(storeUserDetails(userDetailsResponse?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isToken ? (
        <PageDataProvider>
          <div
            className="d-flex flex-column flex-root app-root"
            id="kt_app_root"
          >
            <div
              className="app-page flex-column flex-column-fluid"
              id="kt_app_page"
            >
              <HeaderWrapper />
              <div
                className={clsx(
                  "app-wrapper flex-column flex-row-fluid",
                  userDetails?.user?.role == "C" && "ms-0"
                )}
                id="kt_app_wrapper"
              >
                {userDetails?.user?.role == "M" && <Sidebar />}
                <div
                  className="app-main flex-column flex-row-fluid"
                  id="kt_app_main"
                >
                  <div className="d-flex flex-column flex-column-fluid">
                    {/* <ToolbarWrapper /> */}
                    <Content>
                      <Outlet />
                    </Content>
                  </div>
                </div>
              </div>
              {/* <FooterWrapper /> */}
            </div>
          </div>

          {/* begin:: Drawers */}
          <ActivityDrawer />
          {/* end:: Drawers */}

          {/* begin:: Modals */}
          <InviteUsers />
          <UpgradePlan />
          {/* end:: Modals */}
          <ScrollTop />
        </PageDataProvider>
      ) : (
        <Navigate to="/auth/login" replace={true} />
      )}
    </>
  );
};

export { MasterLayout };
