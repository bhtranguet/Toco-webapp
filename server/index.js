var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var productController = require('./controller/product_controller');
var uploadController = require('./controller/upload_controller');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// static_foler upload
app.use('/upload', express.static('upload'));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // Pass to next layer of middleware
    next();
});

app.use('/api/product_controller', productController);

app.use('/upload', uploadController);

// danh sách cat
app.get('/', async function (req, res) {
    res.json({ a: 1 });
})

var server = app.listen('8000', function () {
    console.log('server is running at ' + server.address().port);
})