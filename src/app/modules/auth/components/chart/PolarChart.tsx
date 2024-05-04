import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import moment from "moment";
import { getDashboardCustomerTotalApi } from "../../../../services/merchant.service";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function PolarChart() {
  const [chartData, setChartData] = useState([20, 20, 20, 20, 20, 20]);
  const [loading, setLoading] = useState(false);
  const currentDate = moment();
  const lastSixMonths: any = [];
  const currentMonthObj = {
    month: currentDate.format("MMMM"),
    date: currentDate.format("YYYY-MM"),
  };
  lastSixMonths.push(currentMonthObj);
  for (let i = 0; i < 5; i++) {
    const monthObj = {
      month: currentDate.subtract(1, "months").format("MMMM"),
      date: currentDate.format("YYYY-MM"),
    };
    lastSixMonths.unshift(monthObj);
  }
  const [isChart, setIsChart] = useState(false);
  const data = {
    labels: lastSixMonths?.map(
      (item: { month: string; date: string }) => item?.month
    ),
    datasets: [
      {
        label: "Invoice Amount",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return null;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const options2: any = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    setLoading(true);
    getAllDashboardCustomerData();
  }, []);

  const getAllDashboardCustomerData = async () => {
    try {
      const response = await getDashboardCustomerTotalApi();
      let resultArray: any = [];

      if (response?.data?.getBillTemplateData?.length > 0) {
        setIsChart(false);
        for (const date of lastSixMonths) {
          let totalSum = 0;
          response.data?.getBillTemplateData.forEach((el: any) => {
            if (
              moment(el?.billDate, "DD/MM/YYYY").format("YYYY-MM") ===
              date?.date
            ) {
              totalSum += Number(el.total);
            }
          });
          resultArray.push(parseFloat(totalSum.toFixed(2)));
        }
      } else {
        setIsChart(true);
        resultArray = [20, 20, 20, 20, 20, 20];
      }
      setChartData(resultArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return <PolarArea data={data} options={isChart ? options : options2} />;
}
