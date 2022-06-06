import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Slick/slick.css';

var url=['https://images.unsplash.com/photo-1547366868-f5d6fab0440f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGluZGlhbiUyMGZlc3RpdmFsfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80','https://i.pinimg.com/originals/7c/9e/98/7c9e9852e6fc74c47133a5a1431312a7.jpg',
]

var urlList=url.map((img)=>
    <div>
        <img src={img} alt="flower images" />
    </div>
)

export default function slick() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
     {urlList}
    </Slider>
  );
}