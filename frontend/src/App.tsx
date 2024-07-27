import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Categoty";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Variant from "./pages/Variant";
import AddVariant from "./pages/AddVariant";
import EditVariant from "./pages/EditVariant";
import TransactionHeader from "./pages/TransactionHeader";
import TransactionDetail from "./pages/TransactionDetail";
import Store from "./pages/Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Category" element={<Category />}></Route>
          <Route path="/AddCategory" element={<AddCategory />}></Route>
          <Route path="/EditCategory/:id" element={<EditCategory />}></Route>
          <Route path="/Product" element={<Product />}></Route>
          <Route path="/AddProduct" element={<AddProduct />}></Route>
          <Route path="/EditProduct/:id" element={<EditProduct />}></Route>
          <Route path="/Variant/:id" element={<Variant />}></Route>
          <Route path="/AddVariant/:id" element={<AddVariant />}></Route>
          <Route path="/EditVariant/:id" element={<EditVariant />}></Route>
          <Route path="/Transaction" element={<TransactionHeader />}></Route>
          <Route
            path="/TransactionDetail/:id"
            element={<TransactionDetail />}
          ></Route>
          <Route path="/Store" element={<Store />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
