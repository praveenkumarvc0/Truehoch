const User = require('../model/userSchema')
const Cart = require('../model/cartSchema')
const Product = require('../model/listSchema')
const Wish = require('../model/wishlist')


exports.addCart =(req,res)=>{
   Product.findOne({_id:req.body._id})
    .then(async (data)=>{
        console.log(data.sizes)
       User.findOne({_id:req.body.id})
        .then(async (datas)=>{
          Cart.findOne({product:data.id,user:datas.id})
           .then(async (cart)=>{
               if(cart){}
               else{
                  new Cart({
                       user:datas.id,
                       size:data.sizes[0],
                       product:data.id,
                       price:data.price,
                       qty:1
                   }).save()
                   .then(cards=>{
                       console.log(cards)
                   }).catch((err)=>{
                       console.log(err)
                   })
               }
           })
        })
    })
}


exports.get=(req,res)=>{
    Cart.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })

}

exports.getUser= (req,res)=>{
  Cart.find({user:req.body.userID}).limit(5)
    .populate('product')
    .populate('user')
    .then((cartData)=>{
        // console.log(req.body.userID)
        res.send(cartData)
    }).catch((err)=>{
        console.log(err)
    })  
}

exports.updateCart=(req,res)=>{
    console.log(req.body.totalPrice)
    console.log(req.body.id)
     Cart.findOneAndUpdate({product:req.body.id},{$set:{price:req.body.totalPrice,qty:req.body.qty}})
    .then((cart)=>{
        res.send(cart)
    }).catch((err)=>{
        console.log(err)
    })
   
}

exports.updateSize=(req,res)=>{
    console.log(req.body.size)
    console.log(req.body.productid)

    Cart.findOneAndUpdate({product:req.body.productid},{$set:{size:req.body.size}})
    .then((cart)=>{
        res.send(cart)
    }).catch((err)=>{
        console.log(err)
    })
}

exports.deleteCart=(req,res)=>{
    console.log(req.body.id)
    Cart.remove({_id:req.body.id})
    .then((cartData)=>{
       
        res.send(cartData)
    }).catch((err)=>{
        console.log(err)
    })  
}


exports.addFromWish=(req,res)=>{
    Product.findOne({_id:req.body.id})
    .then(async (data)=>{
        console.log(data.sizes)
       User.findOne({_id:req.body.userid})
        .then(async (datas)=>{
          Cart.findOne({product:data.id,user:datas.id})
           .then(async (cart)=>{
               if(cart){
                Wish.deleteOne({_id:req.body.wishid})
                .then((data)=>{
                    console.log("Deleted successfully " + data)
                }).catch((err)=>{
                    console.log(err)
                })
               }
               else{
               
                  new Cart({
                       user:datas.id,
                       size:data.sizes[0],
                       product:data.id,
                       price:data.price,
                       qty:1
                   }).save()
                   .then(cards=>{
                       console.log(cards)
                       Wish.deleteOne({_id:req.body.wishid})
                            .then((data)=>{
                                 console.log("Deleted successfully " + data)
                            }).catch((err)=>{
                                 console.log(err)
                            })
                       
                   }).catch((err)=>{
                       console.log(err)
                   })
               }
           })
        })
    })

}