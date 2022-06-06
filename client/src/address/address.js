import React, { Component } from 'react'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import Modal from 'react-modal'
import {Row,Col,Card,Button,Image, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './address.css'
import Update from './editAddress'

export class address extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            editModal:false,
            name:"",
            door_no:"",
            street:"",
            district:"",
            state:"",
            pincode:"",
            locality:"",
            addresstype:"",
             records:[],
             isOpen:false,
             editAddressid:"",
             phone_no:"",
             errors:[],
             address:[],
             delivery:"-",
             singleAddress:{},
             addressID:""
           
            
        }
    }
    
    componentDidMount(){
        const token =localStorage.getItem('userToken')
        const decoded = jwt_decode(token)
        const userID= decoded.user.id

        Axios.post('http://localhost:7000/cart/getUser',{userID})
        .then((response)=>{
            this.setState({records:response.data})
            this.addressRecord()
        }).catch((err)=> {
            console.log(err)
        })
    }

    addressRecord=()=>{
        const token =localStorage.getItem('userToken')
        const decoded = jwt_decode(token)
        const userID= decoded.user.id

        console.log("got the addresses")
        Axios.post('http://localhost:7000/address/get',{userID})
        .then((response)=>{
            this.setState({address:response.data})
        }).catch((err)=>{
            console.log(err)
        })
        
    }


   handleChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
   }

   handleSubmit=(event)=>{
    event.preventDefault()
    console.log('handleSubmit is working')

    const token =localStorage.getItem('userToken')
    const decoded = jwt_decode(token)
    const id= decoded.user.id

   var data={
    user:id,
    name:this.state.name,
    door_no:this.state.door_no,
    street:this.state.street,
    district:this.state.district,
    state:this.state.state,
    pincode:this.state.pincode,
    locality:this.state.locality,
    addresstype:this.state.addresstype,
    phone_no:this.state.phone_no
    }

    if (this.isformValid()){
        this.setState({errors:[]})
        Axios.post('http://localhost:7000/address/add',data)
        .then(()=>{
            alert('Address added Successfully')
            this.setState({isOpen:false})
            window.location="/cart/address"
        }).catch((err)=>{
            console.log(err)
        })
    }
    

   }

   isformValid=()=>{
            let error
                let errorsArray=this.state.errors;
                    if(this.isFormempty(this.state)){
                             console.log('your form is empty')
                             error={message:"Fill in all the fields"}
                             errorsArray.push(error)
                             console.log(error)
                                 this.setState({errors:errorsArray})
                                 errorsArray=[]
                    }else if (!this.isPhonenoValid(this.state)){
                        error={message:"Phone Number must contain 10 numbers"}
                        errorsArray.push(error)
                        this.setState({errors:errorsArray})
                        errorsArray=[]
                    }
                    else{
                        this.setState({errors:[]})
                        return true;
                    }
   }

   isPhonenoValid=({phone_no})=>{
        if(phone_no.length===10){
            return true
        }else{
            return false
        }
   }

   isFormempty=({name,door_no,street,district,state,pincode,locality,addresstype,phone_no})=>{
    console.log("you are in isFormempty")
   
       if(!name.length||
       !door_no.length||!phone_no.length||
        !street.length||
        !district.length||
        !state.length||!pincode.length||!locality.length||!addresstype.length) {
            return true
        }else{
            return false
        }
   
}

displayerrors=(errormsg)=>{
    console.log("we are in displayerrors")

    console.log(errormsg)

 return  errormsg.map((error)=> 
        <p>{error.message}</p>
   )
  
}

deleteAddress=(id)=>{
    console.log('delete is working')
    Axios.post('http://localhost:7000/address/delete',{id})
    .then((response)=>{
        alert('Address deleted successfully')
        this.setState({address:response.data})
    })
    .catch((err)=>{
        console.log(err)
    })
}

deliveryCharges=(e)=>{
    if(e.target.value==="standard"){
        this.setState({delivery:40})
    }else{
        this.setState({delivery:"-"})
    }

}

handleEdit=(id)=>{

    this.setState({editModal:true})

    console.log(id)

    this.setState({ editAddressid:id})

    // Axios.post('http://localhost:7000/address/getone',{id})
    // .then((response)=>{
    //     console.log(response.data)
    //     this.setState({singleAddress:response.data})
    // }).catch((err)=>{
    //     console.log(err)
    // })
}

handleAddress=(addressid)=>{  
    this.setState({addressID:addressid})
}

