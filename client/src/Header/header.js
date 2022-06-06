import React,{Component} from 'react';
import './header.css';
// import Signup from '../modal/signupmodal';
// import Signin from '../modal/signinmodal'
import {Navbar,Nav,InputGroup,FormControl,Image,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {faUser,faHeart} from '@fortawesome/free-regular-svg-icons'
import Modal from 'react-modal'
import List from './logbutton'
import Button from './button'
import Menmodal from '../modals/menModal'
import Womenmodal from '../modals/womenModal'
import Kidsmodal from '../modals/kidsModal'
import Homemodal from  '../modals/homeModal'
import Offersmodal from '../modals/offersModal'
import {Link} from 'react-router-dom'
import logbutton from './logbutton';


class header extends Component {
  constructor(props) {
    super(props); 
    this.state={
      modalOpen:false,
      firstname:"",
      hello:"yes"
    }
  }

   show = ()=>{
     this.setState({modalOpen:true})
  }
 close= ()=>{
    this.setState({modalOpen:false})
 }

//  logdetails=()=>{
//    if(this.state.hello==="yes"){
//      return(
//        <p>
//           To access account and manage orders<br/>
// 				 <Link to={'/login'}><button className="btn  my-3 "  id="lg" style={{color:"#F41CB2",padding: "5px 10px 5px 10px", fontSize:"13px"}}>
// 				LOGIN / SIGNUP </button></Link>
//        </p>
//      )
//    }else{
//       const token = localStorage.userToken
//       const decode = jwt_decode(token)
//       return( <span>{decode.fullname}</span>)
//    }

//  }

    callCart=()=>{
      if(!localStorage.userToken){
        window.location='/login'
      }else{
        window.location='/cart'
      }

    }


 
    render(){

      const route=()=>{
        var path=""
        if(!localStorage.userToken){
          path='/login'
          return path
       
        }else{
          path='/cart/order'
          return path
        }
       
      }

      var finalroute=route()
    return ( 
      <div className="header">
        <Row className=" header" style={{height:'75px'}}>
            <Col md={1} className="ml-5"><Link to={'/'}><Navbar.Brand className="logo"><Image src="https://images.indianexpress.com/2021/01/myntra.png" alt="logo" width="90px" height="60px" roundedCircle/></Navbar.Brand></Link></Col>
            <Col md={5}>
                    <Nav className="mt-3">
                     <Nav.Link  className='nav navitem1' style={{paddingBottom:'27px'}}><Menmodal/></Nav.Link>
                    <Nav.Link className='nav navitem2 ' style={{paddingBottom:'27px'}}><Womenmodal /></Nav.Link>
                    <Nav.Link className='nav navitem3 ' style={{paddingBottom:'27px'}}><Kidsmodal /></Nav.Link>
                    <Nav.Link className='nav navitem4 ' style={{paddingBottom:'27px'}}><Homemodal /></Nav.Link>
                    <Nav.Link className='nav navitem5' style={{paddingBottom:'27px'}}><Offersmodal /></Nav.Link>
                    </Nav>
            </Col>
              <Col md={4}><InputGroup className="my-3 search ">
            <InputGroup.Prepend>
               <InputGroup.Text id="basic-addon1" className="bg-light border-0"><FontAwesomeIcon className="search-icon" icon={faSearch} /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="navbar-dark bg-light border-0 text-light" 
               placeholder="Search for products,brands and more"
                aria-label="NavBar"
               aria-describedby="basic-addon1"
              />
            </InputGroup>
            </Col>
            <Col className="px-4" >
                  <Row>
                      <Col id="profile" md={3} style={{fontSize: "12px",fontWeight:"bold"}} onMouseEnter={this.show} >  <a  className="text-decoration-none text-dark" onMouseEnter={this.show} ><FontAwesomeIcon className="icons " icon={faUser}  />Profile </a>
                        <Modal isOpen={this.state.modalOpen} style={{overlay:{backgroundColor:"#FFFFFF00"},content:{width:"15%",top:"9%",left:"82%",height:'46%'}}} onMouseEnter={this.show} onMouseLeave={this.close} >
                            <ul onMouseLeave={this.close} className="list-unstyled" style={{fontSize:"13px"}}>
                                <p className="fw-normal"><span className="fw-bold">Welcome</span><br/>
                                    <Button/>
								                  </p>
                                 <li>
									                  <hr className="dropdown-divider"/>
								                  </li>
                                  <li><a href={finalroute} className="text-decoration-none text-dark" >Orders</a></li>
								                  <li><a className="text-decoration-none text-dark" href="#">Wishlist</a></li>
								                  <li><a className="text-decoration-none text-dark" href="#">Gift Cards</a></li>
								                  <li><a className="text-decoration-none text-dark" href="#">Contact Us</a></li>
								                <li><a className="text-decoration-none text-dark" href="#">Myntra insider <span
											          className="badge bg-danger text-white p-2">New</span></a></li>
								                    <li>
								                      	<hr className="dropdown-divider"/>
								                    </li>
								                    <li><a className="text-decoration-none text-dark" href="#">Myntra Credit</a></li>
								                    <li><a className="text-decoration-none text-dark" href="#">Coupons</a></li>
								                    <li><a className="text-decoration-none text-dark" href="#">Saved Cards</a></li>
							                    	<li><a className="text-decoration-none text-dark" href="#">Saved Address</a></li>
                                    <List />
                                   
                            </ul>
                        </Modal>
                         
                </Col>
                <Col md={3} style={{fontSize: "12px",fontWeight:"bold"}}><Link to={'/wishlist'} className="text-dark"><FontAwesomeIcon className="icons " icon={faHeart} />Wishlist</Link></Col>
                <Col md={3} style={{fontSize: "12px",fontWeight:"bold"}}><Link to={'/cart'} className="text-dark" onClick={this.callCart}><FontAwesomeIcon className="icons"  icon={faShoppingBag } />Bag</Link></Col>
            </Row>
        </Col>
       </Row>
       </div>
    )
    }
}

export default header