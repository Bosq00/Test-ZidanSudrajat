import { useEffect, useState } from "react";
import { BsBag } from "react-icons/bs";
import { useAppDispatch } from "../redux/hook";
import { openCheckout } from "../features/checkoutSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { StateJwtPayload } from "../features/productSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { amount } = useSelector((state: RootState) => state.cart);
  const [scroll, setScroll] = useState(false);
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const decodedToken: StateJwtPayload | null = storedToken
    ? jwtDecode(storedToken)
    : null;
  const handleCheckout = () => {
    dispatch(openCheckout());
  };
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20); // Changed to window.scrollY for accuracy
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (storedToken == null) {
      navigate("/");
    }
  }, [storedToken, navigate]);

  const Logout = async () => {
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`${
        scroll ? "bg-gray-700" : "bg-gray-800"
      } fixed top-0 left-0 w-full z-20`}
    >
      <div className="flex items-center justify-between relative container py-4 px-4 mx-auto">
        <div className="font-bold text-xl text-white">Shopping</div>
        <div
          className="font-bold text-xl text-white absolute"
          onClick={() => Logout()}
        >
          <RiLogoutBoxLine className="text-3xl opacity-85  -ml-10" />
        </div>
        <div className="relative cursor-pointer" onClick={handleCheckout}>
          <BsBag className="text-3xl opacity-85 text-white" />
          <div
            className={`absolute w-4 h-4 rounded-full z-10 right-[-3px] bottom-[-3px] flex items-center justify-center text-[10px] ${
              amount > 0
                ? "bg-yellow-500 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            {amount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
