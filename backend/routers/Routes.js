"use strict";

const express = require("express");
const loginController = require("../controllers/loginController");
const productController = require("../controllers/productController");
const router = express.Router();

const { getLogin, postRegister } = loginController;

const {
  getCategorys,
  postCategory,
  deleteCategory,
  pacthCategory,
  getProduct,
  postProduct,
  deleteProduct,
  pacthProduct,
  getVariant,
  postVariant,
  deleteVariant,
  pacthVariant,
  getTransactionHeader,
  getTransactionDetail,
  getVariantDetail,
  getItems,
  postTransactionHeader,
  postTransactionDetail,
  getSummary
} = productController;

const jwt = require("jsonwebtoken"); // Make sure to import the 'jsonwebtoken' library

const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    jwt.verify;
    return res.status(401).json({
      message: "Token expired",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

//Login
router.post("/getLogin", getLogin);
router.post("/postRegister", postRegister);
//product
router.get("/getCategorys", accessValidation, getCategorys);
router.post("/postCategory", accessValidation, postCategory);
router.delete("/deleteCategory/:id", accessValidation, deleteCategory);
router.patch("/pacthCategory/:id", accessValidation, pacthCategory);
router.get("/getProduct", accessValidation, getProduct);
router.post("/postProduct", accessValidation, postProduct);
router.delete("/deleteProduct/:id", accessValidation, deleteProduct);
router.patch("/pacthProduct/:id", accessValidation, pacthProduct);
router.get("/getVariant/:id", accessValidation, getVariant);
router.get("/getVariantDetail/:id", accessValidation, getVariantDetail);
router.post("/postVariant", accessValidation, postVariant);
router.delete("/deleteVariant/:id", accessValidation, deleteVariant);
router.patch("/pacthVariant/:id", accessValidation, pacthVariant);
router.get("/getTransactionHeader", accessValidation, getTransactionHeader);
router.get("/getTransactionDetail/:id", accessValidation, getTransactionDetail);
router.get("/getItems", accessValidation, getItems);
router.post("/postTransactionHeader",accessValidation,postTransactionHeader);
router.post("/postTransactionDetail",accessValidation,postTransactionDetail);
router.get("/getSummary", accessValidation, getSummary);
module.exports = {
  routes: router,
};
