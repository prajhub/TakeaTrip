import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

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
  prevArrow: (
    <button type="button" className="slick-prev">
      <BsArrowLeftCircle />
    </button>
  ),
  nextArrow: (
    <button type="button" className="slick-next">
      <BsArrowRightCircle />
    </button>
  ),
};

const properties = [
  {
    name: "Hotels",
    imageUrl:
      "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80",
  },
  {
    name: "Resort",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Villa",
    imageUrl:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Apartments",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1672252617602-e5de5c6aba9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
  {
    name: "Cabin",
    imageUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Vacation homes",
    imageUrl:
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
  },
  {
    name: "Hostels",
    imageUrl:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
];

const ThingstoDo = () => {
  return (
    <>
      <div className="max-w-[1400px] mx-auto my-8">
        <h2 className="text-2xl font-bold mb-2 ml-4">Things to Do</h2>
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.name} className="p-4">
              <img
                className="mx-auto h-60 w-65 object-cover"
                src={property.imageUrl}
                alt={property.name}
              />
              <p className="text-lg font-semibold mt-2 mx-auto ">
                {property.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ThingstoDo;
