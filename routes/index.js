var express = require('express');
var router = express.Router();
var SandBoxToDB = require('../DeCryptor/SandBoxToDB.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'JSDecoder' });
    SandBoxToDB(req.db, "C:/Users/vapaspen/Documents/Programing Projects/JSDecrypter/DataFiles/Samples", function(ListOfFiles){
        res.render('index', { title: 'JSDecoder', "ListOfFiles":ListOfFiles});

        console.log(ListOfFiles);

    });

});

module.exports = router;