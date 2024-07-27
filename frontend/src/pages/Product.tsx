import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
} from "mui-datatables";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { MdDeleteForever, MdEditSquare, MdNewspaper } from "react-icons/md";
import { useAppDispatch } from "../redux/hook";
import {
  productSelector,
  getProduct,
  deleteProduct,
} from "../features/productSlice";
import Notification from "../components/Notification";
import { updateNotification } from "../features/notifSlice";
import PageHeader from "../components/PageHeader";

const Product = () => {
  const data = useSelector(productSelector.selectAll);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
    dispatch(
      updateNotification({
        isOpen: true,
        message: "Product deleted successfully",
        type: "success",
      })
    );
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "plu",
      label: "Plu",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "category",
      label: "Category",
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (active) => (
          <p
            className={`capitalize px-3 py-2 inline-block rounded-full ${
              active ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {active ? "Active" : "Non Active"}
          </p>
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div className="flex">
            <div className="mr-2">
              <Button
                variant="outlined"
                startIcon={<MdDeleteForever />}
                color="error"
                onClick={() => handleDelete(value)}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                endIcon={<MdEditSquare />}
                color="success"
                href={`/EditProduct/${value}`}
              >
                Edit
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                endIcon={<MdEditSquare />}
                href={`/Variant/${value}`}
              >
                Add Variant
              </Button>
            </div>
          </div>
        ),
      },
    },
  ];

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, 50],
    download: false,
    print: false,
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {},
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
            },
            body: {
              padding: "7px 15px",
              color: "#e2e8f0",
            },
          },
        },
      },
    });
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="w-full h-full">
        <div className="w-full h-[call[100vh-50px]]">
          <Header />
          <div className="flex container mx-auto w-full h-full p-5">
            <div className="rounded-xl shadow-lg w-full h-full">
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                  <PageHeader
                    title="Product"
                    subtitle="Product"
                    icon={<MdNewspaper className="size-7" />}
                  />
                  <div className="py-5">
                    <Button variant="contained" href="/AddProduct">
                      Add Product
                    </Button>
                  </div>
                  <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                      title={"Product List"}
                      data={data}
                      columns={columns}
                      options={options}
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    </div>
  );
};

export default Product;
