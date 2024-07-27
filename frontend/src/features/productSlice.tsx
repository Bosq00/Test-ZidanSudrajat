import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Product {
  id: number;
  plu: string;
  name: string;
  product_category_id: number;
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

export const getProduct = createAsyncThunk<Product[]>(
  "product/getProduct",
  async () => {
    const response = await axios.get("http://localhost:8080/api/getProduct", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  }
);

export const saveProduct = createAsyncThunk<
  Product,
  { plu: string; name: string; category_id: number; active: boolean }
>("product/saveProduct", async ({ plu, name, category_id, active }) => {
  try {
    console.log()
    const response = await axios.post<Product>(
      "http://localhost:8080/api/postProduct",
      {
        plu: plu,
        name: name,
        category_id: category_id,
        active: active,
        fullname: decodedToken?.FullName,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error scenarios if needed
    throw Error("Failed to save product");
  }
});

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number) => {
    const storedToken = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/deleteProduct/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return id;
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  {
    id: number;
    plu: string;
    name: string;
    category_id: number;
    active: boolean;
  }
>("product/updateProduct", async ({ id, plu, name, category_id, active }) => {
  try {
    
    const response = await axios.patch<Product>(
      `http://localhost:8080/api/pacthProduct/${id}`,
      {
        plu: plu,
        name: name,
        category_id: category_id,
        active: active,
        fullname: decodedToken?.FullName,
      },
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error scenarios if needed
    throw Error("Failed to update product");
  }
});

const productEntity = createEntityAdapter({
  selectId: (product: Product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload);
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      productEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

export const productSelector = productEntity.getSelectors(
  (state: any) => state.product
);

export default productSlice.reducer;
