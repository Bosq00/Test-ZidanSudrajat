import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useAppDispatch } from "../redux/hook";
import { getItems, itemsSelector } from "../features/itemsSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const data = useSelector(itemsSelector.selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const chartData = {
    labels: data.map((item) => item.product + "-" + item.variant),
    datasets: [
      {
        label: "Stock",
        data: data.map((item) => item.qty),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF5733",
          "#00FF00",
          "#28A745",
          "#8A2BE2",
          "#6F42C1",
          "#FD7E14",
          "#4B0082",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default DonutChart;
