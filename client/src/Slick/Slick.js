import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Slick/slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Slickimg  extends Component{
  constructor() {
    super();
    this.state = { apiResponse: [] };
  }

  callAPI() {
    fetch("http://localhost:7000/getSlick")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res}));
  }

  componentDidMount() {
    this.callAPI();
  }

    render(){
      var listItems =this.state.apiResponse.map((value)=>
        <div>
          <img src={value.url} />
      </div>
      )
      var settings = {
        dots: true,
        infinite: false,
        arrows:false,
        autoplay:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <Slider className="mt-3"{...settings}>
          
          {listItems}
          
        </Slider>
      );

    }
}


