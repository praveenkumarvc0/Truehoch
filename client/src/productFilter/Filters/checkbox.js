import React, { Component } from 'react'
import {Form,FormCheck,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
export class checkbox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            checked:[]
             
        }
    }

    handleChange(value){
        const currentIndex=this.state.checked.indexOf(value)
        const newChecked=[...this.state.checked]

        if(currentIndex===-1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        this.setState({checked:newChecked})
        this.props.handlefilters(newChecked)
    }
    
    render() {

        return (
            <Row style={{marginRight:"100px"}}>
                {this.props.filter.map((value,index)=>
               
               <Col className="ml-2" md={1}   >
                   <React.Fragment>
               
            <Form.Check  style={{marginRight:"100px",fontSize:"12px"}}
              
              name="terms"
              label={value}
          onChange={()=>this.handleChange(value)}
        //   checked={this.checked.indexOf(value)===-1 ? false:true}
            //   isInvalid={!!errors.terms}
            //   feedback={errors.terms}
              id={index}
            />
       </React.Fragment>
                </Col>
                
                            )}
            </Row>
        )
    }
}

export default checkbox
