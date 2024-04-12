import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenu } from "./MegaMenu";
import { UserDetails } from "../../../../models/common.model";
import { useSelector } from "react-redux";
import BEHLogo from "../../../../beh_images/behlogo-red-black.png";

export function MenuInner() {
  const intl = useIntl();
  const { userDetails } = useSelector((state: UserDetails) => state?.user);
  return (
    <>
      {userDetails?.user?.role == "M" && (
        <MenuItem
          title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
          to="/merchant/dashboard"
        />
      )}
      {userDetails?.user?.role == "C" && (
        <div className="d-flex align-items-center">
          <img
            alt="Logo"
            src={BEHLogo}
            className="h-25px app-sidebar-logo-default"
          />
        </div>
      )}
    </>
  );
}
