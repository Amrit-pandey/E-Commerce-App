const Product = require('../models/product');

exports.postAddProduct = (req,res,next) =>{
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const userid = req.body.userid

    const product = new Product({
        name:name,
        price:price,
        image:image,
        description:description,
        userId:userid
    })
    product.save()
    .then(result=>{
        res.send({message:result})
    })
    .catch(err =>{
        console.log((err))
    })
}

exports.updateProduct = (req,res,next) =>{
    const prodId = req.body.prodId;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;

    Product.findById(prodId)
    .then(product =>{
        product.name = name;
        product.price = price;
        product.image = image;
        product.description = description;
        // product.prodId = prodId._id
        return product.save()
    })
    .then(result =>{
        res.send({message:result})
        console.log('product updated');
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteProduct = (req,res,next) =>{
    const prodId = req.query.prodId;
    Product.findByIdAndRemove(prodId)
    .then(result =>{
        res.send({message:result});
        
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.fetchAllProducts = (req,res,next) =>{
    const prodId = req.body.prodId;

    Product.find(prodId)
    .then(products =>{
        res.send({message:products});
        console.log('fetched products');
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.findProductById = (req,res,next) =>{
    const prodId = req.query.prodId;
     
    Product.findById(prodId)
    .then(product =>{
        res.send({message:product})
        console.log('product details fetched');
    })
    .catch(err =>{
        console.log(err);
    })
}