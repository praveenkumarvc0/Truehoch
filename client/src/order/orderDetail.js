import React, { Component } from 'react'
import Axios from 'axios'
import {Row,Col,Card,Button,Image, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons'
import Modal from 'react-modal'

export class orderDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             record:[],
             open:false
        }
    }

    componentDidMount(){
        this.getRecord()
    }

    show=()=>{
        this.setState({open:true})
    }

    hide=()=>{
        this.setState({open:false})
    }
    getRecord=()=>{
        let id = this.props.match.params.id;
        Axios.get(`http://localhost:7000/order/read/${id}`)
        .then((response)=>{
            console.log(response.data)
            this.setState({record:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    render() {
        const value=this.state.record.map((data)=><div>
            <Row className="my-4 mx-5">
                <Card>
                    <Row className="border-1 border-bottom border-dark mx-3 text-start ">
                   <Col lg={2} className=" mx-5 my-3" >
                  <span>Shipment</span><br/>
                  <span className="fw-bold fs-5">Rs.<span>{data.price}</span><span><FontAwesomeIcon onMouseEnter={this.show}  className="ml-2" style={{color:"grey"}} icon={faQuestionCircle} /></span></span>
                   </Col>
                   <Col lg={2} className="mx-5 my-3">
                   <span>Status</span><br/>
                  <span className=" fs-5 text-success"><span>{data.status}</span></span>
                   </Col>
                   <Col lg={2} className="mx-5 my-3">
                   <span>Items</span><br/>
                  <span className=" fs-5 "><span>{data.products.length}</span></span>
                   </Col>
                    </Row>
                   
                       
                        {data.products.map((product)=>{
                         return(
                             <div>
                                  <Row className="mx-5 my-3">
                            <Col lg={2} className="text-start mx-4 my-4">
                             <img src={product.product.imgURLs[0]} width="150px" height="150px"  alt="Product images"   />
                             </Col>
                             <Col lg={2} className="text-start mx-4 my-4">
                                <span className="fw-bold fs-5">{product.product.productName}</span><br/>
                               <small className="text-muted fs-6">{product.product.desc}</small><br/>
                               <small className="text-muted fs-6">Size:<span className="ml-2">{product.size}</span><span className="ml-1">/</span><span className="mx-2">Qty:</span><span>{product.qty}</span></small>
                             </Col>
                             <Col lg={2} className="text-start mx-4 my-4">
                             <span className="fw-bold fs-5">Rs.<span>{product.price}</span></span>
                             </Col>
                             <Col lg={2} className="text-start mx-5 my-4">
                             <p class="text-muted ">
                            <span class="text-warning fw-bold">Please note:</span> You cannot return or exchange this as
                            the 30 day return period
                            has expired
                        </p>
                             </Col>
                             </Row>
                             </div>
                         )
                        })}
                       
                    
                        
                </Card>
        </Row>
        <Row  className="mx-5 text-start">
            <p>ORDER DETAILS</p>
            <Card className="mb-5">
                <Row className="my-3 mx-3 border-bottom border-1">
                    <span className="my-1"><span>Order No:</span><span className="mx-2">{data._id}</span></span>
                   <span className="my-1"><span>Order Placed:</span><span className="mx-2">{data.date}</span></span>
                </Row>
                <Row>
                    <span className="ml-4">Total<span className="ml-2">Amount</span> :</span>
                    <span className="ml-4 fw-bold">Rs.<span>{data.price}</span></span>
                </Row>
                <Row className="my-5">
                    <span className="ml-4">Shipping<span className="ml-2">Address</span>:</span>
                    <span className="ml-4 fw-bold "><span>{data.address.name}</span></span>
                    <span className="ml-4 ">{data.address.door_no},<span>{data.address.street},</span></span>
                    <span className="ml-4 ">{data.address.locality},<br/><span className="mr-1">{data.address.district}</span>-<span className="mx-1">{data.address.pincode}.</span></span>
                    <span className="ml-4 fw-bold">{data.address.phone_no}</span>
                </Row>
                <Row className="mb-4">
                    <span className="ml-4">Payment<span className="ml-2">Mode</span></span>
                    <span className="ml-4 fw-bold">{data.paymentStatus}</span>
                </Row>
            </Card>
        </Row>
           </div>
        )

        const data=this.state.record
        return (
            <div>
                
                {value}
                <Modal isOpen={this.state.open}  style={{overlay:{backgroundColor:"#FFFFFF00"},content:{width:"30%",top:"16%",left:"15%",height:'12.5%'}}}  >
                    <p onMouseLeave={this.hide} className="text-muted"><span className="mr-1">Actual price</span><span className="mx-1">-</span><span className="mx-1">10% discount on MRP</span><span className="mx-1">+</span><span className="mx-1">Convenience Fee Rs.99</span><span className="mx-1">+</span><span className="mx-1">Delivery charges (if any)</span></p>
                </Modal>
               
            </div>
        )
    }
}

export default orderDetail

