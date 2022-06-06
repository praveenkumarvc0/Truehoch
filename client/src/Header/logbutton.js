import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export class logbutton extends Component {

    logOut=()=>{
        localStorage.removeItem('userToken')
    }

    render() {

        if(localStorage.userToken){
            return (
                <div>
                    <hr className="dropdown-divider"/>
                    <ul className="list-unstyled">
                    <li><a href="/update" className="text-decoration-none text-dark">Edit profile</a></li>
                    <li><a href="/" onClick={this.logOut} className="text-decoration-none text-dark">Logout</a></li>
                    </ul>
                   
                    
                </div>
            )
    }else{
        return(
            <div></div>
        )
    }
}

}




export default logbutton
