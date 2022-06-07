const Wish= require('../model/wishlist')
const Product = require('../model/listSchema')
const User=require('../model/userSchema')
const Cart = require('../model/cartSchema')

exports.add=(req,res)=>{
    Product.findOne({_id:req.body.product})
    .then((product)=>{
        console.log(product._id)
        
        Wish.find({user:req.body.user,product:product._id})
         .then((wish)=>{
             console.log('product'+wish)
            if(wish.length===0){

                console.log("wish wish wish")
                new Wish({
                    user:req.body.user,
                    product:product._id
                }).save()
                .then((data)=>{
                    console.log(data)
                    Cart.findOneAndDelete({product:product._id,user:req.body.user})
                    .then((value)=>{console.log("Value"+value)})
                    .catch((err)=>{console.log(err)})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{}
        }).catch((err)=>{
            console.log(err)
        })

    }).catch((err)=>{
        console.log(err)
    })
}

exports.get=async(req,res)=>{

    await Wish.find({user:req.body.id})
    .populate('product')
    .populate('user')
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })

}

exports.delete=(req,res)=>{
    Wish.remove({_id:req.body.id})
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.addfromCart=(req,res)=>{
    Product.findOne({_id:req.body.id})
    .then((product)=>{
        console.log(product._id)
        Wish.find({user:req.body.user,product:product._id})
         .then((wish)=>{
             console.log('product'+wish)
            if(wish.length===0){

                console.log("wish wish wish")
                new Wish({
                    user:req.body.user,
                    product:product._id
                }).save()
                .then((data)=>{
                    console.log(data)
                    Cart.deleteOne({_id:req.body.cartid})
                    .then((value)=>{console.log("Value"+value)})
                    .catch((err)=>{console.log(err)})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{}
        }).catch((err)=>{
            console.log(err)
        })

    }).catch((err)=>{
        console.log(err)
    })
}