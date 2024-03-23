/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { useSelector } from "react-redux";
import { customerItems, merchantItems } from "./sidebarMenuItems";

const SidebarMenuMain = () => {
  const intl = useIntl();
  const { userDetails } = useSelector((state: any) => state.user);
  console.log("userDetailsvvvvvvvvvvvv", userDetails);
  const Items = userDetails?.user?.role === "C" ? customerItems : merchantItems;

  return (
    <>
      {Items.map((item) => {
        return (
          <SidebarMenuItem
            to={item?.to}
            icon={item?.icon}
            title={item?.name}
            fontIcon="bi-app-indicator"
          />
        );
      })}
    </>
  );
};

export { SidebarMenuMain };
