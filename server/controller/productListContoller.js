const ProductList = require('../model/listSchema')

exports.insert = (req,res)=>{
    const Product = new ProductList({
        imgURLs:req.body.imgURLs,
        productName:req.body.productName,
        desc:req.body.desc,
        sizes:req.body.sizes,
        price:req.body.price,
        existing_price:req.body.existing_price,
        offer:req.body.offer,
        color:req.body.color
    })
    Product.save()
    .then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
}

exports.get =(req,res)=>{
    ProductList.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.getOne=(req,res)=>{
    
    let productId=req.query.id
    ProductList.find({_id:{$in:productId}})
    .populate('writer')
    .exec((err,product)=>{
        if(err){
            res.send(err)
        }else{
            res.send(product)
        }
    })
    
}

exports.filterBrand=(req,res)=>{
    
    ProductList.find({productName:{$in:req.body.productName}})
    .then((data)=>{
        // console.log(data)
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.filterSize=(req,res)=>{

    ProductList.find({sizes:{$in:req.body.sizes}})
   
    .then((data)=>{
    //   console.log(data)
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.filterColor=(req,res)=>{

    ProductList.find({color:{$in:req.body.color}})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}


exports.update=(req,res)=>{
    ProductList.findOneAndUpdate({_id:req.params.id},{$set:{color:req.body.color}})
    .then((data)=>{
        // console.log(data)
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.sort=(req,res)=>{
    const value=req.body.value
    console.log(value)

    if(value==1){
        ProductList.find({}).sort({productName:1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
    }

    if(value==2){
        ProductList.find({}).sort({productName:-1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
    }

    if(value==3){
        ProductList.find({}).sort({price:1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
    }

    if(value==4){
        ProductList.find({}).sort({price:-1})
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch(error=>{
        console.log(error)
    })
    }
    
}