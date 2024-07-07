import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { getDashboardCustomerBillsApi } from "../../../../services/merchant.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Invoice Amounts",
      },
    },
  };

  const daysInMonth = moment().daysInMonth();
  const allDates: any = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = moment().date(day).format("DD/MM/YYYY");
    allDates.push(currentDate);
  }

  const [chartData, setChartData] = useState([]);

  const labels = allDates;
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Total Invoices Amount",
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
      },
    ],
  };

  useEffect(() => {
    getAllDashboardCustomerData();
  }, []);

  const getAllDashboardCustomerData = async () => {
    try {
      const response = await getDashboardCustomerBillsApi();
      const resultArray: any = [];
      for (const date of allDates) {
        let totalSum = 0;
        response.data?.getBillTemplateData.forEach((el: any) => {
          if (el.formattedDate === date) {
            totalSum += Number(el.total);
          }
        });
        resultArray.push(parseFloat(totalSum.toFixed(2)));
      }
      console.log("prepareDateArr", resultArray);
      setChartData(resultArray);
    } catch (error) {}
  };

  return <Line options={options} data={data} style={{ width: "100%" }} />;
}
