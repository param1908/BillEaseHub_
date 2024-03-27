import React from "react";

const Product = () => {
  return (
    <>
      <div className="card card-custom card-stretch gutter-b mb-10">
        <div className="card-header">
          <div class="card-title m-0 d-flex justify-content-between w-100">
            <h3 class="fw-bolder m-0">ALL Products [ ]</h3>
            <div className="d-flex">
              <div class="d-flex align-items-center position-relative my-1 me-md-2">
                <i class="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  class="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Product"
                  // value=""
                />
              </div>
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a user"
                // onClick={() => handleOpenModal()}
              >
                <a href="#" class="btn btn-sm btn-light-primary py-4">
                  <i class="ki-duotone ki-plus fs-3"></i>Add Product
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          <div class="card-body py-4">
            <div class="table-responsive">
              <table
                id="kt_table_users"
                class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                role="table"
              >
                <thead>
                  <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Name
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Role
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Last login
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Two steps
                    </th>
                    <th colspan="1" role="columnheader" class="min-w-125px">
                      Joined day
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      class="text-end min-w-100px"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold" role="rowgroup">
                  <tr role="row">
                    <td role="cell" class="">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                          <a href="#">
                            <div class="symbol-label fs-3 bg-light-danger text-danger">
                              M
                            </div>
                          </a>
                        </div>
                        <div class="d-flex flex-column">
                          <a
                            href="#"
                            class="text-gray-800 text-hover-primary mb-1"
                          >
                            Melody Macy
                          </a>
                          <span>melody@altbox.com</span>
                        </div>
                      </div>
                    </td>
                    <td role="cell" class="">
                      Analyst
                    </td>
                    <td role="cell" class="">
                      <div class="badge badge-light fw-bolder">20 mins ago</div>
                    </td>
                    <td role="cell" class="">
                      {" "}
                      <div class="badge badge-light-success fw-bolder">
                        Enabled
                      </div>
                    </td>
                    <td role="cell" class="">
                      10 Nov 2022, 8:43 pm
                    </td>
                    <td role="cell" class="text-end min-w-100px">
                      <a
                        href="#"
                        class="btn btn-light btn-active-light-primary btn-sm"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        Actions<i class="ki-duotone ki-down fs-5 m-0"></i>
                      </a>
                      <div
                        class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                        data-kt-menu="true"
                      >
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">Edit</a>
                        </div>
                        <div class="menu-item px-3">
                          <a
                            class="menu-link px-3"
                            data-kt-users-table-filter="delete_row"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" class="">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                          <a href="#">
                            <div class="symbol-label">
                              <img
                                src="/metronic8/react/demo1/media/avatars/300-1.jpg"
                                alt="Max Smith"
                                class="w-100"
                              />
                            </div>
                          </a>
                        </div>
                        <div class="d-flex flex-column">
                          <a
                            href="#"
                            class="text-gray-800 text-hover-primary mb-1"
                          >
                            Max Smith
                          </a>
                          <span>max@kt.com</span>
                        </div>
                      </div>
                    </td>
                    <td role="cell" class="">
                      Developer
                    </td>
                    <td role="cell" class="">
                      <div class="badge badge-light fw-bolder">3 days ago</div>
                    </td>
                    <td role="cell" class="">
                      {" "}
                    </td>
                    <td role="cell" class="">
                      22 Sep 2022, 8:43 pm
                    </td>
                    <td role="cell" class="text-end min-w-100px">
                      <a
                        href="#"
                        class="btn btn-light btn-active-light-primary btn-sm"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        Actions<i class="ki-duotone ki-down fs-5 m-0"></i>
                      </a>
                      <div
                        class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                        data-kt-menu="true"
                      >
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">Edit</a>
                        </div>
                        <div class="menu-item px-3">
                          <a
                            class="menu-link px-3"
                            data-kt-users-table-filter="delete_row"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr role="row">
                    <td role="cell" class="">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                          <a href="#">
                            <div class="symbol-label">
                              <img
                                src="/metronic8/react/demo1/media/avatars/300-5.jpg"
                                alt="Sean Bean"
                                class="w-100"
                              />
                            </div>
                          </a>
                        </div>
                        <div class="d-flex flex-column">
                          <a
                            href="#"
                            class="text-gray-800 text-hover-primary mb-1"
                          >
                            Sean Bean
                          </a>
                          <span>sean@dellito.com</span>
                        </div>
                      </div>
                    </td>
                    <td role="cell" class="">
                      Support
                    </td>
                    <td role="cell" class="">
                      <div class="badge badge-light fw-bolder">5 hours ago</div>
                    </td>
                    <td role="cell" class="">
                      {" "}
                      <div class="badge badge-light-success fw-bolder">
                        Enabled
                      </div>
                    </td>
                    <td role="cell" class="">
                      21 Feb 2022, 6:43 am
                    </td>
                    <td role="cell" class="text-end min-w-100px">
                      <a
                        href="#"
                        class="btn btn-light btn-active-light-primary btn-sm"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                      >
                        Actions<i class="ki-duotone ki-down fs-5 m-0"></i>
                      </a>
                      <div
                        class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                        data-kt-menu="true"
                      >
                        <div class="menu-item px-3">
                          <a class="menu-link px-3">Edit</a>
                        </div>
                        <div class="menu-item px-3">
                          <a
                            class="menu-link px-3"
                            data-kt-users-table-filter="delete_row"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
