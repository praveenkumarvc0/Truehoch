const mongoose=require('mongoose')
const User= require('./userSchema')


const orderSchema = new mongoose.Schema({

    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ProductDetail'
        },
        qty:{
            type:Number,
            required:true
        },
        size:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }

    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    address:{
        name:{
            type:String,
            required:true
        },
        door_no:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        locality:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        addresstype:{
            type:String,
            required:true
        },
        phone_no:{
            type:Number,
            required:true
        }
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('order',orderSchema)