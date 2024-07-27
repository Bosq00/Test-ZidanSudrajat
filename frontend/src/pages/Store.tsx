import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ShoppingContainer from "../components/ShoppingContainer";
import ChekOut from "../components/CheckOut";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { total } from "../features/cartSlice";
import Notification from "../components/Notification";

const Store = () => {
  const isOpen = useSelector((state: RootState) => state.checkout.isOpen);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(total());
  }, [cartItems]);
  return (
    <div className="">
      <Navbar />
      <ShoppingContainer />
      {isOpen && <ChekOut />}
      <Notification />
    </div>
  );
};

export default Store;
