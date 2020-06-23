var express = require('express');
var router = express.Router();
var ProductModel = require("../model/product_model.js");

var model = new ProductModel();
// Lấy ra products theo cat
router.get('/categories/:categoryId/products', async function (req, res) {
    var categoryId = req.params.categoryId;
    var limit = req.query.limit;
    var resData = null;
    try {
        resData = await model.getProductsByCategory(categoryId, limit);
    } catch (error) {
        resData = error
    }
    res.json(resData);
})

// danh sách cat
router.get('/categories', async function (req, res) {
    var resData = null;
    try {
        resData = await model.getCategories();
    } catch (error) {
        res.send(error);
    }
    res.contentType = 'application/json';
    res.json(resData);
})

// Lấy category theo id
router.get('/categories/:id', async function (req, res) {
    var id = req.params.id;
    var resData = null;
    try {
        resData = await model.getCategoryById(id);
    } catch (error) {
        res.send(error);
    }
    res.contentType = 'application/json';
    res.json(resData[0]);
})

// get all collection
router.get('/all_collection', async function (req, res) {
    var resData = null;
    try {
        resData = await model.getAllCollection();
    } catch (error) {
        res.send(error);
    }
    res.contentType = 'application/json';
    res.json(resData);
})

// get all Product
router.get('/products', async function (req, res) {
    var resData = null;
    try {
        resData = await model.getAllProduct();
    } catch (error) {
        res.send(error);
    }
    res.contentType = 'application/json';
    resData.forEach(element => {
        element['origin_price'] = parseInt(element['origin_price']);
        element['sale_price'] = parseInt(element['sale_price']);
    });
    res.json(resData);
})

router.get('/product/:id', async function (req, res) {
    var id = req.params.id;
    var resData = null;
    try {
        resData = await model.getProductById(id);
    } catch (error) {
        res.send(error);
    }
    resData.forEach(element => {
        element['origin_price'] = parseInt(element['origin_price']);
        element['sale_price'] = parseInt(element['sale_price']);
    });
    res.contentType = 'application/json';
    res.json(resData[0]);
})

// Cập nhật product
router.put('/products/:id', async function (req, res) {
    var product = req.body;
    res.contentType = 'application/json';
    var resData = {
        success: true,
        data: null
    };
    try {
        resData.data = await model.updateProduct(product);
    } catch (error) {
        resData.success = false;
        resData.data = JSON.stringify(error);
        res.send(resData);
    }

    res.json(resData);
})

// Cập nhật product
router.post('/products', async function (req, res) {
    var product = req.body;
    res.contentType = 'application/json';
    var resData = {
        success: true,
        data: null
    };
    try {
        resData.data = await model.addProduct(product);
    } catch (error) {
        resData.success = false;
        resData.data = JSON.stringify(error);
        res.send(resData);
    }

    res.json(resData);
})

module.exports = router;