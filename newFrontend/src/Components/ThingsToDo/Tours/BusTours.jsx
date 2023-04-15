import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStarsRating from 'react-awesome-stars-rating'
import { Link } from 'react-router-dom'

const BusTours = () => {

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
          name: "Versailles Palace Live Tour with Gardens Access from Paris",
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


  return (
    <>
    
    <div className="max-w-[1400px] mx-auto my-8">

<h2 className="text-2xl font-bold mb-8 ml-10">Bus Tours</h2>

<Slider {...settings}>
{destinations.map((destination) => (
  <div className='group cursor-pointer flex '>
   

  <Link className=''>


      <img src='https://images.unsplash.com/photo-1548585742-1df49e753a83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80' 
              alt='default'
              className="w-[300px] h-[200px] object-cover group-hover:brightness-125 mx-auto"
          />
          <div className='flex flex-col justify-start ml-3 '>

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
          <p className='font-semibold ml-6'>$100 per person</p>  
          </div>
                     


  </Link>
 

</div>
))}
</Slider>

</div>

    </>
  )
}

export default BusTours