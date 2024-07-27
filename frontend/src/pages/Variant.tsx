import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
} from "mui-datatables";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import { MdDeleteForever, MdEditSquare, MdNewspaper } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  deleteVariant,
  getVariant,
  variantSelector,
} from "../features/variantSlice";
import Notification from "../components/Notification";
import { updateNotification } from "../features/notifSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import PageHeader from "../components/PageHeader";

const Variant = () => {
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
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getVariant(Number(id)));
  }, [dispatch]);

  const data = useAppSelector((state: RootState) =>
    variantSelector.selectAll(state)
  );

  const handleDelete = (id: number) => {
    dispatch(deleteVariant(id));
    dispatch(
      updateNotification({
        isOpen: true,
        message: "Variant deleted successfully",
        type: "success",
      })
    );
  };
  const formatPriceToIDR = (price: number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };
  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "product",
      label: "Product",
    },
    {
      name: "code",
      label: "Code",
    },
    {
      name: "qty",
      label: "Qty",
      options: {
        customBodyRender: (qty: number | undefined) => (
          <>{qty !== undefined ? qty.toLocaleString() : ""}</>
        ),
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (price: number) => formatPriceToIDR(price),
      },
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
        customBodyRender: (value) => (
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
                href={`/EditVariant/${value}`}
              >
                Edit
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
      palette: {
        mode: "dark",
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
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
        <Header />
        <div className="container mx-auto p-5">
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <PageHeader
                title="Category"
                subtitle="Product Category"
                icon={<MdNewspaper className="size-7" />}
              />
              <div className="py-5">
                <Button variant="contained" href={`/AddVariant/${id}`}>
                  Add Variant
                </Button>
                <Button
                  className="ml-4"
                  variant="contained"
                  href="/Product"
                  style={buttonStyle}
                >
                  Back
                </Button>
              </div>

              <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Variant List"}
                  data={data}
                  columns={columns}
                  options={options}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    </div>
  );
};

export default Variant;
