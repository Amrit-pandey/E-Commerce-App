const express = require('express');

const adminController = require('../controller/admin')

const isAdminUser = require('../middleware/is-admin')

const router = express.Router();


// adding a product => POST
router.post('/add-product',isAdminUser,adminController.postAddProduct);


 router.post('/update-product',isAdminUser,adminController.updateProduct);

 router.post('/delete-product',isAdminUser,adminController.deleteProduct);

  router.get('/products',isAdminUser,adminController.fetchAllProducts);

  router.get('/product-details',isAdminUser,adminController.findProductById);

// something

module.exports = router;