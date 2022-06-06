import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 

export class sizes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const renderSizes=this.props.sizes.map((value)=><span className="mx-3">{value}</span>)
        return (
            <div>
                {renderSizes}
            </div>
        )
    }
}

export default sizes
