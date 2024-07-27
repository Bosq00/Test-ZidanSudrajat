import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getTransactionHeader,
  transactionheaderSelector,
} from "../features/transactionheaderSlice";
import { useAppDispatch } from "../redux/hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionData {
  created_date: string;
  total_amount: number;
}

const LineChart: React.FC = () => {
  const data = useSelector(transactionheaderSelector.selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactionHeader());
  }, [dispatch]);

  const chartData = {
    labels: data.map((item) => item.created_date),
    datasets: [
      {
        label: "Total Transactions",
        data: data.map((item) => item.total_amount),
        borderColor: "#76c7c0",
        backgroundColor: "rgba(118, 199, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
