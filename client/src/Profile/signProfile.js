import React, { Component } from 'react'
import Axios from 'axios'

export class signProfile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fullname:"",
            gender:"",
            e_mail:"",
            password:"",
            confirm_password:"",
            errors:[],
            
        }
    }
    
    
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handlegender=(event)=>{

        const gender = event.target.value
        if(gender==="male"){
            this.setState({gender:"male"})
        }

        if(gender==="female"){
            this.setState({gender:"female"})
        }

        if(gender==="others"){
            this.setState({gender:"others"})
        }
    }

    isFormvalid=()=>{
        console.log("you are in isForm valid")

        console.log(this.state.gender)
        let error
        let errorsArray=this.state.errors;
        if(this.isFormempty(this.state)){
            console.log('your form is empty')
            error={message:"Fill in all the fields"}
            errorsArray.push(error)
            console.log(error)
           this.setState({errors:errorsArray})
            console.log(this.state.errors)

            console.log(this.state.password)
            console.log(this.state.confirm_password)

            

            errorsArray=[]
        }else if (!this.isPasswordvalid(this.state)){

            console.log("your password is not matching")
           error={message:"Password is invalid"}
           console.log(error)
           errorsArray.push(error)
           this.setState({errors:errorsArray})
        //    this.setState({errors:errors.concat(error)})
        }else{
            this.setState({errors:[]})
            return true;
        }
    }
    
    isPasswordvalid=()=>{
        const {password,confirm_password}=this.state
        console.log("we are in isPassword Valid")
        if (password===confirm_password){
            return true
        }else{
            return false
        }
    }
    isFormempty=({fullname,gender,e_mail,password,confirm_password})=>{
        console.log("you are in isFormempty")
       
           if(!fullname.length||
           !gender.length||
            !e_mail.length||
            !password.length||
            !confirm_password.length) {
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

    handleSubmit=(event)=>{
       event.preventDefault()
       console.log('handleSubmit is working')

      var data={
           fullname:this.state.fullname,
           gender:this.state.gender,
           e_mail:this.state.e_mail,
           password:this.state.password,
           confirm_password:this.state.confirm_password
       }
       

        if (this.isFormvalid()){
            console.log('working')
            this.setState({errors:[]})
            console.log('going to see axios')

            Axios.post('http://localhost:7000/signup',data)
            .then(()=>{
                alert('Registered Successfully')
                window.location='/login'
            }).catch((err)=>{
                console.log(err)
            })
            console.log(data)
        } 
    }


    render() {
        return (
            <div style={{backgroundColor:"#0000E7",height:'1000px'}} className="p-5">
                <div className="card mx-auto my-5 rounded-4 " style={{width:'500px'}} >
                    <h5 className="text-start mx-4 mt-3">Signup</h5>
                   
                   <form className=" mx-5 mt-4 mb-3" >
                        <label style={{marginRight:"80%"}} className="mb-3">Fullname</label>
                        <input type="text" name="fullname" className="form-control w-100 rounded-5 mb-3 " value={this.state.fullname}  onChange={(e)=>this.handleChange(e)}  placeholder="Enter your E-mail" />
                            <div class="form-check mr-5 my-3" >
                                <span className="mx-4">
                                <input class="form-check-input " type="radio"  name="gender" required value="male" onClick={this.handlegender}  id="male" />
                                <label class="form-check-label "  for="male">
                                    Male
                                 </label>
                                 </span>
                                 <span className="mx-4">
                                <input class="form-check-input" type="radio"  name="gender" required value="female" onClick={this.handlegender} id="female" />
                                <label class="form-check-label" for="female">
                                    Female
                                 </label>
                                 </span>
                                 <span className="mx-4">
                                 <input class="form-check-input" type="radio" name="gender" required onClick={this.handlegender} value="others" id="others" />
                                <label class="form-check-label" for="others">
                                    Others
                                 </label>
                                 </span>
                            </div>
                        <label style={{marginRight:"85%"}} className="mb-3">E-mail</label>
                        <input type="email" className="form-control w-100 rounded-5 mb-3 "  name="e_mail" value={this.state.e_mail} onChange={(e)=>this.handleChange(e)} placeholder="Enter your E-mail" />
                        <label style={{marginRight:"85%"}} className="mb-3">Password</label>
                        <input type="password" className="form-control w-100 rounded-5 mb-3 " name="password" value={this.state.password} onChange={(e)=>this.handleChange(e)} placeholder="Enter your password" />
                        <label style={{marginRight:"65%"}} className="mb-3">Confirm Password</label>
                        <input type="password" className="form-control w-100 rounded-5 mb-3 " name="confirm_password" value={this.state.confirm_password} onChange={(e)=>this.handleChange(e)} placeholder="Re-enter your password" />

                        <p>{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>

                        <a className="btn text-white fw-bold " onClick={this.handleSubmit} style={{backgroundColor:"#FF3F6C",width:'150px'}}>Save</a>
                        <a className="btn text-dark  fw-bold bg-light mx-2 " style={{width:'150px'}} href="/signup" >Cancel</a>
                   </form>
                    

                </div>
            </div>
        )
    }
}

export default signProfile
