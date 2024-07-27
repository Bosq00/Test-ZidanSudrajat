"use strict";
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getCategorys = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("products");
    const loginData = await pool.request().query(sqlQueries.GetCategorys);

    const payload = {
      data: loginData.recordset, // Add your login data here
      // You can add more custom data if needed
    };

    return payload.data;
  } catch (error) {
    return error;
  }
};

const postCategory = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("Name", sql.VarChar, data.name)
      .input("Active", sql.Bit, data.active)
      .input("FullName", sql.VarChar, data.fullname)
      .query(sqlQueries.AddCategory);
    return { message: "Submitted Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const deleteCategory = async (id) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("ID", sql.Int, id)
      .query(sqlQueries.DeleteCategory);
    return { message: "Delete Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const pacthCategory = async (id, data) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("Name", sql.VarChar, data.name)
      .input("Active", sql.Bit, data.active)
      .input("FullName", sql.VarChar, data.fullname)
      .input("ID", sql.Int, id)
      .query(sqlQueries.UpdateCategory);
    return { message: "Updated Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const getProduct = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("products");
    const loginData = await pool.request().query(sqlQueries.GetProduct);

    const payload = {
      data: loginData.recordset, // Add your login data here
      // You can add more custom data if needed
    };

    return payload.data;
  } catch (error) {
    return error;
  }
};

const postProduct = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("Plu", sql.VarChar, data.plu)
      .input("Name", sql.VarChar, data.name)
      .input("Category_ID", sql.Int, data.category_id)
      .input("Active", sql.Bit, data.active)
      .input("FullName", sql.VarChar, data.fullname)
      .query(sqlQueries.AddProduct);
    return { message: "Submitted Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const deleteProduct = async (id) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("ID", sql.Int, id)
      .query(sqlQueries.DeleteProduct);
    return { message: "Delete Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const pacthProduct = async (id, data) => {
  try {
    let pool = await sql.connect(config.sql);

    const sqlQueries = await utils.loadSqlQueries("products");
    await pool
      .request()
      .input("Plu", sql.VarChar, data.plu)
      .input("Name", sql.VarChar, data.name)
      .input("Category_ID", sql.Int, data.category_id)
      .input("Active", sql.Bit, data.active)
      .input("FullName", sql.VarChar, data.fullname)
      .input("ID", sql.Int, id)
      .query(sqlQueries.UpdateProduct);
    return { message: "Updated Successfully", type: "success" };
  } catch (error) {
    return error.message;
  }
};

const getVariant = async (id) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request()
      .input("ID", sql.Int, id)
      .query(sqlQueries.GetVariant);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data;
    } catch (error) {
      return error;
    }
  };

  const getVariantDetail = async (id) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request()
      .input("ID", sql.Int, id)
      .query(sqlQueries.GetVariantDetail);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data;
    } catch (error) {
      return error;
    }
  };
  
 
  
  const postVariant = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
  
      const sqlQueries = await utils.loadSqlQueries("products");
      await pool
        .request()
        .input("Product_ID", sql.Int, data.product_id)
        .input("Code", sql.VarChar, data.code)
        .input("Name", sql.VarChar, data.name)
        .input("Image_Location", sql.VarChar, data.image_location)
        .input("Qty", sql.Int, data.qty)
        .input("Price", sql.Decimal, data.price)
        .input("Active", sql.Bit, data.active)
        .input("FullName", sql.VarChar, data.fullname)
        .query(sqlQueries.AddVariant);
      return { message: "Submitted Successfully", type: "success" };
    } catch (error) {
      return error.message;
    }
  };
  
  const deleteVariant = async (id) => {
    try {
      let pool = await sql.connect(config.sql);
  
      const sqlQueries = await utils.loadSqlQueries("products");
      await pool
        .request()
        .input("ID", sql.Int, id)
        .query(sqlQueries.DeleteVariant);
      return { message: "Delete Successfully", type: "success" };
    } catch (error) {
      return error.message;
    }
  };
  
  const pacthVariant = async (id, data) => {
    try {
      let pool = await sql.connect(config.sql);
  
      const sqlQueries = await utils.loadSqlQueries("products");
      await pool
        .request()
        .input("Code", sql.VarChar, data.code)
        .input("Name", sql.VarChar, data.name)
        .input("Image_Location", sql.VarChar, data.image_location)
        .input("Qty", sql.Int, data.qty)
        .input("Price", sql.Decimal, data.price)
        .input("Active", sql.Bit, data.active)
        .input("FullName", sql.VarChar, data.fullname)
        .input("ID", sql.Int, id)
        .query(sqlQueries.UpdateVariant);
      return { message: "Updated Successfully", type: "success" };
    } catch (error) {
      return error.message;
    }
  };

  const getTransactionHeader = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request().query(sqlQueries.GetTransactionHeader);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data;
    } catch (error) {
      return error;
    }
  };

  const getTransactionDetail = async (id) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request()
      .input("ID", sql.Int, id)
      .query(sqlQueries.GetTransactionDetail);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data;
    } catch (error) {
      return error;
    }
  };

  
  const getItems = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request()
      .query(sqlQueries.GetItems);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data;
    } catch (error) {
      return error;
    }
  };

  const postTransactionHeader = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
  
      const sqlQueries = await utils.loadSqlQueries("products");
      const Data = await pool.request()
        .input("Total_Amount", sql.Decimal, data.total)
        .input("FullName", sql.VarChar, data.fullname)
        .query(sqlQueries.AddTransactionHeader);
        const payload = {
          data: Data.recordset, // Add your login data here
          // You can add more custom data if needed
        };
    
        return payload.data[0];
    } catch (error) {
      return error.message;
    }
  };

  const postTransactionDetail = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
  
      const sqlQueries = await utils.loadSqlQueries("products");
      await pool
        .request()
        .input("Transaction_ID", sql.Int, data.transaction_id)
        .input("Product_Variant_ID", sql.Int, data.product_variant_id)
        .input("Price", sql.Decimal, data.price)
        .input("Qty", sql.Int, data.qty)
        .input("FullName", sql.VarChar, data.fullname)
        .query(sqlQueries.AddTransactionDetail);
      return { message: "Saved Successfully", type: "success" };
    } catch (error) {
      return error.message;
    }
  };

  const getSummary = async (data) => {
    try {
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries("products");
      const loginData = await pool.request().query(sqlQueries.GetSummary);
  
      const payload = {
        data: loginData.recordset, // Add your login data here
        // You can add more custom data if needed
      };
  
      return payload.data[0];
    } catch (error) {
      return error;
    }
  };
  
module.exports = {
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
};
