import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Summary {
  name: string;
  total_amount: number;
  category: number;
  product: number;
  variant: number;
}

export type StateJwtPayload = {
  UserName: string | null;
  FullName: string | null;
};

const storedToken = localStorage.getItem("token");
const decodedToken: StateJwtPayload | null = storedToken
  ? jwtDecode<StateJwtPayload>(storedToken)
  : null;

// Define async thunk
export const getSummary = createAsyncThunk<Summary>(
  "summary/getSummary",
  async () => {
    const response = await axios.get("http://localhost:8080/api/getSummary", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  }
);

const summaryEntity = createEntityAdapter({
  selectId: (items: Summary) => items.variant,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Create the slice
const summarySlice = createSlice({
  name: "summary",
  initialState: summaryEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSummary.fulfilled, (state, action) => {
      summaryEntity.setAll(state, [action.payload]); // Use an array for setAll
    });
  },
});

// Export selectors
export const summarySelector = summaryEntity.getSelectors(
  (state: { summary: ReturnType<typeof summaryEntity.getInitialState> }) =>
    state.summary
);

export default summarySlice.reducer;
