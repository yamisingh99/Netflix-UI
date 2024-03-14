import React from 'react';
import Slider from 'react-slick';

function Carousel({ items }) {
  console.log("🚀 ~ Carousel ~ items:", items)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          {/* Assuming item is an object, access its properties correctly */}
          <h3>{item.name}</h3>
          <p>{item.summary}</p>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
