// const path = require('path')
const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
         required:true
    },
    price:{
        type:Number,
        
        
    },
    image:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    
})

module.exports = mongoose.model('Product',productSchema)