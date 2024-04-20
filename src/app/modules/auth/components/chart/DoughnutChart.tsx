import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getDashboardCustomerTotalApi } from "../../../../services/merchant.service";
import moment from "moment";
import MainLoader from "../../../../loaders/MainLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const [chartData, setChartData] = useState([20, 20, 20, 20, 20, 20]);
  const [loading, setLoading] = useState(false);
  const currentDate = moment();
  const lastSixMonths: any = [];
  const currentMonthObj = {
    month: currentDate.format("MMMM"),
    date: currentDate.format("YYYY-MM"),
  };
  const [isChart, setIsChart] = useState(false);
  lastSixMonths.push(currentMonthObj);
  for (let i = 0; i < 5; i++) {
    const monthObj = {
      month: currentDate.subtract(1, "months").format("MMMM"),
      date: currentDate.format("YYYY-MM"),
    };
    lastSixMonths.unshift(monthObj);
  }
  const data = {
    labels: lastSixMonths?.map(
      (item: { month: string; date: string }) =>
        item?.month + " (" + moment(item?.date).format("MM/YYYY") + ")"
    ),
    datasets: [
      {
        label: "Customers",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
          const foundItem = response.data?.getBillTemplateData.find(
            (item: { _id: string }) => item._id === date?.date
          );
          if (foundItem) {
            resultArray.push(parseFloat(foundItem.count.toFixed(2)));
          } else {
            resultArray.push(0);
          }
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

  return (
    <>
      <Doughnut
        data={data}
        options={isChart ? options : options2}
        style={{ height: "430px" }}
      />
      {loading && <MainLoader />}
    </>
  );
}
