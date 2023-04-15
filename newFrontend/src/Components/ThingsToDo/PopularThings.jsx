import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const PopularThings = () => {

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

  const types = [
    {
      name: "Water Tours",
      imageUrl: "https://images.unsplash.com/photo-1659786927096-ece17fad71b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    },
    {
      name: "Land Tours",
      imageUrl: "https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Air Tours",
      imageUrl: "https://images.unsplash.com/photo-1559686043-aef1bbc98d19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Private Tours",
      imageUrl: "https://images.unsplash.com/photo-1629165124903-2c45c975cc62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
        name: "Bus Tours",
        imageUrl: "https://images.unsplash.com/photo-1502067294280-729dc7fea201?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      {
        name: "Day Trips",
        imageUrl: "https://plus.unsplash.com/premium_photo-1664302906692-c669a580e2c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      },
      {
        name: "Landmarks",
        imageUrl: "https://images.unsplash.com/photo-1548585742-1df49e753a83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
      },
  ];



  return (
    <>


<div className="max-w-[1400px] mx-auto my-8">
      <h2 className="text-2xl font-bold mb-2 ml-4">Popular things to do</h2>
      <Slider {...settings}>
        {types.map((type) => (
          <div key={type.name} className="p-4">
            <img
              className="mx-auto h-60 w-65 object-cover"
              src={type.imageUrl}
              alt={type.name}
            />
            <p className="text-lg font-semibold mt-2 mx-auto ">{type.name}</p>
          </div>
        ))}
      </Slider>
    </div>
        
    
    </>
  )
}

export default PopularThings