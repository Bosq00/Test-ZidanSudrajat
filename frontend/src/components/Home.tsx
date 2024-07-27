import React, { useEffect } from "react";
import { FaTags, FaBox, FaBoxOpen } from "react-icons/fa";
import { FaRupiahSign } from "react-icons/fa6";
import SummaryCard from "./SummaryCard";
import LineChart from "./LineChart";
import DonuteChart from "./DonuteChart";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hook";
import { getSummary, summarySelector } from "../features/summarySlice";

const Home: React.FC = () => {
  const summary = useSelector(summarySelector.selectAll);
  const [summaryData] = summary;

  const totalTransactions: number = summaryData?.total_amount ?? 0;
  const totalCategories: number = summaryData?.category ?? 0;
  const totalProducts: number = summaryData?.product ?? 0;
  const totalVariants: number = summaryData?.variant ?? 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Example data for the line chart
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"], // Replace with dynamic data if available
    datasets: [
      {
        label: "Total Transactions",
        data: [1000, 1200, 800, 1400, 1600, 2000], // Replace with actual data
        borderColor: "#76c7c0",
        backgroundColor: "rgba(118, 199, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gap: "24px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      <SummaryCard
        title="Total Transactions"
        value={formatNumber(totalTransactions)}
        icon={FaRupiahSign}
        color="rgba(76, 175, 80, 0.1)" // Light green background
      />
      <SummaryCard
        title="Total Categories"
        value={formatNumber(totalCategories)}
        icon={FaTags}
        color="rgba(33, 150, 243, 0.1)" // Light blue background
      />
      <SummaryCard
        title="Total Products"
        value={formatNumber(totalProducts)}
        icon={FaBox}
        color="rgba(255, 193, 7, 0.1)" // Light yellow background
      />
      <SummaryCard
        title="Total Variants"
        value={formatNumber(totalVariants)}
        icon={FaBoxOpen}
        color="rgba(244, 67, 54, 0.1)" // Light red background
      />
      <div
        className="
    col-span-2
    p-4
    bg-white
    rounded-lg
    shadow-md
  "
      >
        <h2 className="text-lg font-semibold">Transaction Trends</h2>
        <LineChart />
      </div>
      <div
        className="
        w-[450px]
        h-[500px]
          col-span-2
          p-4
          bg-white
          rounded-lg
          shadow-md
        "
      >
        <h2 className="text-lg font-semibold">Product Stock</h2>
        <DonuteChart />
      </div>
    </div>
  );
};

export default Home;
