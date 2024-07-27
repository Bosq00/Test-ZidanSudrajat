import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface CartItem {
  id: number;
  name: string;
  category: string;
  product: string;
  variant: string;
  qty: number;
  image_location: string;
  price: number;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

export type StateJwtPayload = {
  UserName: string | null;
  FullName: string | null;
};

const storedToken = localStorage.getItem("token");
const decodedToken: StateJwtPayload | null = storedToken
  ? jwtDecode(storedToken)
  : null;

export const saveTransaction = createAsyncThunk(
  "cart/saveTransaction",
  async (
    {
      cartItems,
      amount,
      total,
    }: { cartItems: CartItem[]; amount: number; total: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<{ id: number }>(
        "http://localhost:8080/api/postTransactionHeader",
        {
          total,
          fullname: decodedToken?.FullName,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const transactionId = response.data.id;
      if (transactionId) {
        await Promise.all(
          cartItems.map((item) =>
            axios.post(
              "http://localhost:8080/api/postTransactionDetail",
              {
                transaction_id: transactionId,
                product_variant_id: item.id,
                price: item.price,
                qty: item.amount,
                fullname: decodedToken?.FullName,
              },
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            )
          )
        );
      }
      return { cartItems, amount, total, transactionId };
    } catch (error) {
      return rejectWithValue("Failed to save transaction");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (cartItem) {
        cartItem.amount += 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }

      state.amount = state.cartItems.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
    },
    increase: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );

      if (item) {
        item.amount += 1;
        state.amount += 1;
        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );
      }
    },
    decrease: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];

        if (item.amount > 1) {
          item.amount -= 1;
          state.amount -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
          state.amount -= 1;
        }

        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );

      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
        state.amount = state.cartItems.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.amount,
          0
        );
      }
    },
    total: (state) => {
      let total = 0;
      state.cartItems.forEach((cartItem) => {
        total += cartItem.amount * cartItem.price;
      });
      state.total = total;
    },
    clear: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTransaction.fulfilled, (state, action) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    });
    builder.addCase(saveTransaction.rejected, (state, action) => {
      console.error(action.payload);
    });
  },
});

export const { addCart, increase, decrease, remove, clear, total } =
  cartSlice.actions;
export default cartSlice.reducer;
