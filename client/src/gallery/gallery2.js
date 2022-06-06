import React,{Component} from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './gallery.css'

export default class gallery extends Component{
    constructor(){
        super()
        this.state={
            galleryimg:[],
            title:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:7000/getgalleryimg')
        .then(res => res.json())
        .then(res => this.setState({ galleryimg: res}))
        // .then(res => this.setState({title:res.imgName}) );
    }

    render(){
        var galleryImages = this.state.galleryimg.map((images)=>
            <Col sm={2} className="mx-3 my-3">
            <Card className="gallery" style={{ width: '18rem',border:"none" }}>
                <Card.Img variant="top" src={images.imgURL} />
                
            </Card>
            </Col>
        )

    return(
        <div className="mt-5">
        <h1 style={{textAlign:'left',marginLeft:'35px',letterSpacing:'3px',fontSize:'26px'}}>BIGGEST DEALS ON TOP BRANDS</h1>
        <Row className="my-5 ml-5">
           
           {galleryImages} 
        </Row>
        </div>
    )
    }
}