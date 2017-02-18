/**
 * Created by vapaspen on 2/17/2017.
 */
var express = require('express');
var router = express.Router();
var SandBoxToDB = require('../DeCryptor/SandBoxToDB.js');


router.get('/', function(req, res, next) {
    SandBoxToDB(req.db, "C:/Users/vapaspen/Documents/Programing Projects/JSDecrypter/DataFiles", function(ListOfFiles){
        console.log(ListOfFiles);

    });
    next();
});