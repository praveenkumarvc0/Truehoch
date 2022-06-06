import axios from 'axios'
import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import './cart.css'
import {Link} from 'react-router-dom'
import {Row,Col,Card,Button,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag,faTruck,faGift, faWindowRestore} from '@fortawesome/free-solid-svg-icons'


export class cart extends Component {

    constructor(props) {
        super(props)
        var total=0

    
        this.state = {
             products:[],
             price:0
        }
    }

   

    
    componentDidMount(){
        console.log("Working")
        this.getCartRecords()
        

    }


    deleteCart=(id)=>{
        console.log(id)
        axios.post('http://localhost:7000/cart/delete',{id})
        .then((response)=>{
            console.log(response.data)
            this.setState({products:response.data})
           
            
           
         
        }).catch((err)=>{
            console.log(err)
        })

    }

    bagPrice=(price)=>{
       this.total=this.total+Number(price)
        console.log(this.total)

    }

    handlePrice=(event,price,id)=>{
        console.log(event.target.value)
      
       console.log(price)
      
      
       var qty=event.target.value
       var Pprice= price

       var totalPrice= qty* Pprice

       console.log(totalPrice)

       axios.put('http://localhost:7000/cart/update',{id,totalPrice,qty})
       .then(()=>{
           window.location="/cart"
           
       }).catch((err)=>{
           console.log(err)
       }) 
    }

    handleSize=(event,id)=>{
        console.log(event.target.value)
        console.log(id)

        var size=event.target.value
        var productid= id

        axios.put('http://localhost:7000/cart/updateSize',{size,productid})
        .then(()=>{
            window.location="/cart"
        }).catch((err)=>{
            console.log(err)
        }) 

    }

