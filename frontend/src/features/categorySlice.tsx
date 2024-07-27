import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Category {
  id: number;
  name: string;
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

export const getCategorys = createAsyncThunk<Category[]>(
  "categorys/getCategorys",
  async () => {
    const response = await axios.get("http://localhost:8080/api/getCategorys", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  }
);

export const saveCategorys = createAsyncThunk<
  Category,
  { name: string; active: boolean }
>("categorys/saveCategorys", async ({ name, active }) => {
  try {
    const response = await axios.post<Category>(
      "http://localhost:8080/api/postCategory",
      {
        name: name,
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
    throw Error("Failed to save category");
  }
});

export const deleteCategory = createAsyncThunk(
  "categorys/deleteCategory",
  async (id: number) => {
    const storedToken = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/deleteCategory/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return id;
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: number; name: string; active: boolean }
>("categorys/updateCategory", async ({ id, name, active }) => {
  try {
    const response = await axios.patch<Category>(
      `http://localhost:8080/api/pacthCategory/${id}`,
      {
        name: name,
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
    throw Error("Failed to update category");
  }
});

const categoryEntity = createEntityAdapter({
  selectId: (category: Category) => category.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const categorySlice = createSlice({
  name: "category",
  initialState: categoryEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategorys.fulfilled, (state, action) => {
      categoryEntity.setAll(state, action.payload);
    });
    builder.addCase(saveCategorys.fulfilled, (state, action) => {
      categoryEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      categoryEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      categoryEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
  },
});

export const categorySelector = categoryEntity.getSelectors(
  (state: any) => state.category
);

export default categorySlice.reducer;
