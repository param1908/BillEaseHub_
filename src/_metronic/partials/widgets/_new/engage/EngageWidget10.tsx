/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../helpers";
import { useSelector } from "react-redux";

type Props = {
  className: string;
};

const EngageWidget10 = ({ className }: Props) => {
  const { userDetails } = useSelector((state: any) => state.user);

  return (
    <div className={`card card-flush ${className}`}>
      <div
        className="card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0"
        style={{
          backgroundPosition: "100% 50%",
          backgroundImage: `url('${toAbsoluteUrl(
            "/media/stock/900x600/42.png"
          )}')`,
        }}
      >
        <div>
          <div className="fs-2hx fw-bold text-gray-800 text-center mt-md-13 mb-13 mb-xl-0">
            <span className="me-2">
              Welcome <br />
              <span className="position-relative d-inline-block text-success">
                <Link
                  to="/merchant/profile/overview"
                  className="text-success opacity-75-hover text-capitalize fw-bold"
                >
                  {userDetails?.user?.fullName}
                </Link>
                <span className="position-absolute opacity-15 bottom-0 start-0 border-4 border-success border-bottom w-100"></span>
              </span>
            </span>
          </div>
        </div>
        <img
          className="mx-auto h-150px h-lg-200px theme-light-show"
          src={toAbsoluteUrl("/media/illustrations/misc/upgrade.svg")}
          alt=""
        />
        <img
          className="mx-auto h-150px h-lg-200px theme-dark-show"
          src={toAbsoluteUrl("/media/illustrations/misc/upgrade-dark.svg")}
          alt=""
        />
      </div>
    </div>
  );
};

export { EngageWidget10 };
