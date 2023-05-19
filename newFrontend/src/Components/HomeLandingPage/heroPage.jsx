import React, { useState, useRef } from "react";
import SearchModal from "../Reusables/SearchModal";
import { MdOutlineHotel } from "react-icons/md";
import { Link } from "react-router-dom";
import beachVid from "../../assets/beachVid.mp4";

const Hero = () => {
  return (
    <div className="w-full  h-screen relative">
      <video
        className="w-full object-cover h-full"
        src={beachVid}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <h1 className='font-["Unbounded"] text-[70px]'>
          Your adventure starts here
        </h1>

        <section className="mt-40 flex md:w-[1000px] justify-between    mx-auto">
          <Link to="/stays">
            <div className="flex flex-col items-center  hover:text-primary-700 cursor-pointer">
              <img
                className="h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <p className="text-3xl font-semibold">Places to stay</p>
            </div>
          </Link>

          <Link to="/eats">
            <div className="flex flex-col items-center hover:text-primary-700 cursor-pointer">
              <img
                className="h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1622115837997-90c89ae689f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <p className="text-3xl font-semibold">Places to eat</p>
            </div>
          </Link>

          <Link to="/service">
            <div className="flex flex-col items-center hover:text-primary-700 cursor-pointer">
              <img
                className="h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1578462524282-cc663ba71452?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <p className="text-3xl font-semibold">Things to Do</p>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Hero;
