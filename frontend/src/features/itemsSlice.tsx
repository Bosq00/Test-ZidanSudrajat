import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Items {
  id: number;
  category: string;
  product: string;
  variant: string;
  qty: number;
  image_location: string;
  price: number;
}
export type StateJwtPayload = {
  UserName: string | null;
  FullName: string | null;
};

const storedToken = localStorage.getItem("token");
const decodedToken: StateJwtPayload | null = storedToken
  ? jwtDecode(storedToken)
  : null;

export const getItems = createAsyncThunk<Items[]>(
  "items/getItems",
  async () => {
    const response = await axios.get("http://localhost:8080/api/getItems", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  }
);
const itemsEntity = createEntityAdapter({
  selectId: (items: Items) => items.id,
  sortComparer: (a, b) => a.variant.localeCompare(b.variant),
});

const itemsSlice = createSlice({
  name: "items",
  initialState: itemsEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      itemsEntity.setAll(state, action.payload);
    });
  },
});

export const itemsSelector = itemsEntity.getSelectors(
  (state: any) => state.items
);

export default itemsSlice.reducer;
