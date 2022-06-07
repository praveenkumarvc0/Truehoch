module.exports = (app) => {
    const Slick = require('./controller/slickController')
    const Gallery=require('./controller/galleryController')
    const ProductList=require('./controller/productListContoller')
    const User = require('./controller/userController')
    const Cart = require('./controller/cartController')
    const Address=require('./controller/addressController')
    const Order = require('./controller/orderController')
    const Wish = require('./controller/wishlistController')

    // routes for Slick
    app.post('/postslick',Slick.insertSlick)
    app.get('/getSlick',Slick.getSlick)
    app.put('/updateSlick/:id',Slick.updateSlick)
    app.delete('/deleteSlick/:id',Slick.deleteSlick)
    

    // routes for gallery

    app.post('/postgallery',Gallery.insertImg)
    app.get('/getgallery',Gallery.getImg)
    
    app.put('/updateImg/:id',Gallery.updateImg)
    app.delete('/deleteGallery/:id',Gallery.deleteImg)

    // routes for gallery1
    app.post('/postgalleryimg',Gallery.insertgalImg)
    app.get('/getgalleryimg',Gallery.getgalImg)
    app.put('/updategalleryImg/:id',Gallery.updategalImg)


    // ROUTES FOR gallery2
    app.post('/postgal',Gallery.insertgal)
    app.get('/getgal',Gallery.getgal)
    

    //Routes for UserValues
        app.post('/signup',User.Signup)

        app.post('/login',User.login)
        app.post('/getUser',User.getUser)
        app.put('/updateuser',User.updateuser)
    

    //Routes for productList
    app.post('/insertProduct',ProductList.insert)
    app.get('/getProduct',ProductList.get)
    app.put('/update/:id',ProductList.update)
    app.post('/product/sort',ProductList.sort)

    // Routes for filters
    app.get('/filters',(req,res)=>{
        const filters=[{
            id:1,
            name:"Bundles",
            filters:['Bundles','Single Styles']
            
        },
        {
            id:2,
            name:"Country of Origin",
            filters:['All Countries','India'] 
        },
        {
            id:3,
            name:"Sizes",
            filters:['S','M','L','XL','XXL']
        }   
    ]
    res.send(filters)
    })

    //routes for product filtering brand
    app.post('/getProduct/filter',ProductList.filterBrand)


    //routes for filtering products based on sizes
    app.post('/getProduct/filter/size',ProductList.filterSize)

    //routes for filtering products based on color
    app.post('/getProduct/filter/color',ProductList.filterColor)


    //routes for productdetailpage

    app.get('/getOne/:id',ProductList.getOne)

    // routes for cart
    app.post('/cart/add',Cart.addCart)
    app.get('/cart/get',Cart.get)
    app.post('/cart/getUser',Cart.getUser)
    app.post('/cart/delete',Cart.deleteCart)
    app.put('/cart/update',Cart.updateCart)
    app.put('/cart/updateSize',Cart.updateSize)
    app.post('/cart/addfromwish',Cart.addFromWish)

    //routes for address

    app.post('/address/add',Address.addAddress)
    app.post('/address/get',Address.get)
    app.post('/address/delete',Address.delete)
    app.post('/address/getone',Address.getOne)
    app.put('/address/update',Address.update)

    // routes for order

    app.post('/order/add',Order.add)
    app.post('/order/readuser',Order.readUser)
    app.get('/order/read/:id',Order.readId)


    //routes for wishlist 

    app.post('/wish/add',Wish.add)
    app.post('/wish/get',Wish.get)
    app.post('/wish/delete',Wish.delete)
    app.post('/wish/addfromcart',Wish.addfromCart)
}