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
import { MdEditSquare } from "react-icons/md";
import { useAppDispatch } from "../redux/hook";
import { MdNewspaper } from "react-icons/md";
import {
  transactionheaderSelector,
  getTransactionHeader,
} from "../features/transactionheaderSlice";
import PageHeader from "../components/PageHeader";

const TransactionHeader = () => {
  const data = useSelector(transactionheaderSelector.selectAll);
  const dispatch = useAppDispatch();
  const formatPriceToIDR = (price: number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };
  useEffect(() => {
    dispatch(getTransactionHeader());
  }, [dispatch]);

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "transaction_no",
      label: "Transaction No",
    },
    {
      name: "total_amount",
      label: "Total Amount",
      options: {
        customBodyRender: (total_amount: number) =>
          formatPriceToIDR(total_amount),
      },
    },
    {
      name: "created_date",
      label: "Transaction Date",
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
            <div>
              <Button
                variant="outlined"
                endIcon={<MdEditSquare />}
                href={`/TransactionDetail/${value}`}
              >
                View Detail
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
                    title="Transaction"
                    subtitle="Transaction Header"
                    icon={<MdNewspaper className="size-7" />}
                  />
                  <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                      title={"Transaction Header List"}
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

export default TransactionHeader;