    getCartRecords=()=>{
        var token=localStorage.getItem('userToken')
         var  decoded = jwt_decode(token)
         var userID=decoded.user.id

         axios.post('http://localhost:7000/cart/getUser',{userID})
        .then((response)=>{
            console.log(response)
            console.log(response.data)
            this.setState({products:response.data})
            
           
            
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    addTowish=(cartid,id)=>{
        var token=localStorage.getItem('userToken')
         var  decoded = jwt_decode(token)
         var user=decoded.user.id

       axios.post('http://localhost:7000/wish/addfromcart',{id,cartid,user})

    }
    render() {

       const totalBagprice=()=>{
            var bagPrice=0
            this.state.products.map((value)=>{ bagPrice+= value.price} )
            return bagPrice
        }

        const discountPrice=()=>{
            var discount =0
            var totalDiscount=0
            this.state.products.map((value)=>{ discount= (value.price*10)/100
                totalDiscount+=discount
               
            } )
            return  Math.floor(totalDiscount)

        }

        const convenienceFee=()=>{
            var convenience=99
            var total=this.state.products.length

            var convenienceFee = convenience*total
            return convenienceFee
        }


        var renderDiscount=discountPrice()
       var renderPrice=totalBagprice()
       var renderConvenience=convenienceFee()
       var totalAmount=renderPrice-renderDiscount+renderConvenience

       console.log(renderPrice)
        
        var renderItems=this.state.products.length

      
           
    
        var renderCards = this.state.products.map((value)=> 
        <div>
            
            <Card className="mx-5 my-4 border-dark  border-2">
                <Row className="gt-0">
                <Col lg={3} md={6} xs={12} className="border-dark  border-3">
                    
                  <Image src={value.product.imgURLs[0]} height="260px" width="270px"  className="mr-5" alt="dress"/> 
                </Col>
                <Col lg={8} md={16} xs={32} className="mx-2">
                <Card.Body className="text-start">
                        <Card.Title><h3>{value.product.productName}</h3></Card.Title>
                                <Card.Text className="float-start ">
                                   <span>{value.product.desc}</span>
                                </Card.Text>
                                <Card.Text className="float-end fw-bold "><span >RS.{value.price}</span></Card.Text>
                                
                                <p className="clearfix"></p>
                                <div class="d-flex justify-content-start">
                                <label className="fw-bold mx-3">Size:</label>
                                    <select className="ms-2" defaultValue={value.size} onChange={e=>this.handleSize(e,value.product._id)} style={{width:"70px",height:"25px"}}>
                                        {value.product.sizes.map((size)=>{ return(<option value={size}>{size}</option>)}) }
                                    </select>
                                    <label className="fw-bold mx-3">Quantity:</label>
                                    <select className="ms-2" defaultValue={value.qty}  onChange={e=>this.handlePrice(e,value.product.price,value.product._id)}  style={{width:"70px",height:"25px"}}>
                                       <option value="1">1</option>
                                       <option value="2">2</option>
                                       <option value="3">3</option>
                                       <option value="4">4</option>
                                       <option value="5">5</option>
                                       
                                    </select>
                            </div>
             
                 </Card.Body>
                </Col>
                </Row>
                <Card.Footer className="bg-white text-start">
                    <a href="/cart" style={{margin:"0px 180px"}} onClick={()=>this.deleteCart(value._id)} className=" buttons btn  text-dark">Remove</a>
                    <span>|</span>
                    <a style={{margin:"0px 180px"}} href="/wishlist" onClick={()=>this.addTowish(value._id,value.product._id)} className=" buttons text-dark">Move to Wishlist</a>
                </Card.Footer>
                </Card>
          
            </div>      
        )
    
    const totalCart=()=>{
        if(this.state.products.length===0){
            return(<div>
                <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" /><br/>
                <p className="fst-italic fw-bold fs-3 my-4">Hey, it feels so light!</p>
                <p className=" fs-6 my-4 text-muted">There is nothing in your bag.Let's add some items</p>
                <a href="/productList" className="btn mt-4"style={{color:"blue",border:"1px solid blue"}}>Start Shopping</a>
            </div>)
  
        }else{
            return(<div>
                 <Row >
                      <Col lg={9} className="border-dark border-end">
                      <div className="">
                              <div className=" text-start card mx-5  mt-5 px-3">
                                   <h6 className="text-success fw-bold mt-2">Offers</h6>
                                      <ul>
                                          <li>10% Supercashback on MobiKwik</li>
                                          <li>Flat 200 Cashback on Airtel Payments Bank</li>
                                      </ul>
                               </div>
                               <div className="card card2 my-3 p-4 mx-5 text-start">
                                   <span><FontAwesomeIcon className="mx-3" icon={faTruck} /> Shop for <span className="fw-bold"
                                       style={{color:"rgb(255, 105, 218)"}}>Rs.173</span> more to get <span
                                      class="fw-bold text-dark">Free Delivery</span> </span>
                                  </div>
                <p className="fw-bold fs-5 text-start ms-5 my-4 float-start">My Shopping Bag items ( {renderItems} item)</p>
                <p className="fw-bold fs-5 text-start me-5 my-4 float-end">Rs.{renderPrice}</p>
                <p className="clearfix"></p>
              {renderCards}
              </div>
                      </Col>
                      <Col lg={3}>
                      <div className="container mt-5 text-start">
                              <h6>OPTIONS</h6>
                              <h6 className="float-start p-2"><i class="fa fa-tag me-2" aria-hidden="true"></i>Apply Coupons</h6>
                              <a href="" class=" float-end btn btn-outline-primary text-primary bg-white">APPLY</a>
                              <p className="clearfix"></p>
                              <hr className="my-3" />
                              <h6 className="float-start">Gift Wrap For Rs.25 </h6>
                              <FontAwesomeIcon icon={faGift} className="fa fa-gift fs-4 float-end"/>
                              <span className="clearfix"></span>
                              <small>Cash/Card on Delivery not available</small>
                               <hr className="my-3" />
                              <h6>PRICE DETAILS</h6>
                                   <div className="row">
                                       <div className="col-md-6">
                                          <ol className="list-unstyled fees">
                                                  <li>Total MRP</li>
                                                  <li>Discount on MRP</li>
                                                  
                                                   <li>Convenience Fee <a href="" class="text-decoration-none"> <small class="fw-bold"
                                                      style={{color:"#FF3F6C"}}>Know more</small></a></li>
                                                   <li></li>
                                           </ol>
                                       </div>
                                       <div class="col-md-6">
                                           <ol class="list-unstyled fees">
                                                   <li>Rs.<span id="mrp">{renderPrice}</span></li>
                                                  <li class="text-success">-Rs.<span id="disc">{renderDiscount}</span></li>
                                                  
                                                  <li>Rs.{renderConvenience}</li>
                                              </ol>
                                       </div>
                                       <hr class="mt-1" />
                                    <div class="row">
                                         <div class="col-md-6">
                                            <h6>Total Amount</h6>
                                          </div>
                                          <div class="col-md-6">
                                             <h6>Rs.<span id="total">{totalAmount}</span></h6>
                                          </div>
                                      </div>
                          <a href='/cart/address' class="btn text-white fw-bold  mt-2 mx-auto" 
                              style={{backgroundColor:"#FF3F6C"}}>CONTINUE</a>
                      </div>
                     
                  </div>
                      </Col>
                  </Row>
             
                 
              <footer class="bg-light mt-5 p-5 d-flex justify-content-center">
  
                  
  <img src="images/25bit.png" className="px-2" alt="25bit"/>
  <img src="images/visa.png" className="px-2" alt="Visa"/>
  <img src="images/mastercard.png" className="px-2" alt="mastercard"/>
  <img src="images/americanexpress.png" className="px-2" alt="25bit"/>
  <img src="images/diners.png" className="px-2" alt="25bit"/>
  <img src="images/netbanking.png" className="px-2" alt="25bit"/>
  <img src="images/cod.png" className="px-2" alt="25bit"/>
  <img src="images/rupay.png" className="px-2" alt="25bit"/>
  <img src="images/paypal.png" className="px-2" alt="25bit"/>
  <img src="images/bhim.png" className="px-2" alt="25bit"/>
  
  
  </footer>
            </div>)
        }
    }
      
        
        return (
            <div className="">
               {totalCart()}
            </div>
        )
    }
}

export default cart
