const express = require('express');
const router = express.Router();
const uploadCtrl = require('../controllers/uploadDoc.js');

router.post('/test', uploadCtrl.uploadDoc);



module.exports = router;