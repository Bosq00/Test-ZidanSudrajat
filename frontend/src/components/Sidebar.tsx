import React, { useEffect, useState } from "react";
import { TbReport } from "react-icons/tb";
import { BiAtom, BiCategory } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { PiArrowCircleLeftFill } from "react-icons/pi";
import { FaBoxes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const sidebarWidth = isOpen ? "w-72" : "w-20";
  const rotateIcon = isOpen ? "rotate-[360deg]" : "";
  const hideText = !isOpen ? "hidden" : "";

  return (
    <div
      className={`bg-gray-800 p-5 pt-8 ${sidebarWidth} duration-300 relative h-screen`}
    >
      <PiArrowCircleLeftFill
        className={`bg-white text-gray-800 text-3xl rounded-full absolute -right-3 top-9 border border-gray-800 cursor-pointer ${
          !isOpen && "rotate-180"
        }`}
        onClick={() => setOpen(!isOpen)}
      />
      <div className="inline-flex">
        <BiAtom
          className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-3 duration-500 ${rotateIcon}`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${hideText}`}
        >
          Test App
        </h1>
      </div>
      <ul className="pt-2">
        <li
          className={`text-gray-300 text-sm flex items-center gap-x-8 cursor-pointer p-2 hover:bg-gray-400 rounded-md mt-3`}
        >
          <a href={`/Dashboard`}>
            <span className="text-2xl block float-left">
              <RiDashboardFill />
            </span>
            <span
              className={`text-base font-medium flex-2 duration-200 p-3 ${
                !isOpen && "hidden"
              }`}
            >
              Dashboard
            </span>
          </a>
        </li>
        <li
          className={`text-gray-300 text-sm flex items-center gap-x-8 cursor-pointer p-2 hover:bg-gray-400 rounded-md mt-3`}
        >
          <a href={`/Category`}>
            <span className="text-2xl block float-left">
              <BiCategory />
            </span>
            <span
              className={`text-base font-medium flex-2 duration-200 p-3 ${
                !isOpen && "hidden"
              }`}
            >
              Product Category
            </span>
          </a>
        </li>
        <li
          className={`text-gray-300 text-sm flex items-center gap-x-8 cursor-pointer p-2 hover:bg-gray-400 rounded-md mt-3`}
        >
          <a href={`/Product`}>
            <span className="text-2xl block float-left">
              <FaBoxes />
            </span>
            <span
              className={`text-base font-medium flex-2 duration-200 p-3 ${
                !isOpen && "hidden"
              }`}
            >
              Product
            </span>
          </a>
        </li>
        <li
          className={`text-gray-300 text-sm flex items-center gap-x-8 cursor-pointer p-2 hover:bg-gray-400 rounded-md mt-3`}
        >
          <a href={`/Transaction`}>
            <span className="text-2xl block float-left">
              <TbReport />
            </span>
            <span
              className={`text-base font-medium flex-2 duration-200 p-3 ${
                !isOpen && "hidden"
              }`}
            >
              History Transaction
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
