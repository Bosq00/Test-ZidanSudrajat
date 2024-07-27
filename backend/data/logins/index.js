'use strict';
const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");
const jwt = require("jsonwebtoken");

var Crypto = require('crypto');
var secret_key = 'fd85b494-aaaa';
var secret_iv = 'smslt';
var encryptionMethod = 'AES-256-CBC';
var key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
var iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);


function encrypt_string(plain_text, encryptionMethod, secret, iv) {
    var encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv);
    var aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
    return Buffer.from(aes_encrypted).toString('base64');
};

function decrypt_string(encryptedMessage, encryptionMethod, secret, iv) {
    const buff = Buffer.from(encryptedMessage, 'base64');
    encryptedMessage = buff.toString('utf-8');
    var decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv);
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
};


const getLogin = async (data) => {
    try {
        
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('logins');
   
        const loginData = await pool.request()
            .input('UserName', sql.VarChar, data.username)
            .input('Password', sql.VarChar, encrypt_string(data.password, encryptionMethod, key, iv))
            .query(sqlQueries.GetLogin);

        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 24 * 1;
        // Create a custom payload for the JWT
        const payload = {
            userData: loginData.recordset, // Add your login data here
            // You can add more custom data if needed
        };
        const msg=payload.userData[0].msg;
        const role=payload.userData[0].role;
        if(msg=='success'){
             const token= jwt.sign(payload.userData[0], secret, { expiresIn: expiresIn });
             return {token,msg,role};  
        }
       
        return {msg};  

    } catch (error) {
        return error
    }
}

const postRegister= async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        
        const sqlQueries = await utils.loadSqlQueries('logins');
        await pool.request()
            .input('UserName',sql.VarChar,data.username)
            .input('Password',sql.VarChar,encrypt_string(data.password, encryptionMethod, key, iv))
            .input('FullName',sql.VarChar,data.fullname)
            .input('Role',sql.VarChar,data.role)
            .query(sqlQueries.AddUser);
        return {message:'Submitted Successfully',
                type:'success'
        };
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getLogin,
    postRegister
}  