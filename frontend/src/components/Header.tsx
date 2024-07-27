import React, { useEffect, useState } from "react";
import { IoNotificationsCircle } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { StateJwtPayload } from "../features/productSlice";


const Header = () => {


  const [open, setOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const decodedToken: StateJwtPayload | null = storedToken ? jwtDecode(storedToken) : null; 

  useEffect(() => {
 
    if (storedToken==null) {
      navigate('/');
    }
  }, [storedToken, navigate]);

  const Logout = async () => {
      localStorage.removeItem('token');
  };

  return (
    <div className="w-full bg-gray-800">
      <div className=" flex justify-between items-center h-[50px]">
        <div className="p-2"></div>
        <div className="flex space-x-3 items-center ">
          <p className="text-gray-200">{decodedToken?.FullName}</p>
          <button className="relative w-8 h-8 bg-gray-800 rounded-full">
            <IoNotificationsCircle
              className="w-8 h-8 text-white"
              onClick={() => setOpen(!open)}
            />
          </button>
          <div
            className={`absolute right-0 mt-2 w-58 bg-gray-300 rounded-lg shadow-lg overflow-hidden z-10 top-10 ${
              !open && "hidden"
            }`}
          >
            <div className="px-4 py-2">
              <a
                href="/"
                className="block px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-200"
              >
                <LuLogOut className="text-2xl block float-left" onClick={()=>Logout()} /> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
