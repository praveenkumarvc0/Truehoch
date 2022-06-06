import React,{useState} from 'react'
import Modal from 'react-modal'
import{Row,Col,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css'
import {Link} from 'react-router-dom'

function MenModal() {
    const [modalOpen, setmodalOpen] = useState(false)
      return (
        <div>
         <a  onMouseEnter={()=>setmodalOpen(true)}  >MEN</a>
         <Modal  isOpen={modalOpen}   style={{overlay:{backgroundColor:"#00000066"},content:{width:'70%',height:'60%',marginLeft:'90px',marginTop:'34px'}}} >
             <Row style={{ marginTop:"-1px"}} onMouseEnter={()=>setmodalOpen(true)} onMouseLeave={()=>setmodalOpen(false)} >
                <Col>
                <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Topwear</h6>
                  <ul className="list-unstyled" style={{fontSize:'12px',marginLeft:'25px',color:'black'}}>
                  <li ><Link className="text-dark text-decoration-none" to={"/productList"}>T-Shirts</Link></li>
                  <li>Casual Shirts</li>
                  <li>Formal Shirts</li>
                  <li>Sweatshirts</li>
                  <li>Sweaters</li>
                  <li>Jackets</li>
                  <li>Blazers & Coats</li>
                  <li>Suits</li>
                  <li>Rain Jackets</li>
                  </ul>
                  </Row>
                  <hr style={{margin:'0.5px'}}/>
                  <Row style={{marginTop:'10px'}}>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Indian & Festive Wear</h6>
                  <ul className="list-unstyled" style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Kurtas & Kurta Sets</li>
                  <li>Sherwanis</li>
                  <li>Nehru Jackets</li>
                  <li>Dhotis</li>
                  
                  </ul>
                  </Row>
                  
                </Col>
                <Col className="bg-light">
                <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Bottomwear</h6>
                  <ul className="list-unstyled" style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Jeans</li>
                  <li>Casual Trousers</li>
                  <li>Formal Trousers</li>
                  <li>Shorts</li>
                  <li>Track Pants & Joggers</li>

                  </ul>
                  </Row>
                  <hr></hr>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Innerwear & Sleepwear</h6>
                  <ul className="list-unstyled " style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Briefs & Trunks</li>
                  <li>Boxers</li>
                  <li>Vests</li>
                  <li>Sleepwear & Loungewear</li>
                  <li>Thermals</li>
                  </ul>
                  </Row>
                  <hr></hr>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Plus Size</h6>
                  </Row>
                </Col>
                <Col>
                <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Footwear</h6>
                  <ul className="list-unstyled " style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Casual Shoes</li>
                  <li>Sports Shoes</li>
                  <li>Formal Shoes</li>
                  <li>Sneakers</li>
                  <li>Sandals and Floaters</li>
                  <li>Flip Flops</li>
                  <li>Socks</li>
                  </ul>
                  </Row>
                  <hr></hr>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Personal care and Grooming</h6>
                  </Row>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Sunglasses and Frames</h6>
                  </Row>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Watches</h6>
                  </Row>
                  
                  </Col>
                <Col className="bg-light">
                <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Sports & Active Wears</h6>
                  <ul className="list-unstyled " style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Sport Shoes</li>
                  <li>Sport Sandals</li>
                  <li>Active T-shirts</li>
                  <li>Track Pants and Shorts</li>
                  <li>Tracksuits</li>
                  <li>Jackets & Sweatshirts</li>
                  <li>Sports & Accessories</li>
                  <li>Swimwear</li>
                  </ul>
                  </Row>
                 <hr></hr>
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px',fontWeight:'bold'}}>Gadgets</h6>
                  <ul className="list-unstyled" style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Smart-Wearables</li>
                  <li>Fitness Gadgets</li>
                  <li>Headphones</li>
                  <li>Speakers</li>
                  </ul>
                  </Row>
                  </Col>
                <Col>
                <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px'}}>Fashion Accessories</h6>
                  <ul className="list-unstyled " style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>Wallets</li>
                  <li>Belts</li>
                  <li>Perfumes & Body Mists</li>
                  <li>Trimmers</li>
                  <li>Deodrants</li>
                  <li>Ties,Cufflinks & Pocket Squares</li>
                  <li>Accesory Gift Sets</li>
                  <li>Caps & Hats</li>
                  <li>Rain Jackets</li>
                  </ul>
                  </Row>
                 
                  <Row>
                  <h6 style={{color:'#EE5F73',fontSize:'12px',marginLeft:'11px'}}>Topwear</h6>
                  <ul className="list-unstyled " style={{fontSize:'12px',marginLeft:'25px'}}>
                  <li>T-Shirts</li>
                  <li>Casual Shirts</li>
                  <li>Formal Shirts</li>
                  <li>Sweatshirts</li>
                  <li>Sweaters</li>
                  <li>Jackets</li>
                  <li>Blazers & Coats</li>
                  <li>Suits</li>
                  <li>Rain Jackets</li>
                  </ul>
                  </Row></Col>
             </Row>
         </Modal>
        </div>
      );
}

export default MenModal

