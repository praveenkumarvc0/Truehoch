const Slick = require('../model/slickSchema')

exports.insertSlick = (req,res)=>{
    Slick.create({url:req.body.url,slideName:req.body.slideName})
    .then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
}

exports.getSlick =(req,res)=>{
    Slick.find({})
    .then((data)=>{
        
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.updateSlick=(req,res)=>{
    Slick.findOneAndUpdate({_id:req.params.id},{$set:{url:req.body.url,slideName:req.body.slideName}})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.deleteSlick=(req,res)=>{
    Slick.remove({_id:req.body.id})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}