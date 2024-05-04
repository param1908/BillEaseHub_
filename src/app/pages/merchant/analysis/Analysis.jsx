import React from "react";
import imageLight from "../../../../_metronic/assets/images/svg/analysis/2.svg";
import imageDark from "../../../../_metronic/assets/images/svg/analysis/2-dark.svg";
import { Chart } from "react-chartjs-2";
import { BarChart } from "../../../modules/auth/components/chart/BarChart";
import { DoughnutChart } from "../../../modules/auth/components/chart/DoughnutChart";
import { PolarChart } from "../../../modules/auth/components/chart/PolarChart";

const Analysis = () => {
  return (
    <>
      <div className="row g-5 g-xl-10 g-xl-10">
        <div className="col-xl-4 mb-xl-10">
          <div className="card h-md-100" dir="ltr">
            <div className="card-body d-flex flex-column flex-center py-15 px-15">
              <div className="mb-2">
                <h1 className="fw-semibold text-gray-800 text-center lh-lg">
                  Welcome to our analysis realm, where data unveils insights.
                </h1>

                <div className="py-10 text-center">
                  <img
                    src={imageLight}
                    className="theme-light-show w-200px"
                    alt="img-logo"
                  />
                  <img
                    src={imageDark}
                    className="theme-dark-show w-200px"
                    alt="img-logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-8 mb-5 mb-xl-10">
          <div className="card h-md-100" dir="ltr">
            <div className="card-body d-flex flex-column flex-center py-15 w-100">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <div className="col-xxl-6 mb-5 mb-xl-10">
          <div className="card h-md-100" dir="ltr">
            <div className="card-body d-flex flex-column flex-center py-15 px-15">
              <DoughnutChart />
            </div>
          </div>
        </div>
        <div className="col-xxl-6 mb-5 mb-xl-10">
          <div className="card h-md-100" dir="ltr">
            <div className="card-body d-flex flex-column flex-center py-15 px-15">
              <PolarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
