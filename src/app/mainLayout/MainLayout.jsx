import React from "react";
import { LayoutTypes } from "../modules/auth/constants";
import BEHelmet from "../common/BEHelmet";

const MainLayout = ({ children, pageTitle, layoutType }) => {
  const role = localStorage.getItem("role");

  const renderAfterAuth = () => {
    return (
      <>
        {role === "C" ? (
          <div className="customer-wrapper">
            <div className="content-wrap">{children}</div>
          </div>
        ) : role === "M" ? (
          <div className="customer-wrapper">
            <div className="content-wrap">{children}</div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  const renderBeforeAuth = () => {
    return <>{children}</>;
  };

  const renderDefaultLayout = () => {
    return <div className="admin-wrapper">{children}</div>;
  };

  const renderLayout = () => {
    console.log("layoutType", layoutType);
    switch (layoutType) {
      case LayoutTypes.BEFORE_AUTH:
        return renderBeforeAuth();
      case LayoutTypes.AFTER_AUTH:
        return renderAfterAuth();
      case LayoutTypes.DEFAULT:
        return renderDefaultLayout();
      default:
        return;
    }
  };

  return (
    <>
      <BEHelmet title={pageTitle} />
      {renderLayout()}
    </>
  );
};

export default MainLayout;
