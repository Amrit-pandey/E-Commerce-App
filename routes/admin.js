const express = require('express');

const adminController = require('../controller/admin')

const router = express.Router();


// adding a product => POST
router.post('/add-product',adminController.postAddProduct);


 router.post('/update-product',adminController.updateProduct);

 router.post('/delete-product',adminController.deleteProduct);

  router.get('/products',adminController.fetchAllProducts);

  router.get('/product-details',adminController.findProductById);

// something

module.exports = router;