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
  categorySelector,
  getCategorys,
  updateCategory,
} from "../features/categorySlice";
import { updateNotification } from "../features/notifSlice";
import { RootState } from "../redux/store"; // Assuming this is your RootState type

interface FormData {
  name: string;
  isActive: boolean;
}

const EditCategory: React.FC = () => {
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
    name: "",
    isActive: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const category = useAppSelector((state: RootState) =>
    categorySelector.selectById(state, Number(id))
  );

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setData({
        name: category.name,
        isActive: category.active,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCategory({
          id: Number(id),
          name: data.name,
          active: data.isActive,
        })
      );
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Category updated successfully",
          type: "success",
        })
      );
      navigate("/Category");
    } catch (error) {
      console.error("Failed to updated category:", error);
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Failed to updated category",
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
            title="Edit Category"
            subtitle="Form Edit Category"
            icon={<BiSolidCategory className="size-7" />}
          />
        </div>
        <div className="bg-gray-100 flex m-2">
          <div className="bg-white border-2 border-gray-300 w-1/2 mx-auto py-5 rounded-xl p-4 m-3">
            <Paper elevation={0} square className="rounded-lg m-3">
              <div className="p-2 flex mb-2 bg-gray-700 rounded-xl">
                <div className="p-2 text-white">
                  <Typography variant="h6" component="div">
                    Edit Category
                  </Typography>
                </div>
              </div>
            </Paper>
            <form onSubmit={handleSubmit}>
              <Card className="p-4 border-spacing-4">
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
                        placeholder="Enter category name"
                      />
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
                    href="/Category"
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

export default EditCategory;
