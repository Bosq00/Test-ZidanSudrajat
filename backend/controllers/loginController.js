'use strict';

const dataLogins = require('../data/logins');

const getLogin = async (req, res, next) => {
    try {
        const data = req.body;
        const datalist = await dataLogins.getLogin(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const postRegister = async (req, res, next) => {
    try {
        const data =  req.body;
        const datalist = await dataLogins.postRegister(data);
        res.send(datalist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getLogin,
    postRegister
}