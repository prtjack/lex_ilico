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

function visionApi(req, res, next) {
    const imgData = res.mydata.info.message;
    var index = [];
    for (var i = 0; i < imgData.length; i++) {

        var temp = 'public/img/' + imgData[i].name;
        index[i] = new vision.Request({
            image: new vision.Image(temp),
            features: [

                new vision.Feature('TEXT_DETECTION')
            ]
        })


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
        for (var i = 0; i < googleres.responses.length; i++) {

            temp.push(googleres.responses[i]['fullTextAnnotation']['text']);
        }
        // for(var j=0;j<temp.length,j++){
        //     console.log(temp[j]);
        // }
        console.log(temp);
        
        fs.writeFile("public/json/Complaint.txt", temp, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        // const data = [
        //     "Metropolitian Magistrate NI act-12, Jaipur CC No. 10 of 2017 Date: 10/10/2017.BetweenMr. Khagesh Kachhwal, s/o, Premsukh Kachhwal, age 33 years, R/o, 102 MansarovarJaipur..ComplainantAndMr. Sushil Joshi, s/o Mr. Prakash Joshi, Age 40 years, R/o, 10/791 Malviya Nagar-302020Complaint under sec. 190 (2) of Crpc and Section 138 of Negotiable instrumentAct Dear Sir,Under the instructions and authority from my Client Mr. Khagesh Kachhwal, I do herebyserve notice of demand under Section 138 of the Negotiable Instrument Act, 1881:That as per our Loan agreement dated 20/06/2017 amount of Rs. 2000000 /- isto be submitted by you to my client as a security deposit for personal use. (to bereferred as 'Loan')2.That as per the terms of our Agreement, you issued four post dated chequebearing no. 29561 dated 01/09/2017 of total Rs. 2000000人in order to dischargeyour liability under the agreement and Indian laws. At the time of issuing thecheque, you assured my client that the same is good for value and will behonored as and when presented3The said cheque was presented on 09/09/2017 as for full amount but wasdishonored through return memo on 10/09/2017 stating Insufficient fund drawnon HDFC Bank, Mansarovar , Jaipur.4That despite a number of reminders, you considerably have failed to make thepayment due to my client and did not accede to the genuine request of my client.Furthermore, you started to put matter off and on, on the one pretext or the other.Now, since all the efforts made by my clients to receive what was due, my clienthas no other option but to get you served with the present legal notice,5.That you have considerably failed to comply with the provisions of the law andalso failed to discharge your liability from your account. Thus, you have issuedcheques which are bad for value and thereafter had got the same dishonoredintentionally and willfully.6. That on account of the above facts, you are liable to be prosecuted under sectiorn138 of the Negotiable Instrument Act, 1881as amended up to date under whichyou are liable to be punished with the imprisonment which may extend to twoyears or with fine which may extend to twice the amount of Cheque(s) or both.Cause of Action: The matter comes under ps mansarovar Jaipur.7.VerificationI, Mr. Khagesh Kachhwal, s/o, Premsukh Kachhwal, age 33 years, R/o, 102 MansarovarJaipur. Everything is true to my knowledge.Jaipur.Complainant",
        //     "NOTICE (Under Section 138 of Negotiable Instrument Act, 1881) Date: 20 / 09 / 2017 Mr. Sushil Joshi, s / o Mr.Prakash Joshi, Age 40 years, r / o, 10 / 791 Malviya Nagar - 302020 Sub: Legal notice under section 138 of Negotiable Instruments Act for dishonor of Cheque Dear Sir, Under the instructions and authority from my Client Mr. < Name > S / o < Father's Name> residing at < Permanent address > (to be referred as my 'Client'), I do hereby serve notice of demand under Section 138 of the Negotiable Instrument Act, 1881: That as per our Loan agreement dated 20 / 06 / 2017 amount of Rs. 2000000 / - is to be submitted by you to my client as a security deposit for personal use. (to be referred as 'Loan'). 2 That as per the terms of our Agreement, you issued four post dated cheque bearing no. 29561 dated 01 / 09 / 2017 of total Rs. 2000000 in order to discharge your liability under the agreement and Indian laws.At the time of issuing the cheque, you assured my client that the same is good for value and will be honored as and when presented The said cheque was presented on 09 / 09 / 2017 as for full amount but was dishonored through return memo on 10 / 09 / 2017 stating Insufficient fund drawn on HDFC Bank, Mansarovar, Jaipur. 4.That despite a number of reminders, you considerably have failed to make the payment due to my client and did not accede to the genuine request of my client Furthermore, you started to put matter off and on, on the one pretext or the other. Now, since all the efforts made by my clients to receive what was due, my clienthas no other option but to get you served with the present legal notice    That you have considerably failed to comply with the provisions of the law and    also failed to discharge your liability from your account.Thus, you have issued        , cheques which are bad for value and thereafter had got the same dishonored    intentionally and willfully.    That on account of the above facts, you are liable to be prosecuted under section    138 of the Negotiable Instrument Act, 1881 as amended up to date under which you are liable to be punished with the imprisonment which may extend to two    years or with fine which may extend to twice the amount of Cheque(s) or both    6.    That under these circumstances, I call upon you to make the payment of Rupees    2000000 / - being the principle amount of the aforesaid cheques with the interest    on the loaned amount as per our agreement, The charges for dishonor of        cheques along with the notice fee to my client either in cash or by demand draft    or Cheque which ever mode suits you better, within the period of 15(Fifteen)    days from the date of the receipt of this notice, failing which I wll be bound to    take further necessary action under the provisions of Negotiable Instrument Act,        1881and Indian Penal Code, 1860 against you in the competent court of law at    your own risk, cost(Litigation, travelling and other reasonable expenditure) and    consequences    PLEASE TAKE FINAL NOTICE.        7.    8.    Yours,        On behalf of:    Mr.Khagesh Kacchwal    102 Mansarovar, Jaipur"
        // ];
    
    
        // let findingDoc = require('../json/finding-doc.json');
        // let mainData = [];
        // data.map(fileData => {
        //     let matched = -1;
        //     let index = -1;
        //     for (let i = 0; i < findingDoc.length; i++) {
        //         let keywords = findingDoc[i].keywords;
        //         for (let j = 0; j < keywords.length; j++) {
        //             var re = new RegExp(keywords[j], "i");
        //             matched = fileData.search(re);
        //             console.log(matched);
    
        //             if (matched !== -1) {
        //                 index = i;
        //                 break;
        //             }
        //         }
        //         if (matched !== -1) {
        //             break;
        //         }
        //     }
    
        //     if (matched !== -1) {
        //         console.log(index);
        //         let metaDataDoc = require('../json/' + findingDoc[index].name + '.json');
        //         mainData.push({ type: findingDoc[index].name, data: metaDataDoc });
        //         findingDoc.splice(index, 1);
    
        //         console.log(findingDoc);
        //         // console.log(metaDataDoc);
        //         let currentIndex = 0;
        //         for (let i = 0; i < metaDataDoc.length; i++) {
        //             if (metaDataDoc[i].type === 'find') {
        //                 for (let j = 0; j < metaDataDoc[i].keywords.length; j++) {
        //                     var re = new RegExp(metaDataDoc[i].keywords[j], "i");
        //                     console.log('54: ', re);
    
        //                     matched = fileData.search(re);
        //                     console.log('57: ', matched);
    
        //                     if (matched !== -1) {
        //                         metaDataDoc[i].data = metaDataDoc[i].keywords[j];
        //                         break;
        //                     }
        //                 }
        //             } else {
        //                 for (let j = 0; j < metaDataDoc[i].keywords.length; j++) {
        //                     var re = new RegExp(metaDataDoc[i].keywords[j], "i");
        //                     console.log('68: ', re);
    
        //                     startIndex = fileData.search(re);
        //                     console.log('71: ', startIndex);
    
        //                     if (startIndex !== -1) {
        //                         fileData = fileData.slice(startIndex);
        //                         startIndex = 0;
        //                         var re = new RegExp(metaDataDoc[i].end, "i");
        //                         console.log('75: ', re);
        //                         let endIndex = fileData.search(re);
        //                         console.log(endIndex);
        //                         metaDataDoc[i].data = fileData.slice(startIndex + metaDataDoc[i].keywords[j].length, endIndex);
        //                         console.log('78: ', fileData.slice(startIndex + metaDataDoc[i].keywords[j].length + 1, endIndex));
        //                         fileData = fileData.slice(endIndex);
        //                         console.log('FileData', fileData);
        //                         break;
        //                     }
        //                 }
        //             }
        //         }
    
        //         console.log(metaDataDoc);
        //     }
        // });
        // res.json({ data: mainData });


    }, (e) => {
        console.log('Error: ', e)
    })

}