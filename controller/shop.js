const Product = require('../models/product')

exports.getAddProduct = (req,res,next) =>{
    //  const prodId = req.body.prodId;
    Product.find()
    .then(products =>{
        if(Array.isArray(products)){
            res.status(200).send({message:products})
        }
        
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getProductById = (req,res,next) =>{
    const prodId = req.query.prodId;

    Product.findById(prodId)
    .then(product =>{
         res.send({message:product})
        
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.addToCart = (req,res,next) =>{
    const prodId = req.query.prodId;

    Product.findById(prodId)
    .then(product =>{
        if(!product){
            res.send({message:'invalid Product id'})
        }
     req.user
     .addToCart(prodId)
       .then(result =>{
           console.log(result);
       })
       .catch(err =>{
           console.log(err);
       })
       
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.removeItemFromCart = (req,res,next) =>{
    const prodId = req.query.prodId;
    req.user
          .removeItemFromCart(prodId)
          .then()
          .catch(err =>{
              console.log(err);
          })
}