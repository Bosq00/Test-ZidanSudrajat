import React from "react";
import { CartItem, decrease, increase, remove } from "../features/cartSlice";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "../redux/hook";

interface CheckOutItemsProps {
  item: CartItem;
}

const CheckOutItems: React.FC<CheckOutItemsProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increase(item.id));
  };

  const handleDecrease = () => {
    dispatch(decrease(item.id));
  };

  const handleRemove = () => {
    dispatch(remove(item.id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex justify-between items-center border border-solid border-gray-300 p-4 mb-6">
      <div className="flex items-center gap-4">
        <img
          src={item.image_location}
          alt={item.product}
          className="w-20 h-20 object-cover"
        />
      </div>
      <div className="flex flex-col items-start max-w-[6.8rem]">
        <div className="font-semibold">{item.name}</div>
        <div className="flex items-center gap-4 mt-2">
          <button
            className="w-8 h-8 text-white bg-black rounded-full"
            onClick={handleDecrease}
          >
            -
          </button>
          <div>{item.amount}</div>
          <button
            className="w-8 h-8 text-white bg-black rounded-full"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <RxCross2 className="cursor-pointer text-xl" onClick={handleRemove} />
        <div>{formatCurrency(item.price * item.amount)}</div>
      </div>
    </div>
  );
};

export default CheckOutItems;
