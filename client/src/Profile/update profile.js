import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export class update  extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             fullname:"",
             gender:"",
             e_mail:"",
            
             records:[]
        }
    }

    componentDidMount(){
        this.getRecords()
    
    }

    getRecords=()=>{
        const token = localStorage.getItem('userToken')
        const decoded= jwt_decode(token)
        console.log(decoded.user.id)
        const id=decoded.user.id

        axios.post('http://localhost:7000/getUser',{id})
        .then((response)=>{
            console.log(response.data.fullname)

            this.setState({records:response.data})
            this.setState({fullname:this.state.records.fullname})
            this.setState({gender:this.state.records.gender})
            this.setState({e_mail:this.state.records.e_mail})
        }).catch((err)=>{
            console.log(err)
        })
    }
   
    handleGender=(e)=>{
        const gender = e.target.value
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
    handleChange=(e)=>{
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit=()=>{
        const token = localStorage.getItem('userToken')
        const decoded= jwt_decode(token)
        console.log(decoded.user.id)
        const id=decoded.user.id
         var data={
            fullname:this.state.fullname,
            gender:this.state.gender,
            e_mail:this.state.e_mail
         }

         console.log(data)

         axios.put('http://localhost:7000/updateuser',{id,data})
         .then((response)=>{
             this.setState({records:response.data})
             alert("your profile updated")
         }).catch((err)=>{
             console.log(err)
         })



    }




    returnGender=(gender)=>{
        if(gender==="male"){
            return(
                <div>
                <span className="mx-4">
                      <input class="form-check-input " type="radio" checked name="gender" required value="male" onClick={this.handleGender}  id="male" />
                     <label class="form-check-label "  for="male">
                           Male
                       </label>
                        </span>
                         <span className="mx-4">
                        <input class="form-check-input" type="radio"  name="gender" onClick={this.handleGender}  required value="female"  id="female" />
                         <label class="form-check-label" for="female">
                            Female
                         </label>
                        </span>
                        <span className="mx-4">
                       <input class="form-check-input" type="radio" name="gender" onClick={this.handleGender}  required  value="others" id="others" />
                        <label class="form-check-label" for="others">
                           Others
                         </label>
                         </span>
                        </div>
            )
        }

        if(gender==='female'){
            return(
                <div>
                <span className="mx-4">
                      <input class="form-check-input " type="radio"  name="gender"  onClick={this.handleGender}  required value="male"   id="male" />
                     <label class="form-check-label "  for="male">
                           Male
                       </label>
                        </span>
                         <span className="mx-4">
                        <input class="form-check-input" type="radio" checked name="gender" onClick={this.handleGender}  required value="female"  id="female" />
                         <label class="form-check-label" for="female">
                            Female
                         </label>
                        </span>
                        <span className="mx-4">
                       <input class="form-check-input" type="radio" name="gender" required onClick={this.handleGender}  value="others" id="others" />
                        <label class="form-check-label" for="others">
                           Others
                         </label>
                         </span>
                        </div>
            )
        }

        if(gender==='others'){
            return(
                <div>
                <span className="mx-4">
                      <input class="form-check-input " type="radio"  name="gender" onClick={this.handleGender}  required value="male"   id="male" />
                     <label class="form-check-label "  for="male">
                           Male
                       </label>
                        </span>
                         <span className="mx-4">
                        <input class="form-check-input" type="radio"  name="gender" onClick={this.handleGender}  required value="female"  id="female" />
                         <label class="form-check-label" for="female">
                            Female
                         </label>
                        </span>
                        <span className="mx-4">
                       <input class="form-check-input" type="radio" name="gender" onClick={this.handleGender}  checked required  value="others" id="others" />
                        <label class="form-check-label" for="others">
                           Others
                         </label>
                         </span>
                        </div>
            )
        }
    }

    render() {
        
        
      

        return (
            <div>
                 <div className="card mx-auto my-5 rounded-4 " style={{width:'500px'}} >
                    <h5 className="text-start mx-4 mt-3">Update</h5>
                   <form className=" mx-5 mt-4 mb-3" >
                   <label style={{marginRight:"80%"}} className="mb-3">Fullname</label>
        <input type="text" name="fullname"  className="form-control w-100 rounded-5 mb-3 " value={this.state.fullname} onChange={this.handleChange}  placeholder="Enter your E-mail" />
            <div class="form-check mr-5 my-3" >
                {this.returnGender(this.state.gender)}
            </div>
        <label style={{marginRight:"85%"}} className="mb-3">E-mail</label>
        <input type="email" className="form-control w-100 rounded-5 mb-3 " name="e_mail" value={this.state.e_mail} onChange={this.handleChange} placeholder="Enter your E-mail" />
        
        

                        <a className="btn text-white fw-bold " href="/update" onClick={this.handleSubmit} style={{backgroundColor:"#FF3F6C",width:'150px'}}>Edit</a>
                        <a className="btn text-dark  fw-bold bg-light mx-2 " style={{width:'150px'}} href="/update" >Cancel</a>
                   </form>
                    
                    <a href="/" className="text-danger my-5"><span className="text-danger me-2">&#8592;</span>Back to home</a>

                </div>
            </div>
        )
    }
}

export default update
