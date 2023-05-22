import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  useGetAllServicesQuery,
  useGetAllFoodServiceQuery,
  useGetAllAccommodationsQuery,
} from "../../Features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const ToEat = ({ data }) => {
  const navigate = useNavigate();

  console.log("DATA:", data);

  const { data: allFoodService } = useGetAllFoodServiceQuery("foodservice", {
    pollingInterval: 2000,
  });

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

  const handleNavigate = (id) => {
    navigate(`/foodservice/${id}`);
  };

  return (
    <>
      <div className="container mx-auto mt-4 mb-20">
        <h2 className="text-2xl font-bold mb-8 ml-10">Places to Eat</h2>

        <Slider {...settings}>
          {allFoodService?.map((destination) => (
            <div
              className="group cursor-pointer flex "
              onClick={() => handleNavigate(destination._id)}
            >
              <Link className="">
                <img
                  src={destination.photos?.[0]}
                  alt="default"
                  className="w-[300px] h-[200px] object-cover group-hover:brightness-125 mx-auto"
                />

                <h2 className="font-semibold mb-4 text-lg group-hover:underline mt-2 mx-auto md:ml-6">
                  {destination.name}
                </h2>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ToEat;
