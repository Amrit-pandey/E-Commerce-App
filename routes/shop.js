const express = require('express');

const router = express.Router();

const shopController = require('../controller/shop')

router.get('/products',shopController.getAddProduct)

router.get('/product',shopController.getProductById)

router.get('/add-to-cart',shopController.addToCart)
// something

module.exports = router;