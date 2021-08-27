const express = require('express');

const shopController = require('../controller/shop')

const isNormalUser = require('../middleware/is-normalUser')

const router = express.Router();

router.get('/products',isNormalUser,shopController.getAddProduct)

router.get('/product',isNormalUser,shopController.getProductById)

router.get('/add-to-cart',isNormalUser,shopController.addToCart)
// something

module.exports = router;