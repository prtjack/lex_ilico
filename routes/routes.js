const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.pdfuploadLocation)
    },
    filename: function (req, file, cb) {
       console.log(file);
        cb(null, file.originalname + '.pdf') 
    }
})

var upload = multer({
    storage: storage
});


const uploadCtrl = require('../controllers/uploadDoc.js');

router.post('/test', upload.array('upload',function(err){
    if(err){
        console.log('i am here!');
    }
}), uploadCtrl.uploadDoc);



module.exports = router;