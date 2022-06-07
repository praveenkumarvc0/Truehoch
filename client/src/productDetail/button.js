import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class button extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    


    render() {
        const button = this.props.size.map((value)=><button className="btn border-2 border-dark mx-3 px-4 py-3 " style={{borderRadius: "90%",fontSize:'14px' }}>{value}</button>)
        return (
            <div>
                {button}
            </div>
        )
    }
}

export default button
