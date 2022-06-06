const Gallery = require('../model/gallerySchema')
const Gallery1 = require('../model/gallery1Schema')
const Gallery2 = require('../model/gallery2schema')

exports.insertImg = (req,res)=>{
    Gallery.create({imgURL:req.body.imgURL,imgName:req.body.imgName})
    .then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
}

exports.getImg =(req,res)=>{
    Gallery.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.updateImg=(req,res)=>{
    Gallery.findOneAndUpdate({_id:req.params.id},{$set:{imgURL:req.body.imgURL,imgName:req.body.imgName}})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.deleteImg=(req,res)=>{
    Gallery.remove({_id:req.params.id})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}


// Controller for Gallery1

exports.insertgalImg = (req,res)=>{
    Gallery1.create({imgURL:req.body.imgURL,imgName:req.body.imgName})
    .then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
}

exports.getgalImg =(req,res)=>{
    Gallery1.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

exports.updategalImg=(req,res)=>{
    Gallery1.findOneAndUpdate({_id:req.params.id},{$set:{imgURL:req.body.imgURL}})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}

// Controller for gallery 2

exports.insertgal=(req,res)=>{
    Gallery2.create({imgURL:req.body.imgURL,imgName:req.body.imgName})
    .then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
}

exports.getgal=(req,res)=>{
    Gallery2.find({})
    .then((data)=>{
        res.send(data)
    }).catch(error=>{
        res.send(error)
    })
}