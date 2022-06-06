import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Slick/slick.css';

var url=['https://assets-news.housing.com/news/wp-content/uploads/2019/09/10083609/Fresh-floral-decorations-for-Ganesh-Chaturthi-FB-1200x700-compressed-1200x700.jpg','https://i.pinimg.com/originals/46/4c/99/464c9940be7d1772f5e9003842f59c1c.jpg',
'https://i.pinimg.com/originals/16/83/f0/1683f062806e0d30cb6d59f5dc73b7ae.jpg','https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/11/flower-pti-1574732015.jpg']



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
      <div>
        <img src={url[0]} alt="img_1" />
      </div>
      <div>
      <img src={url[1]} alt="img_2" />
      </div>
      <div>
      <img src={url[2]} alt="img_3" />
      </div>
      <div>
      <img src={url[3]} alt="img_4" />
      </div>
     
    </Slider>
  );
}