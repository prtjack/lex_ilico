module.exports = {
    uploadDoc: uploadDoc,
    visionApi: visionApi
}
const pdf2img = require('pdf2img');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');
const vision = require('node-cloud-vision-api');


function uploadDoc(req, res, next) {
    console.log(req.files);
    pdf2img.setOptions({
        type: 'png', // png or jpg, default jpg 
        size: 1024, // default 1024 
        density: 600, // default 600 
        outputdir: "public/img/", // output folder, default null (if null given, then it will create folder name same as file name) 
        outputname: req.files[0].originalname, // output file name, dafault null (if null given, then it will create image name same as input name) 
        page: null // convert selected page, default null (if null given, then it will convert all pages) 
    });
  
    const temp = req.files[0].path;
    
    pdf2img.convert(temp, function (err, info) {
        if (err) console.log(err)
        else {
            // console.log(info);
            res.mydata = {};
            res.mydata.info = info;
            visionApi(req, res, next)
            res.end();
        }
    });

}

function visionApi(req, res,next) {
    // console.log(res.mydata.info.message);
    const imgData = res.mydata.info.message;
    var index = [];
    for (var i = 0; i < imgData.length; i++) {
        // console.log(i)
        var temp = 'public/img/' + imgData[i].name;
        // var imgArr = [];
        index[i] = new vision.Request({
            image: new vision.Image(temp),
            features: [

                new vision.Feature('TEXT_DETECTION')
            ]
        })

        // imgArr.push(i);
        // console.log(temp);
    }
    
    vision.init({
        auth: 'AIzaSyCHbzyKXWPkBKmZkuRTgtVWDiq4Y-RJYTE'
    })
    

    // sending multiple rqst
    vision.annotate(index).then((googleres) => {
        // handling response
        console.log('hi');
        var data = JSON.stringify(googleres.responses);
        var temp = []
        for(var i=0;i<googleres.responses.length;i++){
             
            temp.push(googleres.responses[i]['fullTextAnnotation']['text']);
        }
       
       console.log(temp.length);
        fs.writeFile("public/json/new.txt", temp, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
    }, (e) => {
        console.log('Error: ', e)
    })

}