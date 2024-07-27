import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface TransactionHeader {
  id: number;
  transaction_no: string;
  total_amount: number;
  active: boolean;
  created_user: string;
  created_date: string;
  update_user: string;
  update_date: string;
}
export type StateJwtPayload = {
  UserName: string | null;
  FullName: string | null;
};

const storedToken = localStorage.getItem("token");
const decodedToken: StateJwtPayload | null = storedToken
  ? jwtDecode(storedToken)
  : null;

export const getTransactionHeader = createAsyncThunk<TransactionHeader[]>(
  "transactionHeader/getTransactionHeader",
  async () => {
    const response = await axios.get(
      "http://localhost:8080/api/getTransactionHeader",
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return response.data;
  }
);
const transactionheaderEntity = createEntityAdapter({
  selectId: (transactionheader: TransactionHeader) => transactionheader.id,
  sortComparer: (a, b) => a.transaction_no.localeCompare(b.transaction_no),
});

const transactionheaderSlice = createSlice({
  name: "transactionheader",
  initialState: transactionheaderEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionHeader.fulfilled, (state, action) => {
      transactionheaderEntity.setAll(state, action.payload);
    });
  },
});

export const transactionheaderSelector = transactionheaderEntity.getSelectors(
  (state: any) => state.transactionheader
);

export default transactionheaderSlice.reducer;
