import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class imageSlider  extends Component{
  constructor(props) {
    super(props);
    this.state = { apiResponse: [],play:true};
  }


   
//    runSlide(){
//        this.setState({play:!this.state.play})
//    }



    render(){
   
      var settings = {
        dots: true,
        arrows:false,
        infinite: true,
        autoplay:true,
        speed: 50,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <Slider  {...settings}>
          
          {this.props.images.map((image,index)=><div>

              <img src={image} height="250px" width="40px" alt="Product Images" />
          </div>
          
          )}
          
        </Slider>
      );

    }
}


