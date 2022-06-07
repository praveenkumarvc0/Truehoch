import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Slick/slick.css';


export default class Slickimg  extends Component{
    constructor() {
      super();
      this.state = { imgUrl: [] };
    }
  
    callAPI() {
      fetch("http://localhost:9000/arrayAPI")
        .then(res => res.json())
        .then(res => this.setState({ imgUrl: res }));
    }
  
    componentWillMount() {
      this.callAPI();
    }
  
      render(){
        var listItems =this.state.imgUrl.map((value)=>
          <div>
            <img src={value} />
        </div>
        )
        var settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        return (
          <Slider {...settings}>
            
            {listItems}
            
          </Slider>
        );
  
      }
  }