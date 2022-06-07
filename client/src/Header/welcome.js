import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';

function welcome (props) {

  if(!localStorage.userToken){
    return (
        <div>
            <p>
                To access account and manage orders<br/>
             <Link to={'/login'}><button className="btn  my-3 "  id="lg" style={{color:"#F41CB2",padding: "5px 10px 5px 10px", fontSize:"13px"}}>
            LOGIN / SIGNUP </button></Link>
             </p>
        </div>
    )
  }else{
    const token = localStorage.getItem('userToken')
    const decoded = jwt_decode(token)
    const name=decoded.user.fullname
    console.log(name)
      return(<div>
          <p className="fw-bold text-dark fs-5">{name}</p>
      </div>)
      
  }
        
    
}

export default welcome

