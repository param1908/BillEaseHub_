import { useEffect } from "react";
import { useLocation } from "react-router";
import clsx from "clsx";
import { useLayout } from "../../core";
import { DrawerComponent } from "../../../../_metronic/assets/ts/components";
import { WithChildren } from "../../../../_metronic/helpers";
import { UserDetails } from "../../../models/common.model";
import { useSelector } from "react-redux";

const Content = ({ children }: WithChildren) => {
  const { config, classes } = useLayout();
  const { userDetails } = useSelector((state: UserDetails) => state?.user);
  const location = useLocation();
  useEffect(() => {
    DrawerComponent.hideAll();
  }, [location]);

  const appContentContainer = config.app?.content?.container;
  return (
    <div
      id="kt_app_content"
      className={clsx(
        "app-content flex-column-fluid pt-7",
        classes.content.join(" "),
        config?.app?.content?.class
      )}
    >
      {appContentContainer ? (
        <div
          id="kt_app_content_container"
          className={clsx(
            "app-container",
            classes.contentContainer.join(" "),
            {
              "container-xxl": appContentContainer === "fixed",
              "container-fluid": appContentContainer === "fluid",
            },
            userDetails?.user?.role == "C" ? "container" : ""
          )}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export { Content };
