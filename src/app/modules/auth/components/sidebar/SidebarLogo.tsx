import { Link } from "react-router-dom";
import clsx from "clsx";
import { MutableRefObject, useEffect, useRef } from "react";
import { useLayout } from "../../../../layout/core";
import { ToggleComponent } from "../../../../../_metronic/assets/ts/components";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const SidebarLogo = (props: PropsType) => {
  const { config } = useLayout();
  const toggleRef = useRef<HTMLDivElement>(null);

  const appSidebarDefaultMinimizeDesktopEnabled =
    config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled =
    config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? "collapse"
    : appSidebarDefaultMinimizeDesktopEnabled
    ? "minimize"
    : "";
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? "active" : "";
  const appSidebarDefaultMinimizeDefault =
    config.app?.sidebar?.default?.minimize?.desktop?.default;

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(
        toggleRef.current!
      ) as ToggleComponent | null;

      if (toggleObj === null) {
        return;
      }

      // Add a class to prevent sidebar hover effect after toggle click
      toggleObj.on("kt.toggle.change", function () {
        // Set animation state
        props.sidebarRef.current!.classList.add("animating");

        // Wait till animation finishes
        setTimeout(function () {
          // Remove animation state
          props.sidebarRef.current!.classList.remove("animating");
        }, 300);
      });
    }, 600);
  }, [toggleRef, props.sidebarRef]);

  return (
    <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
      <Link to="/dashboard">
        {config.layoutType === "dark-sidebar" ? (
          <img
            alt="Logo"
            src={toAbsoluteUrl("/media/logos/default-dark.svg")}
            className="h-25px app-sidebar-logo-default"
          />
        ) : (
          <>
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/logos/default.svg")}
              className="h-25px app-sidebar-logo-default theme-light-show"
            />
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/logos/default-dark.svg")}
              className="h-25px app-sidebar-logo-default theme-dark-show"
            />
          </>
        )}

        <img
          alt="Logo"
          src={toAbsoluteUrl("/media/logos/default-small.svg")}
          className="h-20px app-sidebar-logo-minimize"
        />
      </Link>

      {(appSidebarDefaultMinimizeDesktopEnabled ||
        appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          ref={toggleRef}
          id="kt_app_sidebar_toggle"
          className={clsx(
            "app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate",
            { active: appSidebarDefaultMinimizeDefault }
          )}
          data-kt-toggle="true"
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target="body"
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTIcon iconName="black-left-line" className="fs-3 rotate-180 ms-1" />
        </div>
      )}
    </div>
  );
};

export { SidebarLogo };
