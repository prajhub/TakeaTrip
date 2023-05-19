import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  useGetAllServicesQuery,
  useGetAllFoodServiceQuery,
  useGetAllAccommodationsQuery,
} from "../../Features/api/apiSlice";
import { Link } from "react-router-dom";
import ToStay from "./ToStay";
import ToEat from "./toEat";
import ToDo from "./ToDo";

const Explore = () => {
  const { data: allServices } = useGetAllServicesQuery();

  const { data: allAccommodations } = useGetAllAccommodationsQuery();

  const { data: allFoodServices } = useGetAllFoodServiceQuery();

  console.log(allAccommodations);

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-3">
            Explore the <span className="text-primary-700">World</span>
          </h1>
          <p>
            Great opportunities To travel | Take a Holiday | Enjoy yourself |
            Take a Trip!
          </p>
        </div>
        <ToStay data={allAccommodations} />
        <ToEat data={allFoodServices} />
        <ToDo data={allServices} />
      </div>
    </>
  );
};

export default Explore;
