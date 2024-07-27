import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import productReduser from "../features/productSlice";
import categoryReduser from "../features/categorySlice";
import notifReducer from "../features/notifSlice";
import variantReducer from "../features/variantSlice";
import transactionheaderReducer from "../features/transactionheaderSlice";
import transactiondetailReducer from "../features/transactiondetailSlice";
import itemsReducer from "../features/itemsSlice";
import checkoutReducer from "../features/checkoutSlice";
import cartReducer from "../features/cartSlice";
import summaryReducer from "../features/summarySlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReduser,
    category: categoryReduser,
    notif: notifReducer,
    variant: variantReducer,
    transactionheader: transactionheaderReducer,
    transactiondetail: transactiondetailReducer,
    items: itemsReducer,
    checkout: checkoutReducer,
    cart: cartReducer,
    summary: summaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
