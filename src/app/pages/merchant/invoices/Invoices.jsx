import React from "react";
import Select from "react-select";

const Invoices = () => {
  const filterOptions = [
    { value: "chocolate", label: "Today's invoices" },
    { value: "strawberry", label: "Last seven days invoices" },
    { value: "vanilla", label: "Last one month's invoices" },
    { value: "vanilla1", label: "Last six month's invoices" },
    { value: "vanilla2", label: "Last one years invoices" },
    { value: "vanill3", label: "All invoices" },
  ];

  return (
    <>
      <div
        className="card card-custom card-stretch gutter-b mb-10"
        style={{ minHeight: "calc(100vh - 130px)" }}
      >
        <div className="card-header">
          <div className="card-title m-0 d-flex justify-content-between w-100">
            <h3 className="fw-bolder m-0 d-flex align-items-center">
              <p className="mb-0">
                {/* {catId ? catName + "'s" : "ALL"} Products [ {total} ] */}
                ALL Invoices [100]
              </p>
            </h3>
            <div className="d-flex">
              <div className="card-toolbar me-md-2">
                <Select
                  className="form-control bg-transparent beh-select"
                  classNamePrefix="select"
                  defaultValue={filterOptions[0]}
                  name="filter"
                  options={filterOptions}
                />
              </div>
              <div className="d-flex align-items-center position-relative my-1">
                <i className="ki-duotone ki-magnifier fs-1 position-absolute ms-6">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search Invoice"
                  //   onKeyUp={(e) => {
                  //     setPaginate({ ...paginate, page: 1 });
                  //     setSearch(e.target.value);
                  //   }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body h-auto">
          {/* {products.length > 0 && ( */}
          <div className="card-body py-4">
            <div className="table-responsive">
              <table
                id="kt_table_users"
                className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                role="table"
              >
                <thead>
                  <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Name
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Email
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Phone
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Amount
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      Payment Method
                    </th>
                    <th colspan="1" role="columnheader" className="min-w-125px">
                      CREATED DATE
                    </th>
                    <th
                      colspan="1"
                      role="columnheader"
                      className="text-center min-w-100px"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 fw-bold" role="rowgroup">
                  {/* {products.length && */}
                  {/* //   products.map((el, index) => { */}
                  {/* // return ( */}
                  <tr role="row">
                    <td role="cell" className="">
                      Test invoice
                    </td>
                    <td role="cell" className="">
                      test@yopmail.com
                    </td>
                    <td role="cell" className="text-capitalize">
                      +91 1234567890
                    </td>
                    <td role="cell" className="text-capitalize">
                      ₹2,000
                    </td>
                    <td role="cell" className="">
                      Online
                    </td>
                    <td role="cell" className="">
                      <div className="badge badge-light fw-bolder">
                        17/04/2024
                        {/* {moment(el?.createdAt).format("DD-MM-YYYY")} */}
                      </div>
                    </td>
                    <td
                      role="cell"
                      className="text-end min-w-100px d-flex justify-content-center"
                    >
                      View
                    </td>
                  </tr>
                  {/* // ); */}
                  {/* //   })} */}
                </tbody>
              </table>
            </div>
          </div>
          {/*   )} */}
          {/* {products.length === 0 && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "calc(100vh - 260px)" }}
            >
              <div>
                <img src={NotFoundLogo} alt="Logo" style={{ width: "430px" }} />
                <h3 className="mt-7 text-center">No Products Found</h3>
              </div>
            </div>
          )} */}
          {/* {total > 12 && (
            <Pagination
              activePage={paginate?.page}
              itemsCountPerPage={paginate?.limit}
              totalItemsCount={total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default Invoices;
