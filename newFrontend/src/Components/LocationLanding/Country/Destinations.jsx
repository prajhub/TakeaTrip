import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const destinations = [
    {
      name: "New York",
      imageUrl: "https://via.placeholder.com/300x200.png?text=New+York",
    },
    {
      name: "Paris",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Paris",
    },
    {
      name: "Tokyo",
      imageUrl: "https://via.placeholder.com/300x200.png?text=Tokyo",
    },
    {
      name: "London",
      imageUrl: "https://via.placeholder.com/300x200.png?text=London",
    },
    {
        name: "London",
        imageUrl: "https://via.placeholder.com/300x200.png?text=London",
      },
  ];


const TopDestinations = () => {
  return (
   <>
   
   <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 ml-10">Destinations</h2>
      <Slider {...settings}>
        {destinations.map((destination) => (
          <div key={destination.name} className="p-4">
            <img
              className="mx-auto"
              src={destination.imageUrl}
              alt={destination.name}
            />
            <p className="text-lg font-semibold mt-2 mx-auto md:ml-6">{destination.name}</p>
          </div>
        ))}
      </Slider>
    </div>
   
   </>
  )
}

export default TopDestinations