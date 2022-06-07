import logo from './logo.svg';
import React from 'react'
import './App.css';
import Header from './Header/header'
import Footer from './Footer/Footer'
import Slick from './Slick/Slick'
import Gallery from './gallery/gallery'
import Cart from './cart/cart'
import Login from './Profile/logProfile'
import Signup from './Profile/signProfile'
import Cartheader from './Header/cartHeader'
import ProductFilter from './productFilter/productFilter'
import ProductDetail from './productDetail/productDetails'
import Update from './Profile/update profile'
import Address from './address/address'
import Order from './order/order'
import Wishlist, { wishlist } from './wishlist/wishlist'
import Orderdetail from './order/orderDetail'

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
       { (window.location.pathname=== '/cart' || window.location.pathname=== '/cart/address'||window.location.pathname==='/cart/orderdetail/id'||window.location.pathname==='/cart/order')?<Cartheader />:<Header/>} 
        
        {/* <Route exact path="/" component={Slick} /> */}
        <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path='/update' component={Update} />
        <Route exact path="/" component={Gallery} />
        <Route exact path="/" component={Footer} />
        <Route exact path ='/cart' component={Cart} />
        <Route exact path='/wishlist' component={Wishlist} />
        <Route  path='/cart/address' component={Address} />
        <Route exact path="/productList" component={ProductFilter} />
        <Route exatct path='/cart/order' component={Order} />
        <Route exact path='/cart/orderdetail/:id' component={Orderdetail} />
        <Route exact path="/men/detail/:product_id" component={ProductDetail} />

      </Router>
      
    
    </div>
  );
}

export default App;
