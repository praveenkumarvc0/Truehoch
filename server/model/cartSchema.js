const mongoose = require('mongoose')
const User = require('./userSchema')
const Product = require('./listSchema')

const cartSchema = new mongoose.Schema({
     user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'users'
     },
     size:{
        type:String,
        required:true
     },
     qty:{
         type:Number,
         required:true
     },
     price:{
         type:Number,
         required:true
     },
     product:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'ProductDetail'
     }
})

module.exports=mongoose.model('cart',cartSchema)