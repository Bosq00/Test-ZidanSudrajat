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
import { getProduct, productSelector } from "../features/productSlice";
import { updateNotification } from "../features/notifSlice";
import { saveVariant } from "../features/variantSlice";
import { useSelector } from "react-redux";

interface FormData {
  product_id: number;
  code: string;
  name: string;
  image_location: string | ArrayBuffer | null;
  qty: number;
  price: number;
  active: boolean;
}

const AddVariant: React.FC = () => {
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
    product_id: 0,
    code: "",
    name: "",
    image_location: "", // Initially empty string
    qty: 0,
    price: 0,
    active: false,
  });
  const [errors, setErrors] = useState({
    code: "",
    name: "",
    qty: "",
    price: "",
  });
  const [imageBase64, setImageBase64] = useState<string>(""); // State to hold base64 image

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLInputElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (
      type === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        setData((prevData) => ({
          ...prevData,
          image_location: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (type === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(productSelector.selectAll);
  const productData = product.filter((item) => item.id === Number(id));

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const validate = () => {
    const newErrors = {
      code: "",
      name: "",
      qty: "",
      price: "",
    };
    let isValid = true;

    if (data.code.trim() === "") {
      newErrors.code = "Code is required";
      isValid = false;
    }
    if (data.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (data.qty === 0) {
      newErrors.qty = "Qty is required";
      isValid = false;
    }
    if (data.price === 0) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(
        saveVariant({
          product_id: Number(id),
          code: data.code,
          name: data.name,
          image_location: imageBase64,
          qty: data.qty,
          price: data.price,
          active: data.active,
        })
      );
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Variant saved successfully",
          type: "success",
        })
      );
      navigate(`/Variant/${id}`);
    } catch (error) {
      console.error("Failed to save variant:", error);
      dispatch(
        updateNotification({
          isOpen: true,
          message: "Failed to save variant",
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
            title="Add Variant"
            subtitle="Form Add Variant"
            icon={<BiSolidCategory className="size-7" />}
          />
        </div>
        <div className="bg-gray-100 flex m-2">
          <div className="bg-white border-2 border-gray-300 w-[70%] mx-auto py-5 rounded-xl p-4 m-5">
            <Paper elevation={0} square className="rounded-lg m-3">
              <div className="p-2 flex mb-2 bg-gray-700 rounded-xl">
                <div className="p-2 text-white">
                  <Typography variant="h6" component="div">
                    Add Variant
                  </Typography>
                </div>
              </div>
            </Paper>
            <form onSubmit={handleSubmit}>
              <Card className="p-2 border-spacing-4">
                <div className="p-2 border-2 rounded-lg">
                  <div className="flex">
                    <div className="w-1/2 p-1">
                      <label className="text-lg font-medium">Product</label>
                      <div className="flex">
                        <input
                          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                          type="text"
                          name="product"
                          value={productData[0]?.name || ""}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-1/2 p-1">
                      <label className="text-lg font-medium">Code</label>
                      <div className="flex">
                        <input
                          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                          type="text"
                          name="code"
                          onChange={handleChange}
                          placeholder="Enter your code"
                        />
                      </div>
                      {errors.code && (
                        <p className="text-red-500 text-sm">{errors.code}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-1">
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
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>
                    <div className="w-1/2 p-1">
                      <label className="text-lg font-medium">Image</label>
                      <div className="flex">
                        <input
                          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                          type="file" // Change input type to file
                          accept="image/*" // Restrict file type to images
                          onChange={handleChange}
                          name="image_location"
                          placeholder="Choose image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-1">
                      <label className="text-lg font-medium">Qty</label>
                      <div className="flex">
                        <input
                          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                          type="number"
                          name="qty"
                          onChange={handleChange}
                          placeholder="Enter your qty"
                        />
                      </div>
                      {errors.qty && (
                        <p className="text-red-500 text-sm">{errors.qty}</p>
                      )}
                    </div>
                    <div className="w-1/2 p-1">
                      <label className="text-lg font-medium">Price</label>
                      <div className="flex">
                        <input
                          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent"
                          type="number"
                          name="price"
                          onChange={handleChange}
                          placeholder="Enter your price"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-500 text-sm">{errors.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 p-1">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.active}
                              onChange={handleChange}
                              name="active"
                            />
                          }
                          label="IsActive"
                        />
                      </FormGroup>
                    </div>
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
                    href={`/Variant/${id}`}
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

export default AddVariant;
