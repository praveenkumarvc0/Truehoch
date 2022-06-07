const mongoose = require('mongoose')

const productListSchema = new mongoose.Schema({
     imgURLs:{
         type:Array,
         required:true
     },
     productName:{
         type:String,
         required:true
     },
     desc:{
        type:String,
         required:true 
     },
     sizes:{
        type:Array,
        required:true
     },
     price:{
        type:Number,
         required:true  
     },
     existing_price:{
        type:Number,
        required:true  
     },
     offer:{
        type:String,
         required:true  
     },
     color:{
         type:String,
         required:true
     }

})

module.exports=mongoose.model('ProductDetail',productListSchema)