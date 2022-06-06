import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class image extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        
        const imageCol = this.props.images.map((value,index)=>
        <Col lg={4} className="mx-5 my-3"><img src={value} width="400px"alt="Product images" /></Col>)
        return (
            <div>
                <Row>
                    {imageCol}
                </Row>
            </div>
        )
    }
}

export default image
