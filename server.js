const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

const app = express();
// var port = normalizePort(process.env.PORT || '80');


app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extendedmySecretKey: true,
    extended: false
}));
app.use(express.static(__dirname + '/public'));

app.use('/api', routes);

app.listen(80, function () {
    console.log("server is running on Port:" , 80);
});

module.exports = app;