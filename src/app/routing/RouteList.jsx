import React from "react";
import { LayoutTypes, UserRoles } from "../modules/auth/constants";
import { Login } from "../modules/auth/components/Login";
import { DashboardWrapper } from "../pages/customer/dashboard/DashboardWrapper";
import { MDashboardWrapper } from "../pages/merchant/dashboard/MDashboardWrapper";
import Category from "../pages/merchant/category/Category";
import Product from "../pages/merchant/product/Product";
import Tax from "../pages/merchant/tax/Tax";
import GenerateBill from "../pages/merchant/generateBill/GenerateBill";
import ProfilePage from "../pages/merchant/profile/ProfilePage";
import Customer from "../pages/merchant/customers/Customer";
const { customer, merchant, admin } = UserRoles;
const { BEFORE_AUTH, AFTER_AUTH, DEFAULT } = LayoutTypes;

export const routeList = [
  //   {
  //     id: "ADM_00",
  //     icon: "",
  //     path: "/",
  //     redirectPath: "/sign-in",
  //     name: "Admin",
  //     layoutType: BEFORE_AUTH,
  //     element: <></>,
  //     isAuthRequired: false,
  //     accessRoles: [],
  //   },
  {
    id: "CUST_01",
    icon: "",
    path: "/auth/login",
    name: "Sign In",
    element: <Login />,
    layoutType: BEFORE_AUTH,
    isAuthRequired: false,
    accessRoles: [],
  },
  //   {
  //     id: "CUST_02",
  //     icon: "",
  //     path: "/sign-in",
  //     name: "Sign In",
  //     element: <SignIn />,
  //     layoutType: BEFORE_AUTH,
  //     isAuthRequired: false,
  //     accessRoles: [],
  //   },
  {
    id: "CUST_03",
    icon: "",
    path: "/customer/dashboard",
    name: "Dashboard",
    element: <DashboardWrapper />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [customer],
  },
  //   {
  //     id: "CUST_04",
  //     icon: "",
  //     path: "/customer/bills",
  //     name: "Bills",
  //     element: <CBills />,
  //     layoutType: AFTER_AUTH,
  //     isAuthRequired: true,
  //     accessRoles: [customer],
  //   },
  {
    id: "CUST_05",
    icon: "",
    path: "/merchant/dashboard",
    name: "Dashboard",
    element: <MDashboardWrapper />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_05",
    icon: "",
    path: "/merchant/generate-invoice",
    name: "Generate Bill",
    element: <GenerateBill />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  //   {
  //     id: "CUST_06",
  //     icon: "",
  //     path: "/merchant/bill-templates",
  //     name: "Bill Templates",
  //     element: <MBillTemplates />,
  //     layoutType: AFTER_AUTH,
  //     isAuthRequired: true,
  //     accessRoles: [merchant],
  //   },
  //   {
  //     id: "CUST_07",
  //     icon: "",
  //     path: "/merchant/bill-templates/create",
  //     name: "Bill Templates",
  //     element: <MCreateTemplates />,
  //     layoutType: AFTER_AUTH,
  //     isAuthRequired: true,
  //     accessRoles: [merchant],
  //   },
  //   {
  //     id: "CUST_08",
  //     icon: "",
  //     path: "/merchant/bill-templates/preview",
  //     name: "Bill Templates",
  //     element: <MPreviewTemplate />,
  //     layoutType: AFTER_AUTH,
  //     isAuthRequired: true,
  //     accessRoles: [merchant],
  //   },
  //   {
  //     id: "CUST_09",
  //     icon: "",
  //     path: "/merchant/generate-bill/form",
  //     name: "Generate Bill Form",
  //     element: <MCreateBillForm />,
  //     layoutType: AFTER_AUTH,
  //     isAuthRequired: true,
  //     accessRoles: [merchant],
  //   },
  {
    id: "CUST_10",
    icon: "",
    path: "/merchant/category",
    name: "Category",
    element: <Category />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_11",
    icon: "",
    path: "/merchant/product",
    name: "Product",
    element: <Product />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_12",
    icon: "",
    path: "/merchant/tax",
    name: "Tax",
    element: <Tax />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_13",
    icon: "",
    path: "/merchant/customers",
    name: "Customers",
    element: <Customer />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  // {
  //   id: "CUST_13",
  //   icon: "",
  //   path: "/merchant/profile",
  //   name: "Profile",
  //   element: <ProfilePage />,
  //   layoutType: AFTER_AUTH,
  //   isAuthRequired: true,
  //   accessRoles: [merchant],
  // },
];
