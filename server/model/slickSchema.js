const mongoose = require('mongoose')

const slickSchema = new mongoose.Schema({
     url:{
         type:String,
         required:true
     },
     slideName:{
         type:String,
         required:true
     }
})

module.exports=mongoose.model('Slick',slickSchema)