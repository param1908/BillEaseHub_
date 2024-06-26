import React from "react";
import { LayoutTypes, UserRoles } from "../modules/auth/constants";
import { Login } from "../modules/auth/components/Login";
import { DashboardWrapper } from "../pages/customer/dashboard/DashboardWrapper";
import { MDashboardWrapper } from "../pages/merchant/dashboard/MDashboardWrapper";
import Category from "../pages/merchant/category/Category";
import Product from "../pages/merchant/product/Product";
import Tax from "../pages/merchant/tax/Tax";
import GenerateBill from "../pages/merchant/generateBill/GenerateBill";
import BillTemplates from "../pages/merchant/previewBills/BillTemplates";
import Customer from "../pages/merchant/customers/Customer";
import CustomerDetails from "../pages/merchant/customers/CustomerDetails";
import Invoices from "../pages/merchant/invoices/Invoices";
import Calander from "../pages/merchant/calander/Calander";
import Analysis from "../pages/merchant/analysis/Analysis";
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
  {
    id: "CUST_06",
    icon: "",
    path: "/merchant/bill-templates",
    name: "Bill Templates",
    element: <BillTemplates />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
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
  {
    id: "CUST_14",
    icon: "",
    path: "/merchant/customers-details",
    name: "Customer Details",
    element: <CustomerDetails />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_15",
    icon: "",
    path: "/merchant/invoices",
    name: "Invoices",
    element: <Invoices />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_15",
    icon: "",
    path: "/merchant/calander",
    name: "Calander",
    element: <Calander />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
  {
    id: "CUST_16",
    icon: "",
    path: "/merchant/analysis",
    name: "Calander",
    element: <Analysis />,
    layoutType: AFTER_AUTH,
    isAuthRequired: true,
    accessRoles: [merchant],
  },
];
