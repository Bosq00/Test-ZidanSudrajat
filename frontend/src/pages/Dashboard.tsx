import React from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import Header from "../components/Header";



const Dashboard = () => {
  return (
    <div className="w-full h-screen flex ">
      <Sidebar />
      <div className="w-full h-screen">
        <div className="w-full h-screen">
          <Header />
          <Home />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
