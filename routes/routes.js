const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.pdfuploadLocation)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '.pdf') 
    }
})

var upload = multer({
    storage: storage
});


const uploadCtrl = require('../controllers/uploadDoc.js');

router.post('/test', upload.array('upload'), uploadCtrl.uploadDoc);



module.exports = router;