import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAppDispatch } from "../redux/hook";
import { closeCheckout } from "../features/checkoutSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CheckOutItems from "./CheckOutItems";
import { FaTrashCan } from "react-icons/fa6";
import { clear, saveTransaction } from "../features/cartSlice";
import { updateNotification } from "../features/notifSlice";

const CheckOut: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems, total } = useSelector((state: RootState) => state.cart);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleCheckout = async () => {
    try {
      await dispatch(
        saveTransaction({ cartItems, amount: cartItems.length, total })
      ).unwrap();
      dispatch(clear());
      dispatch(closeCheckout());
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Checkout successfully",
          type: "success",
        })
      );
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="bg-black bg-opacity-75 fixed z-30 top-0 left-0 w-full h-screen">
      <div className="h-full bg-gray-50 sm:w-[40rem] min-w-[15rem] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(closeCheckout())}
            >
              <FaArrowCircleLeft />
              <span className="px-2 font-bold uppercase text-[0.95rem] select-none">
                Continue Shopping
              </span>
            </div>
            <div>Shopping Bag ({cartItems.length})</div>
          </div>
          <div className="mt-8">
            {cartItems.length === 0 ? (
              <div className="uppercase text-center text-3xl">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((cartItem) => (
                <CheckOutItems key={cartItem.id} item={cartItem} />
              ))
            )}
            <div className="flex justify-between items-center mt-12">
              <div>Total Cost: {formatCurrency(total)}</div>
              <FaTrashCan
                className="cursor-pointer text-3xl"
                onClick={() => dispatch(clear())}
              />
            </div>
            {cartItems.length === 0 ? (
              <div></div>
            ) : (
              <div
                className="text-center cursor-pointer bg-black text-white p-3 mt-8"
                onClick={handleCheckout}
              >
                Checkout
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
