import React, { useState } from "react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Calendar } from "react-date-range";
import { format } from "date-fns";

import moment from "moment";
import StaysImg from "../../assets/staysimg.jpg";

import { FaBed } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const Hero = () => {
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    navigate("/foodservices", { state: { destination } });
  };

  return (
    <>
      <section
        className="bg-cover bg-center bg-gray-800 py-32"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-gray-600">
            Grab a bite!
          </h2>
          <h3 className="text-2xl mb-8 text-gray-600">
            Explore the different delicasy the world has to offer...
          </h3>
        </div>

        <div className=" h-[30px] bg-white border-2 border-solid border-yellow-400 flex items-center justify-between py-7 px-0 rounded-md w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Where are you going?"
              className=" border-none outline-none ml-3"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="headerSearchItem">
            <button
              type="button"
              class="px-3 py-2 mr-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
