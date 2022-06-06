import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
import {Row,Col,Card,Button,Image, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



export class order extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            order:[]
             
        }
    }

    componentDidMount(){
        this.getOrders()
    }
    
    getOrders=()=>{
        const token=localStorage.getItem('userToken')
        const decoded = jwt_decode(token)
        const id=decoded.user.id

        Axios.post('http://localhost:7000/order/readuser',{id})
        .then((response)=>{
            console.log(response.data)
            this.setState({order:response.data})
        }).catch((err)=>{
            console.log(err)
        })


    }
    
    render() {
        const token=localStorage.getItem('userToken')
        const decoded = jwt_decode(token)
        const id=decoded.user.e_mail


       

       var renderSize=this.state.order.map((value,index)=><div>
           <Card className="border border-dark p-3 my-4">
               <Row className="mx-2 text-start border-bottom border-dark border-1">
                <p><span className="text-success fw-bold mx-5 my-auto" style={{fontSize:"18px"}}>{(value.status)}</span><span className="mx-5 fw-bold text-dark">Order No: {value._id}</span></p>
                <p className="mx-5"><small>Placed on <span className="mx-1">{value.date}</span><span className="mx-1">/</span><span className="mx-1">{value.products.length}</span><span className="mx-1">item</span></small></p>
               </Row>
               <Row>
                   <p className="fw-bold text-start float-start mt-4 ml-3"><span>Shipment {index+1}:</span><span className="ml-3">{value.products.length}</span><span className="ml-2">item</span><span className="mx-3">|</span>Expected to be delivered on Thursday , July 5, 2021<span><a href={`/cart/orderdetail/${value._id}`} className="float-end mr-5">View Details</a></span></p>
                   <p className="clearfix"></p>
               </Row>
               <Row className="mx-2 text-start">
               {value.products.map((product)=>{return(<Col lg={1} className="mx-5 text-start"><img src={product.product.imgURLs[0]}  width="140px" height="150px" /></Col>)})}
               </Row>
      </Card>
       </div> 
    )
        console.log(id)

        const output=()=>{
            if(this.state.order.length===0){
               return(
                   <div >
                      
                       <h5 className="fs-4 fst-italic" style={{marginTop:"200px"}}>No items in your order list</h5>
                       
                   </div>
               )
            }
            if(this.state.order.length !== 0){
                return(<p>{renderSize}</p>)
                
            }
        }
       
    var result=output()
        return (
            <div>
                
                <Row className="mt-5  ">
                    <Col lg={2} className="border-bottom border-dark border-1 " style={{marginLeft:"80px"}}>
                    <h5 className="text-dark text-start fw-bold">Account</h5>
                      <p className="text-muted text-start"><small >{id}</small></p>
                    </Col>
                    <Col lg={9} className="border-bottom border-dark border-1">
                    </Col>
                </Row>
                <Row>
                    <Col lg={2} style={{marginLeft:"80px"}} className="text-start border-dark border-1 border-end">
                    <h5 class="my-3">Overview</h5>
                     <hr class="my-4 border-dark border border-1" />
                     <span class="text-dark">ORDERS</span>
                     <h6 class=" fs-6 fw-bold text-success my-3">Orders & Returns</h6>
                     <hr class="my-4 border-dark border border-1" />
                    <span class="text-dark">CREDITS</span>
                    <ol class="list list-unstyled mt-2 fw-bold">
                        <li>Myntra Credit</li>
                        <li>Coupons</li>
                        <li>PhonePe Wallet</li>
                        <li>Rewards</li>
                         <li>Myntra Points</li>
                     </ol>
                <hr class="my-4 border-dark border border-1" />
                <span class="text-dark">ACCOUNT</span>
                <ol class="list list-unstyled mt-2 fw-bold">
                    <li>Profile</li>
                    <li>Saved Cards</li>
                    <li>Addresses</li>
                    <li>Myntra Insider</li>
                </ol>
                    </Col>
                <Col lg={9} >
                  {result}
                </Col>
                </Row>
            </div>
        )
    }
}

export default order
