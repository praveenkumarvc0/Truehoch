const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },    
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetail'
      }
})

module.exports=mongoose.model('wishlist',wishlistSchema)