const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
     imgURL:{
         type:String,
         required:true
     },
     imgName:{
         type:String,
         required:true
     }
})

module.exports=mongoose.model('Gallery1',gallerySchema)

