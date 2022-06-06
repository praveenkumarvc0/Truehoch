import React, { Component } from 'react'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Row,Col,Card,Container,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './slider'

import "./wishlist.css"

export class wishlist extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             wishlist:[],
             id:""
        }
    }
    componentDidMount(){
        if(!localStorage.userToken){
          
        }else{
        const token=localStorage.getItem('userToken')
        const decoded=jwt_decode(token)
        const id=decoded.user.id
        this.setState({id:id})
       
        Axios.post('http://localhost:7000/wish/get',{id})
        .then((response)=>{
            console.log(response.data)
            this.setState({wishlist:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    }

    remove=(id)=>{
        Axios.post('http://localhost:7000/wish/delete',{id})
    }
    
    addTocart=(id,wishid)=>{
        const userid=this.state.id
        Axios.post('http://localhost:7000/cart/addfromwish',{id,userid,wishid})
    }
    render() {
       
        const renderWish=this.state.wishlist.map((products)=><div>
            <Row className="my-5">
       
            </Row>
            
            <Row>
            <Container>
            <Card className="border-1 border-dark">
            
                <Row>
                <Col lg={3} className="">
                    <Slider  images={products.product.imgURLs} />
                </Col>
                <Col lg={9} className="text-start">
                <p className="fw-bold fs-2">{products.product.productName}</p>
                <p className="fst-italic fs-5">{products.product.desc}</p>
                <p className=" fs-5  fw-bold">Available Sizes</p>
                {products.product.sizes.map((size)=><span className="mx-2 fw-bold badge  text-white  rounded-pill p-3" style={{backgroundColor:"#FF3F6C"}}>{size}</span>
                )}
                <p className="my-4 ml-3 "><span className="fw-bold fs-5">Rs.</span><span  className="fw-bold fs-5">{products.product.price}</span><span className="text-muted text-decoration-linethrough fs-5 ml-4 text-decoration-line-through">Rs.</span><span className="text-muted  text-decoration-line-through  fs-5">{products.product.existing_price}</span></p>
                </Col>
                </Row>
            <Card.Footer className="bg-white text-start "><span style={{marginLeft:"200px"}}><a href="/wishlist" className="button fw-bold text-dark fs-5" onClick={()=>this.remove(products._id)} >Remove</a><span className=" fw-bold text-dark fs-5" style={{marginLeft:"200px"}}>|</span><span className=" fw-bold text-dark fs-5" style={{marginLeft:"200px"}}><a href="/cart" onClick={()=>{this.addTocart(products.product._id,products._id)}} className="button fw-bold text-dark fs-5">Add to Cart</a></span></span></Card.Footer>
            
            </Card>
            </Container>
            </Row>
            
            
        </div>)
       
        const data=()=>{
            if(!localStorage.userToken){
                return(
                    <div className="content">
                        <h5 >PLEASE LOG IN</h5>
                        <p style={{color:"#94A5C7"}}>Login to view items in your wishlist</p>
                        <img src='images/wishlist.png'  className="my-4" /><br></br>
                        <a href="/login" className="btn fw-bold py-2" style={{color:"#3466E8",border:"1px solid blue",width:"150px"}}>LOGIN</a>
                    </div>
                )
            }else{
                    if(this.state.wishlist.length===0){
                        return(<div className="content">
                        <h5 >YOUR WISHLIST IS EMPTY</h5>
                        <p style={{color:"#94A5C7"}}>Add items that you like to your wishlist.<br/> Review them anytime and easily move them to the bag.</p>
                        <img src='images/wishlist.png' width="100px" className="my-4" /><br></br>
                        <a href="/productList" className="btn fw-bold py-2" style={{color:"#3466E8",border:"1px solid blue",width:"250px"}}>CONTINUE SHOPPING</a>
                    </div>)
                    }else{
                        return( <div>
                            <Row>
                    <Col>
                    <Image height="500px" src='https://images.financialexpress.com/2020/09/Sam-Styled-By-Myntra-364.png' />
                    </Col>
                </Row>
                <Row>
                     <Col lg={6}>
                    <Image width="900px" height="400px" src='https://i.pinimg.com/originals/0e/44/a6/0e44a62715c4851701abef38dc6a8fe2.jpg' />
                    </Col>
                    <Col lg={6}>
                    <Image width="900px" height="400px" src='https://exchange4media.gumlet.io/news-photo/108157-bam.jpg?format=webp&w=400&dpr=2.6' />
                    </Col>
                </Row>
                            {renderWish}
                            <Row className="mt-5">
                    <Col>
                    <Image height="500px" src='https://media.fashionnetwork.com/m/6201/f673/5ad6/bc44/b970/3a30/e5ad/2138/258d/0e21/0e21.png' />
                    </Col>
                </Row>
                            </div>)
                    }
                    
                
                
               
            }
        }

        const result=data()
        return (
            <div>
                
                 
                {result}

                
            </div>
        )
    }
}

export default wishlist
