import React, { useState, ChangeEvent } from "react";
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
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { saveCategorys } from "../features/categorySlice";
import { updateNotification } from "../features/notifSlice";

interface FormData {
  name: string;
  isActive: boolean;
}


const AddCategory = () => {
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
  const [errors, setErrors] = useState({
    name: ""
  });
  const validate = () => {
    const newErrors = {
      name: ""
    };
    let isValid = true;

    if (data.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {

      await dispatch(saveCategorys({ name: data.name, active: data.isActive }));
      dispatch(updateNotification({
        isOpen: true,
        message: "Category saved successfully",
        type: "success",  
      }));
      navigate("/Category");
    } catch (error) {
      console.error("Failed to save category:", error);
      dispatch(updateNotification({
        isOpen: true,
        message: "Failed to save category",
        type: "error", 
      }));
    }
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-5">
        <PageHeader
          title="Add Category"
          subtitle="Form Add Category"
          icon={<BiSolidCategory className="size-7" />}
        />
        </div>
        <div className="bg-gray-100 flex m-2">
          <div className="bg-white border-2 border-gray-300 w-1/2 mx-auto py-5 rounded-xl p-4 m-3">
            <Paper elevation={0} square className="rounded-lg m-3">
              <div className="p-2 flex mb-2 bg-gray-700 rounded-xl">
                <div className="p-2 text-white">
                  <Typography variant="h6" component="div">
                    Add Category
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
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
              </div>
              <div className="flex">
                <div className="w-11/12 p-1">
                  <FormGroup>
                  <FormControlLabel
                        control={<Checkbox
                          checked={data.isActive}
                          onChange={handleChange}
                          name="isActive"
                        />}
                        label="IsActive"
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

export default AddCategory;
