import React, { useState, ChangeEvent, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import { BiSolidCategory } from "react-icons/bi";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate, useParams } from "react-router-dom";
import {
  productSelector,
  getProduct,
  updateProduct,
} from "../features/productSlice";
import { updateNotification } from "../features/notifSlice";
import { RootState } from "../redux/store";
import { categorySelector, getCategorys } from "../features/categorySlice";

interface FormData {
  plu: string;
  name: string;
  category_id: number;
  isActive: boolean;
}

const EditProduct: React.FC = () => {
  const buttonStyle = {
    backgroundColor: "#757575",
    color: "white",
    "&:hover": {
      backgroundColor: "#616161",
    },
    marginRight: "20px",
    marginLeft: "5px",
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FormData>({
    plu: "",
    name: "",
    category_id: 0,
    isActive: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string }>
  ) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;
    setData((prevData) => ({
      ...prevData,
      [name!]: type === "checkbox" ? checked : value,
    }));
  };

  const product = useAppSelector((state: RootState) =>
    productSelector.selectById(state, Number(id))
  );

  const categories = useAppSelector(categorySelector.selectAll);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setData({
        plu: product.plu,
        name: product.name,
        category_id: product.product_category_id,
        isActive: product.active,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProduct({
          id: Number(id),
          plu: data.plu,
          name: data.name,
          category_id: data.category_id,
          active: data.isActive,
        })
      );
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Product updated successfully",
          type: "success",
        })
      );
      navigate("/Product");
    } catch (error) {
      console.error("Failed to updated product:", error);
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Failed to updated product",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-5">
          <PageHeader
            title="Edit Product"
            subtitle="Form Edit Product"
            icon={<BiSolidCategory className="size-7" />}
          />
        </div>
        <div className="bg-gray-100 flex m-2">
          <div className="bg-white border-2 border-gray-300 w-1/2 mx-auto py-5 rounded-xl p-4 m-3">
            <Paper elevation={0} square className="rounded-lg m-3">
              <div className="p-2 flex mb-2 bg-gray-700 rounded-xl">
                <div className="p-2 text-white">
                  <Typography variant="h6" component="div">
                    Edit Product
                  </Typography>
                </div>
              </div>
            </Paper>
            <form onSubmit={handleSubmit}>
              <Card className="p-4 border-spacing-4">
                <div className="flex">
                  <div className="w-11/12 p-1">
                    <label className="text-lg font-medium">Plu</label>
                    <div className="flex">
                      <input
                        className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                        type="text"
                        name="plu"
                        onChange={handleChange}
                        value={data.plu}
                        placeholder="Enter product plu"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-11/12 p-1">
                    <label className="text-lg font-medium">Name</label>
                    <div className="flex">
                      <input
                        className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Enter product name"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-11/12 p-1">
                    <label className="text-lg font-medium">Category</label>
                    <div className="relative">
                      <select
                        onChange={handleChange}
                        name="category_id"
                        className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                        value={data.category_id}
                      >
                        <option value="">Select One</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-11/12 p-1">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={data.isActive}
                            onChange={handleChange}
                            name="isActive"
                          />
                        }
                        label="Is Active"
                      />
                    </FormGroup>
                  </div>
                </div>
              </Card>
              <div className="flex">
                <div className="mt-4">
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    href="/Product"
                    style={buttonStyle}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
