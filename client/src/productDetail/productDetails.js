import React, { Component } from 'react'
import Axios from 'axios'
import {Breadcrumb,Row,Col,Button} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag,faTruck} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faWindowRestore} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import './detail.css'
import Image from './image'
import Sizes from './button'


export class productDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:[],
             sizes:[],
             id:'',
             path:''
        }
    }

     Productid = this.props.match.params.product_id

    
    
     componentDidMount(){
        console.log(this.Productid)

        if(!localStorage.userToken){

        }else{
            const token=localStorage.getItem('userToken')
            const decoded=jwt_decode(token)
            console.log(decoded.user.id)
            this.setState({id:decoded.user.id})
        }
      
         Axios.get(`http://localhost:7000/getone/:id?id=${this.Productid}&type=single`)
         .then((response)=>{
             this.setState({product:response.data})
            console.log(response.data)
         })
         .catch((error)=>{
             console.log(error)
         })
     }
    
     addTocart=async()=>{
         console.log("Output")

         console.log("we are in add to cart")
        if(this.state.id===""){
           this.setState({path:'/login'})
        }else{
           
            this.setState({path:'/cart'})
           await Axios.post('http://localhost:7000/cart/add',{_id:this.Productid,id:this.state.id})
            

        }

        
     }

     addTowish=()=>{
         console.log("Added to wishlist")

         

        Axios.post('http://localhost:7000/wish/add',{product:this.Productid,user:this.state.id})
     }
    
    render() {
         const name = this.state.product.map((value)=><a style={{color:'black',textDecoration:'none',fontWeight:'bold'}} >{value.productName}</a>)
       
         const renderdetails=this.state.product.map((value)=>  
        <Row className="mt-3">
                <Col lg={7} md={16} xs={32}><Image images={value.imgURLs} /></Col>
            <Col lg={4} md={8} xs={16} >
                <h2 className="text-start fw-bold">{value.productName}</h2>
                <p className="text-muted fs-4">{value.desc}</p>
                <hr style={{fontWeight:"10px",color:'black',height:"0.4px"}}></hr>
                <span className="fs-4 fw-bold">Rs.{value.price}</span><span className="fs-5 text-decoration-line-through text-muted mx-4">Rs.{value.existing_price}</span><span className="fs-5 fw-bold"style={{color:'#FFAE7A'}}>({value.offer})</span><br></br>
                <small className="text-success fw-bold fs-6 ">inclusive of all taxes</small>
                <p className="fw-bold fs-6 my-3">AVAILABLE SIZES</p>
                <Sizes size={value.sizes} />
                
                <span>
             <a className="btn my-3 w-50" href={this.state.path} style={{backgroundColor:"#FF3E6C",color:"white",fontWeight:"bold",borderColor:"#FF3E6C"}} onClick={this.addTocart}><FontAwesomeIcon className="mx-3"  icon={faShoppingBag} />Add to cart</a>
                <Button href="/wishlist" onClick={this.addTowish} className="btn my-3  border-1 border-dark text-center mx-3" style={{width:"210px",backgroundColor:"White",color:"Black",fontWeight:"bolder"}} ><FontAwesomeIcon className="mx-1" icon={faHeart} />WISHLIST</Button>
                </span>
                <hr/>
                <span className="fw-bold">Delivery options</span><FontAwesomeIcon className="mx-3" icon={faTruck} />
                <p className="mt-4">100% Original products</p>
                <p>Free Delivery on order above R.799</p>
                <p>Pay on delivery might b available </p>
                <p>Easy free 30 days returns and exchanges</p>
                <p>Try & Buy might be available</p>
               
                </Col>    
         </Row> 
  
         )

        return (
            <div className="mt-4 text-start ml-5">
             <span ><a href="/" style={{color:'black',textDecoration:'none'}} className="line">Home</a> / <a href="/productList"style={{color:'black',textDecoration:'none'}} className="line">T-shirts</a>/{name}</span>
               
                   
                 {renderdetails}
                
            </div>
        )
    }
}

export default productDetails
