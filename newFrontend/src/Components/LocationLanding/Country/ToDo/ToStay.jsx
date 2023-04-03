import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactStarsRating from 'react-awesome-stars-rating'
import { Link } from 'react-router-dom'

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
      name: "New Cafe Love",
      location: 'Cologne, Germany'
    },
    {
      name: "Cafe Love",
      location: 'Cologne, Germany'
    },
    {
      name: "Cafe Love",
      location: 'Cologne, Germany'
    },
    {
      name: "Cafe Love",
      location: 'Cologne, Germany'
    },
    {
        name: "Cafe Love",
        location: 'Cologne, Germany'
      },
  ];




const ToStay = () => {
  return (
    <>

    <div className="container mx-auto my-8">

        <h2 className="text-2xl font-bold mb-8 ml-10">Places to Stay</h2>

        <Slider {...settings}>
        {destinations.map((destination) => (
          <div className='group cursor-pointer flex '>
           

          <Link className=''>


              <img src='https://media-cdn.tripadvisor.com/media/photo-s/22/d9/7b/42/this-image-has-been-removed.jpg' 
                      alt='default'
                      className="w-[300px] h-[200px] object-cover group-hover:brightness-125 mx-auto"
                  />

              <h2 className="font-semibold text-lg group-hover:underline mt-2 mx-auto md:ml-6">
                      {destination.name}
                  </h2> 


                   <span className="flex items-center mb-2 mt-2 mx-auto md:ml-6">
                      <ReactStarsRating 
                          
                          className="flex mr-2"
                          size={20}
                          isEdit={false}
                          primaryColor="#00afef" 
                          secondaryColor="#e5e7eb" 
                      />
                      ~ 50 Reviews
                  </span>                 


          </Link>
         

      </div>
        ))}
      </Slider>

    </div>
    
    </>
  )
}

export default ToStay