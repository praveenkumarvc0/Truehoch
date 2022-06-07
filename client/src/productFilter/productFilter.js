import React,{Component} from 'react'
import Axios from 'axios'
import './button.css'
import jwt_decode from 'jwt-decode'
import {Row,Col,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImageSlider from './ImageSlider/slick'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import Sizes from './sizes'

// import {Link} from 'react-router-dom'

export class productFilter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            Products:[] ,
            Slick:[],
            play:false,
            filterData:[]
        }
    }
    componentDidMount(){
        this.callAPI()
    }

    callAPI(){
        Axios.get("http://localhost:7000/getProduct")
        .then((response)=>{
           
            this.setState({Products:response.data})
            // console.log(response.data)
           
        })
        .catch((err)=>{console.log(err)}) 
    }
    
     addToWish=(id)=>{
         console.log(id)

         if(!localStorage.userToken){
             alert('Please Login')
             window.location='/login'
         }else{
            const token=localStorage.getItem('userToken')
            const decoded=jwt_decode(token)
             console.log(decoded.user.id)
             const user =decoded.user.id

             Axios.post('http://localhost:7000/wish/add',{product:id,user:user})
         
         }

         


     }

    handlebrand=(e)=>{

       var brandArray=this.state.filterData

       if (e.target.checked){
        brandArray.push(e.target.name)
        this.setState({filterData:brandArray})
       }else{
           var index=brandArray.indexOf(e.target.name)
          brandArray.splice(index,1)

          
       }
        

    console.log(brandArray)

        const filter={
            productName:brandArray,
           
        }
        console.log("Welcome")

        if(brandArray.length===0){
            console.log('working in if ')
            this.callAPI()
                 
          }else{
        Axios.post('http://localhost:7000/getProduct/filter',filter)
        .then((response)=>{
           
            this.setState({Products:response.data})
           
        })
        .catch((err)=>{console.log(err)}) 
    }
       
    }

    handlesize=(e)=>{

       var sizeArray=this.state.filterData

       if (e.target.checked){
        sizeArray.push(e.target.name)
        this.setState({filterData:sizeArray})
       }else{
           var index=sizeArray.indexOf(e.target.name)
           sizeArray.splice(index,1)

          
       }
        
        const filter={
            sizes:sizeArray
        }
        console.log("Welcome")

        if(sizeArray.length===0){
            console.log('working in if ')
            this.callAPI()
                 
          }else{
        Axios.post('http://localhost:7000/getProduct/filter/size',filter)
        .then((response)=>{
           
            this.setState({Products:response.data})
           
        })
        .catch((err)=>{console.log(err)}) 
    }
       
    }


    handleColor=(e)=>{

       var ColorArray=this.state.filterData

       if (e.target.checked){
        ColorArray.push(e.target.name)
        this.setState({filterData:ColorArray})
       }else{
           var index=ColorArray.indexOf(e.target.name)
           ColorArray.splice(index,1)  
       }
        
        const filter={
            color:ColorArray
        }
        console.log("Welcome")

        if(ColorArray.length===0){
            console.log('working in if ')
            this.callAPI()
                 
          }else{

        Axios.post('http://localhost:7000/getProduct/filter/color',filter)
        .then((response)=>{
           console.log(response)
            this.setState({Products:response.data})    
           
        })
        .catch((err)=>{console.log(err)}) 
    }
       
    }

    sort=(event)=>{
        const value=event.target.value
        console.log(value)

        if(value==1){
            console.log('A to Z')
            Axios.post('http://localhost:7000/product/sort',{value:1})
            .then((response)=>{
                console.log(response.data)
                this.setState({Products:response.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
        if(value==2){
            console.log('Z to A')
            Axios.post('http://localhost:7000/product/sort',{value:2})
            .then((response)=>{
                console.log(response.data)
                this.setState({Products:response.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
        if(value==3){
            console.log('Price Low to High')
            Axios.post('http://localhost:7000/product/sort',{value:3})
            .then((response)=>{
                console.log(response.data)
                this.setState({Products:response.data})
            }).catch((err)=>{
                console.log(err)
            })
        }
        if(value==4){
            console.log('Price High to Low')
            Axios.post('http://localhost:7000/product/sort',{value:4})
            .then((response)=>{
                console.log(response.data)
                this.setState({Products:response.data})
            }).catch((err)=>{
                console.log(err)
            })
        }

    }
   
    render() {
        


      const renderCards=this.state.Products.map((products,index)=>
      <Col lg={2}  md={4} xs={24} className="mx-3 ">
          <Card  hoverable={true} className="border-0 product" style={{ width: '15rem'}}>
        <a href= {`/men/detail/${products._id}`}><span><ImageSlider images={products.imgURLs} runSlide={this.playSlide} /></span></a>
               <a href='/wishlist' onClick={()=>this.addToWish(products._id)} className="btn rounded-0 border-1  mt-4 mx-3 style" ><FontAwesomeIcon icon={faHeart} /> WISHLIST</a>
                 <span className="mx-auto mt-1 " style={{fontSize:'14px'}}><span className="mx-2 fw-bold">Sizes</span><Sizes sizes={products.sizes} /></span>
              <Card.Body className="text-start ">
              
                 <Card.Title style={{fontSize:'16px',fontWeight:'bold',marginTop:'5px'}}>{products.productName}</Card.Title>
               <Card.Text style={{fontSize:'14px'}}>
                   {products.desc}
              </Card.Text>
                 <span><span className="mr-2 fw-bold " style={{fontSize:'15px',marginTop:'10px'}}>Rs.{products.price}</span><small className="text-decoration-line-through" style={{color:'gray'}} >Rs.{products.existing_price}</small><span className="mx-2" style={{color:'#FFAE7A',fontSize:"15px",fontSize:'13px'}}>({products.offer})</span></span>
             </Card.Body>
              </Card>
      </Col> )

        return (
            <div className="mt-5">
                <Row className="border-1 border-bottom" style={{borderColor:"grey"}}>
                    <Col lg={2} ><span className="fw-bold text-start ml-2 fs-4">Filters</span> <span> <a className=" text-danger ml-2 text-decoration-none " href="/productList">Clear All</a></span></Col>
                    <Col lg={10} className='my-3'> 
                   <span className='border p-2'> <label for="cars">Sort by:</label>
                         <select name="cars" className='border-0 mx-3 ' onChange={e=>this.sort(e)} style={{width:"200px",color:'grey'}} id="cars">
                                <option>None</option>
                                 <option value="1">A to Z</option>
                                <option value="2">Z to A</option>
                                <option value="3">Price Low to High</option>
                                <option value="4">Price High to Low</option>
                            </select>
                            </span> 
    </Col>
                </Row>
                 
                <Row className="mt-4  ">

                    
                    <Col lg={2} className="border-1 border-end text-start px-5"  style={{borderColor:"grey"}}>
                   
                         <h6>Brands</h6>
                        <label><input type="checkbox" name="Roadster"  className="mr-2" onClick={this.handlebrand}/>Roadster</label><br/>
                        <label><input type="checkbox" name="HERE&NOW"   className="mr-2" onClick={this.handlebrand}/>HERE&NOW</label><br/>
                        <label><input type="checkbox" name="Huetrap"  className="mr-2" onClick={this.handlebrand}/>Huetrap</label><br/>
                        <label><input type="checkbox" name="Nautica"  className="mr-2" onClick={this.handlebrand} />Nautica</label><br/>
                        <label><input type="checkbox" name="WROGN"  className="mr-2" onClick={this.handlebrand}/>WROGN</label>

                        <hr></hr>

                        <h6>Size</h6>
                        <label><input type="checkbox" name="S"  className="mr-2" onClick={this.handlesize} />S</label><br/>
                        <label><input type="checkbox" name="M"  className="mr-2" onClick={this.handlesize}/>M</label><br/>
                        <label><input type="checkbox" name="L"  className="mr-2" onClick={this.handlesize}/>L</label><br/>
                        <label><input type="checkbox" name="XL"   className="mr-2" onClick={this.handlesize}/>XL</label><br/>
                        <label><input type="checkbox" name="XXL"   className="mr-2" onClick={this.handlesize}/>XXL</label>

                        <hr></hr>

                        <h6>Color</h6>
                        <label><input type="checkbox" name="red"  onClick={this.handleColor} className="mr-2"/><span style={{backgroundColor:"red",borderRadius:'50%',color:"red",height:"3px"}} className="mx-2 px-1">....</span>Red</label><br/>
                        <label><input type="checkbox" name="blue"  onClick={this.handleColor}  className="mr-2"/><span style={{backgroundColor:"blue",borderRadius:'50%',color:"blue",height:"3px"}} className="mx-2 px-1">....</span>Blue</label><br/>
                        <label><input type="checkbox" name="green"  onClick={this.handleColor}  className="mr-2"/><span style={{backgroundColor:"green",borderRadius:'50%',color:"green",height:"3px"}} className="mx-2 px-1">....</span>Green</label><br/>
                        <label><input type="checkbox" name="black"   onClick={this.handleColor} className="mr-2" /><span style={{backgroundColor:"black",borderRadius:'50%',color:"black",height:"3px"}} className="mx-2 px-1">....</span>Black</label><br/>
                        <label><input type="checkbox" name="white"  onClick={this.handleColor} className="mr-2"/><span style={{backgroundColor:"white",borderRadius:'50%',color:"white",height:"3px"}} className="mx-2 border border-dark px-1">....</span>White</label>

                     </Col>
                   <Col lg={10}>
                       <Row>
                       {renderCards}
                       </Row>
                       </Col>
                   
                </Row>
               
            </div>
        )
    }
}

export default productFilter



