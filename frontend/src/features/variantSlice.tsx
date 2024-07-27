import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Variant {
  id: number;
  product_id: number;
  product: string;
  code: string;
  name: string;
  qty: number;
  image_location: string;
  price: number;
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

export const getVariant = createAsyncThunk<Variant[], number>(
  "variant/getVariant",
  async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getVariant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  }
);
export const getVariantDetail = createAsyncThunk<Variant[], number>(
  "variant/getVariantDetail",
  async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getVariantDetail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  }
);
export const saveVariant = createAsyncThunk<
  Variant,
  {
    product_id: number;
    code: string;
    name: string;
    image_location: string;
    qty: number;
    price: number;
    active: boolean;
  }
>(
  "variant/saveVariant",
  async ({ product_id, code, name, image_location, qty, price, active }) => {
    try {
      const response = await axios.post<Variant>(
        "http://localhost:8080/api/postVariant",
        {
          product_id: product_id,
          code: code,
          name: name,
          image_location: image_location,
          qty: qty,
          price: price,
          active: active,
          fullname: decodedToken?.FullName,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle error scenarios if needed
      throw Error("Failed to save variant");
    }
  }
);

export const deleteVariant = createAsyncThunk(
  "variant/deleteVariant",
  async (id: number) => {
    const storedToken = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/deleteVariant/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return id;
  }
);

export const updateVariant = createAsyncThunk<
  Variant,
  {
    id: number;
    code: string;
    name: string;
    image_location: string;
    qty: number;
    price: number;
    active: boolean;
  }
>(
  "variant/updateVariant",
  async ({ id, code, name, image_location, qty, price, active }) => {
    try {
      const response = await axios.patch<Variant>(
        `http://localhost:8080/api/pacthVariant/${id}`,
        {
          code: code,
          name: name,
          image_location: image_location,
          qty: qty,
          price: price,
          active: active,
          fullname: decodedToken?.FullName,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle error scenarios if needed
      throw Error("Failed to update variant");
    }
  }
);

const variantEntity = createEntityAdapter({
  selectId: (variant: Variant) => variant.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const variantSlice = createSlice({
  name: "variant",
  initialState: variantEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVariant.fulfilled, (state, action) => {
      variantEntity.setAll(state, action.payload);
    });
    builder.addCase(getVariantDetail.fulfilled, (state, action) => {
      variantEntity.setAll(state, action.payload);
    });
    builder.addCase(saveVariant.fulfilled, (state, action) => {
      variantEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteVariant.fulfilled, (state, action) => {
      variantEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateVariant.fulfilled, (state, action) => {
      variantEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

export const variantSelector = variantEntity.getSelectors(
  (state: any) => state.variant
);

export default variantSlice.reducer;
