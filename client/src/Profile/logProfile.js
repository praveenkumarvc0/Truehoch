import React, { Component } from 'react'
import Signup from './signProfile'
import Axios from 'axios'
import {Link} from 'react-router-dom'


export class profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            
            e_mail:"",
            password:"",
            errors:[],
            
        }
    }   



    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})

    }


    handleSubmit=(event)=>{
        event.preventDefault()
       const data={
                  e_mail:this.state.e_mail,
                password:this.state.password
       }

       if (this.isFormvalid()){
        console.log('working')
        this.setState({errors:[]})
        console.log('going to see axios')

        Axios.post('http://localhost:7000/login',data)
        .then((response)=>{
            console.log(response.data)
            if(response.data==="Username not found"){
                alert('Username not found')
                window.location='/login'
            }else if (response.data==="Password Incorrect"){
                alert('Password Incorrect')
                window.location='/login'
            }else{
                alert("Login Successful")
                localStorage.setItem('userToken',response.data)
                window.location='/'
            }   
        })
        .catch((err)=>{console.log(err)})

        console.log(data)
    }

    }
    

    isFormvalid=()=>{
        let error
        let errorsArray=this.state.errors;
        if(this.isFormempty(this.state)){
           
            error={message:"Fill in all the fields"}
            errorsArray.push(error)
            console.log(error)
           this.setState({errors:errorsArray})
            errorsArray=[]
        
        }else{
            this.setState({errors:[]})
            return true;
        }

    }

    isFormempty=({e_mail,password})=>{
        console.log("you are in isFormempty")
       
           if(
            !e_mail.length||
            !password.length
           ) {
                return true
            }else{
                return false
            }
       
    }

    render() {
        return (
                <div style={{backgroundColor:'#FEEDF3',height:'950px'}}>
                <div className="container pt-5">
                <div className="card mx-auto border-0" style={{width:'35%'}}>
                <img src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2021/4/29/fd8014ab-7118-482e-8886-3120cd251f4a1619696754996-Banner_Login-page-400.png" class="card-img-top" alt="..."/>
                <h3 className="mt-5 ms-5 text-start">Login</h3>
                <div className="m-5 "  >
                        <form >
                        <label style={{marginRight:"80%"}} className="mb-3">E-mail</label>
                        <input type="email" class="form-control w-100 rounded-0 mb-3"   name="e_mail" value={this.state.e_mail} onChange={(e)=>this.handleChange(e)} placeholder="Enter your E-mail" />
                        <label style={{marginRight:"88%"}} className="mb-3">Password</label>
                        <input type="password" class="form-control w-100 rounded-0 mb-3"  name="password" value={this.state.password} onChange={(e)=>this.handleChange(e)} placeholder="Enter your password" />

                        <button className="btn text-white fw-bold w-100 my-3" style={{backgroundColor:"#FF3F6C"}} onClick={this.handleSubmit}>Login</button>
                        <a href="/login" className="btn text-white fw-bold w-100 my-3" style={{backgroundColor:"#FF3F6C"}} >Cancel</a>
                        </form>
                        <p>Don't have an account ? <Link to={"/signup"} style={{cursor :"pointer",color:"#FF3F6C",fontWeight:"bold"}}>Signup</Link></p>
                </div>
                <br className="my-5"/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br  className="my-5"/>
                <br  className="my-5"/>
                <br  className="my-5"/>
                <br className="my-5"/>
                </div>
                </div>
            </div>
        )
    }
}

export default profile
