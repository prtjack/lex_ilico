module.exports = {
    uploadDoc: uploadDoc,

}
const pdf2img = require('pdf2img');
const fs = require('fs');
const path = require('path');


function uploadDoc(req, res, next) {
    console.log(req.file);
    res.send('file upload succesfully!');
    // pdf2img.setOptions({
    //     type: 'png', // png or jpg, default jpg 
    //     size: 1024, // default 1024 
    //     density: 600, // default 600 
    //     // outputdir: __dirname + req.fieldname + "/" + req.originalname + 'output', // output folder, default null (if null given, then it will create folder name same as file name) 
    //     // outputname: 'test', // output file name, dafault null (if null given, then it will create image name same as input name) 
    //     page: null // convert selected page, default null (if null given, then it will convert all pages) 
    // });
    // // input = "/public/pdf/" + req.file.originalname;
    // // console.log(input);
    // pdf2img.convert(req.file.path, function (err, info) {
    //     if (err) console.log(err)
    //     else console.log(info);
    // });

}