import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface TransactionDetail {
  id: number;
  product: string;
  variant: string;
  price: number;
  qty: number;
  subtotal: number;
}
export type StateJwtPayload = {
  UserName: string | null;
  FullName: string | null;
};

const storedToken = localStorage.getItem("token");
const decodedToken: StateJwtPayload | null = storedToken
  ? jwtDecode(storedToken)
  : null;

export const getTransactionDetail = createAsyncThunk<
  TransactionDetail[],
  number
>("transactionDetail/getTransactionDetail", async (id: number) => {
  const response = await axios.get(
    `http://localhost:8080/api/getTransactionDetail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    }
  );
  return response.data;
});
const transactiondetailEntity = createEntityAdapter({
  selectId: (transactiondetail: TransactionDetail) => transactiondetail.id,
  sortComparer: (a, b) => a.variant.localeCompare(b.variant),
});

const transactiondetailSlice = createSlice({
  name: "transactiondetail",
  initialState: transactiondetailEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionDetail.fulfilled, (state, action) => {
      transactiondetailEntity.setAll(state, action.payload);
    });
  },
});

export const transactiondetailSelector = transactiondetailEntity.getSelectors(
  (state: any) => state.transactiondetail
);

export default transactiondetailSlice.reducer;
