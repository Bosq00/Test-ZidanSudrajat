import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
  isOpen: boolean;
}

const initialState: CheckoutState = {
  isOpen: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    openCheckout: (state) => {
      state.isOpen = true;
    },
    closeCheckout: (state) => {
      state.isOpen = false;
    },
    toggleCheckout: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { openCheckout, closeCheckout, toggleCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
