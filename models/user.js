const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _get = require('lodash').get;
const _filter = require('lodash').filter;

const userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    resetToken:String,
    resetTokenExpiration:Date,
    // userId:{
    //     type:Schema.Types.ObjectId
    // },
    userType:{
        type:Number
    },
    cart:{
        items:[
            {
                productId:{type:Schema.Types.ObjectId,ref:'Product',},
                 
                quantity:{type:Number}
            }
        ]
    }
})

userSchema.methods.addToCart = function(productId){
    let newQuantity = 1;
    let updatedCartItems = [..._get(this.cart,'items',[])];
    let productIndex = _get(this.cart,'items',[]).findIndex(item =>{
        return item.productId.toString() === productId.toString()
    })
    if(productIndex >= 0){
        newQuantity = _get(this.cart,'items',[])[productIndex].quantity + 1;
        updatedCartItems[productIndex].quantity = newQuantity;
    }else{
        updatedCartItems.push({
            productId:productId,
            quantity:1
        });
    }
    let updatedCart = {
        items:updatedCartItems
    }
    this.cart ={...updatedCart}
    return this.save()
    
}

module.exports = mongoose.model('User',userSchema);