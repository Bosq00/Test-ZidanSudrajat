import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useAppDispatch } from "../redux/hook";
import { addCart } from "../features/cartSlice";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

interface Items {
  id: number;
  category: string;
  product: string;
  variant: string;
  qty: number;
  image_location: string;
  price: number;
}

interface ShoppingItemsProps {
  item: Items;
}

const ShoppingItems: React.FC<ShoppingItemsProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };
  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      name: item.product,
      amount: 1,
    };
    dispatch(addCart(cartItem));
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="bg-gray-50 h-[400px] flex items-center justify-center rounded-lg">
        <img
          src={item.image_location}
          alt={item.product}
          className="w-[250px] h-[auto] p-2"
        />
      </div>
      <div className="mt-6 flex justify-between items-center px-4">
        <div>
          <h2 className="text-xl font-semibold">{item.product}</h2>
          <p className="text-gray-600">Variant: {item.variant}</p>
          <p className="text-gray-600">Price: {formatCurrency(item.price)}</p>
        </div>
        <BootstrapButton
          startIcon={<MdOutlineAddShoppingCart />}
          variant="contained"
          disableRipple
          onClick={handleAddToCart}
        >
          Add to Cart
        </BootstrapButton>
      </div>
    </div>
  );
};

export default ShoppingItems;
