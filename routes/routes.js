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
        cb(null, file.originalname) 
    }
})

var upload = multer({
    storage: storage
});


const uploadCtrl = require('../controllers/uploadDoc.js');
const type = upload.array('upload');
router.post('/test', type, uploadCtrl.uploadDoc);



module.exports = router;