placeOrder=(amount)=>{

    console.log("PlaceOrder is working")

    const token =localStorage.getItem('userToken')
    const decoded = jwt_decode(token)
    const id= decoded.user.id
    const addressId = this.state.addressID
    
    var cartid=this.state.records.map((value)=>
    value._id)
    
    Axios.post('http://localhost:7000/order/add',{id,cartid,addressId,amount})
    .then((value)=>{
        alert("order placed Successfully")
        window.location="/cart/order"
    })
}


    render() {

        const totalBagprice=()=>{
            var totalprice=0
            this.state.records.map((value)=>totalprice+=value.price)

            return totalprice
        }
        const discountPrice=()=>{
            var discount =0
            var totalDiscount=0
            this.state.records.map((value)=>{ discount= (value.price*10)/100
                totalDiscount+=discount
               
            } )
            return  Math.floor(totalDiscount)
        }

        const convenienceFee=()=>{
            var fee=99
            var total=this.state.records.length

            var convenience=fee*total

            return convenience
            
        }

        
       var orderTotal=totalBagprice()
        var convenience=convenienceFee()
        var renderDiscount=discountPrice()
        var delivery=0
        console.log(orderTotal)
        console.log(convenience)

        if(this.state.delivery===40){
             delivery=40
        }else{
            delivery=0
        }
       

        var finalAmount=orderTotal-renderDiscount+delivery+convenience

        var renderProducts=this.state.records.map((value)=><div className="my-2" >
            <Card className="my-2 border">
                <Row>
                <Col lg={3}>
                   
                <img src={value.product.imgURLs[0]} width="80px"  height="90px" alt="product images" />
                </Col>
                <Col lg={9} className="text-start">
                    <span className=" mt-1 fw-bold text-start"  style={{fontSize:"13px"}}>{value.product.productName}</span><br/>
                    <small className="text-start" style={{fontSize:"10px"}}>{value.product.desc}</small><br/>
                    <span><small style={{fontSize:"13px"}}>10 July 2021</small></span>
                </Col>
                </Row>
            </Card>
        </div>)

        var renderAddress=this.state.address.map((data)=>
             <Col lg={3} className="mx-3 my-4">
                 <Card >
                     <div className="text-start px-4 py-2">
                     <span> <input type="radio" onClick={()=>this.handleAddress(data._id)} name="address"/>  <span className="fw-bold fs-6">{data.name}</span></span>
                     <p className="text-dark my-2 mx-2">{data.door_no},</p>
                     <p><span  className="mx-2">{data.street}</span>,</p>
                     <p><span  className="mx-2">{data.locality}</span>,</p>
                     <p><span  className="mx-2">{data.district}</span>,</p>
                     <p><span  className="mx-2">{data.state}</span>-<span>{data.pincode}</span></p>
                     <p className="mx-2">Mobile  No:<span  className="mx-2 fw-bold">{data.phone_no}</span></p>
                     </div>
                     <Card.Footer className="py-2 text-start">
                         <a href="/cart/address" className="ml-3 button fw-bold" onClick={()=>this.deleteAddress(data._id)}>Remove</a>
                         <span className="mx-4">|</span>
                         <a  className="ml-3  button fw-bold" onClick={()=>this.handleEdit(data._id)}>Edit</a>
                     </Card.Footer>
                     </Card>
            </Col>
           
    
        
        )
        
        return (
            <div>
            
            <Row className="my-5 mx-5">
                <Col lg={9} className="border-2 border-right border-dark">  
                     <h5 class="fw-bold text-start">Select Delivery Address</h5>
                        <Row className="my-4">
                                {renderAddress}
                                <Col lg={3}>
                                     <div className="card my-4 " style={{width:"300px",height:"300px"}}>
                                         <div>
                                                <span style={{textAlign:"center"}}><button href="" id="plus" style={{marginTop:"130px"}}
                                                 className=" border border-1 btn fw-bold fs-5 bg-light " onClick={()=>this.setState({isOpen:true})}>+</button>
                                                <p className="text-dark fw-bold">Add new address</p>
                                                 </span>
                                         </div>
                                        </div>
                                </Col>
                        </Row>
                 </Col>
            <Col lg={3}>
            <p className="mt-4 text-start"><small><small>CHOOSE DELIVERY ADDRESS</small></small></p>
                    <div className="card p-3 text-start">
                        <label for="ads" className=" form-check label fw-bold text-dark "> <input   type="radio" onChange={this.deliveryCharges} name="delivery"
                               value="standard"  className="me-2"/> Standard Delivery</label>
                        <small className="ms-5 text-dark">Get it by 25 june - 30 june | Delivery charges Rs.40</small>
                        <label for="ads" className=" form-check label fw-bold text-dark mt-2 "> <input   type="radio" defaultChecked onChange={this.deliveryCharges} name="delivery"
                               value="notstandard"  className="me-2"/> Not required</label>
                    </div>
            <p className="text-start my-3"><small>Estimated Delivery Dates</small></p>
            <div>
                {renderProducts}
            </div>
                <p className="fw-bold text-start mt-4">PRICE DETAILS</p>
                 <hr className="my-1" style={{borderColor:"black",height:"1px"}}/>
                 <Row>
                            <Col className="mt-4 text-start mx-4">
                            <p style={{fontSize:"15px"}}>Order Total </p>
                            <p>Discount</p>
                            <p>Delivery Charges</p>
                            <p>Convenience Fee</p>
                            </Col>
                            <Col className="mt-4 text-start  mx-4">
                            <p className="ms-3">Rs. {orderTotal}</p>
                            <p className="ms-3">Rs. {renderDiscount}</p>
                            <p className="ms-3">Rs. {this.state.delivery}</p>
                            <p className="ms-3">Rs. {convenience}</p>
                            </Col>
                            <Container>
                                 <hr />
                           </Container>
                        <div class="d-flex justify-content-center">
                            <p class="fw-bold text-dark fs-5">Total</p>
                            <p class="fw-bold text-dark fs-5" style={{marginLeft:"150px"}}>Rs. {finalAmount}</p>
                        </div>
                        <button  onClick={()=>this.placeOrder(finalAmount)} className="btn text-white mx-3 fw-bold" style={{backgroundColor:"#FF3F6C"}}>Place Order</button>

                 </Row>
            
            </Col>
            </Row>

            <Modal isOpen={this.state.isOpen}  style={{overlay:{backgroundColor:"#00000066"},content:{width:'40%',height:'80%',marginLeft:'350px',marginTop:'34px'}}} >
            <Container>
                <h5 className="mb-3 fw-bold">Add Address</h5>
            <form className="my-4" >
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Enter Name</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="name" onChange={(e)=>this.handleChange(e)} value={this.state.name}  placeholder="Enter recepient name" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Door No</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="door_no" onChange={(e)=>this.handleChange(e)} value={this.state.door_no} placeholder="Door no (eg: 35H)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Street</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="street" onChange={(e)=>this.handleChange(e)}  value={this.state.street} placeholder="street" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Locality</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="locality" onChange={(e)=>this.handleChange(e)} value={this.state.locality}  placeholder="eg(Taluk)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">District</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="district" onChange={(e)=>this.handleChange(e)} value={this.state.district}  placeholder="eg(Coimbatore)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">State</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="state" onChange={(e)=>this.handleChange(e)} value={this.state.state}  placeholder="eg(Tamil Nadu)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Pincode</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="pincode"  onChange={(e)=>this.handleChange(e)} value={this.state.pincode}  placeholder="eg(641603)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Phone No</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="phone_no"  onChange={(e)=>this.handleChange(e)} value={this.state.phone_no}  placeholder="eg(9987605432)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Address Type</label>
                        <select className="form-control w-100 rounded-0 mb-3" name="addresstype" value={this.state.addresstype} onChange={(e)=>this.handleChange(e)}>
                        <option>Home</option>
                        <option>Office</option>
                        </select>

                        <p className=" my-4 text-danger fw-bold" style={{marginLeft:"180px"}}>{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>


               <span className=" ml-5" >
                <a  className="btn text-white fw-bold  mx-3" onClick={this.handleSubmit} style={{backgroundColor:"#FF3F6C",width:"200px"}}>Add</a>
                <a className="btn text-dark fw-bold mx-3 border" type="reset" style={{width:"200px"}} onClick={()=>this.setState({isOpen:false})}>Cancel</a>
                </span>
            </form>
            </Container>
            </Modal>
            <Modal isOpen={this.state.editModal} style={{overlay:{backgroundColor:"#00000066"},content:{width:'40%',height:'80%',marginLeft:'350px',marginTop:'34px'}}}>
                
                <Update values={this.state. editAddressid}/>  
                <button className="btn border border-dark border-1 w-50" style={{marginLeft:"115px",width:"318px"}} onClick={()=>this.setState({editModal:false})}>Cancel</button>
                
              


            </Modal>
            </div>
        )
    }
}

export default address
