'use strict';

const dataProducts = require('../data/products');

const getCategorys = async (req, res, next) => {
    try {
        const datalist = await dataProducts.getCategorys();
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postCategory = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataProducts.postCategory(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCategory = async (req, res, next)=>{
    try {
        const id=req.params.id;
        const datalist = await dataProducts.deleteCategory(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const pacthCategory = async (req, res, next) => {
    try {
        const data =  req.body;
        const id=req.params.id;
        const datalist = await dataProducts.pacthCategory(id,data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const datalist = await dataProducts.getProduct();
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postProduct = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataProducts.postProduct(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next)=>{
    try {
        const id=req.params.id;
        const datalist = await dataProducts.deleteProduct(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const pacthProduct = async (req, res, next) => {
    try {
        const data =  req.body;
        const id=req.params.id;
        const datalist = await dataProducts.pacthProduct(id,data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getVariant = async (req, res, next) => {
    try {
        const id=req.params.id;
        const datalist = await dataProducts.getVariant(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getVariantDetail = async (req, res, next) => {
    try {
        const id=req.params.id;
        const datalist = await dataProducts.getVariantDetail(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postVariant = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataProducts.postVariant(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteVariant = async (req, res, next)=>{
    try {
        const id=req.params.id;
        const datalist = await dataProducts.deleteVariant(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const pacthVariant = async (req, res, next) => {
    try {
        const data =  req.body;
        const id=req.params.id;
        const datalist = await dataProducts.pacthVariant(id,data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTransactionHeader = async (req, res, next) => {
    try {
        const datalist = await dataProducts.getTransactionHeader();
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTransactionDetail = async (req, res, next) => {
    try {
        const id=req.params.id;
        const datalist = await dataProducts.getTransactionDetail(id);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getItems = async (req, res, next) => {
    try {
        const datalist = await dataProducts.getItems();
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const postTransactionHeader = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataProducts.postTransactionHeader(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postTransactionDetail = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataProducts.postTransactionDetail(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSummary = async (req, res, next) => {
    try {
        const datalist = await dataProducts.getSummary();
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
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
}