import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
} from "mui-datatables";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  transactiondetailSelector,
  getTransactionDetail,
} from "../features/transactiondetailSlice";
import { useParams } from "react-router-dom";
import {
  getTransactionHeader,
  transactionheaderSelector,
} from "../features/transactionheaderSlice";
import PageHeader from "../components/PageHeader";
import { BiSolidCategory } from "react-icons/bi";
import { Button } from "@mui/material";

const TransactionDetail = () => {
  const buttonStyle = {
    backgroundColor: "#757575",
    color: "white",
    "&:hover": {
      backgroundColor: "#616161",
    },
    marginRight: "20px",
    marginLeft: "5px",
  };

  const data = useSelector(transactiondetailSelector.selectAll);
  const dispatch = useAppDispatch();
  const formatPriceToIDR = (price: number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(getTransactionDetail(Number(id)));
  }, [dispatch]);

  const header = useAppSelector(transactionheaderSelector.selectAll);
  const headerData = header.filter((item) => item.id === Number(id));

  useEffect(() => {
    dispatch(getTransactionHeader());
  }, [dispatch]);

  console.log(header);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "product",
      label: "Product",
    },
    {
      name: "variant",
      label: "Product Variant",
    },
    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (price: number) => formatPriceToIDR(price),
      },
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
      name: "subtotal",
      label: "Sub Total",
      options: {
        customBodyRender: (subtotal: number) => formatPriceToIDR(subtotal),
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
          <PageHeader
            title="Transaction"
            subtitle="Transaction Detail"
            icon={<BiSolidCategory className="size-7" />}
          />
          <div className="border-2 rounded-lg p-2 mx-5">
            <div className="flex">
              <div className="w-1/2 p-1">
                <label className="text-lg font-medium">Transaction No :</label>
                <label className="text-lg font-medium px-1">
                  {headerData[0]?.transaction_no || ""}
                </label>
              </div>
              <div className="w-1/2 p-1">
                <label className="text-lg font-medium">Total Amount :</label>
                <label className="text-lg font-mediumpx-1">
                  {formatCurrency(headerData[0]?.total_amount | 0)}
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 p-1">
                <label className="text-lg font-medium">
                  Transaction Date :
                </label>
                <label className="text-lg font-medium px-1">
                  {headerData[0]?.created_date || ""}
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="mt-4">
                <Button
                  variant="contained"
                  href="/Transaction"
                  style={buttonStyle}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
          <div className="flex container mx-auto w-full h-full p-5">
            <div className="rounded-xl shadow-lg w-full h-full">
              <div className="p-5 flex flex-col">
                <div className="rounded-xl overflow-hidden">
                  <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                      title={"Transaction Detail List"}
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
      </div>
    </div>
  );
};

export default TransactionDetail;
