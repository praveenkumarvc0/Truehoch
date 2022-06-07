import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class imageSlider  extends Component{
 


   
//    runSlide(){
//        this.setState({play:!this.state.play})
//    }



    render(){
        
   
      var settings = {
        dots: false,
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

              <img src={image} height="280px" width="40px" alt="Product Images" />
          </div>
          
          )}
          
        </Slider>
      );

    }
}


