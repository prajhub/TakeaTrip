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
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleSelect = (date) => {
    const newDate = new Date(date);
    setDate(newDate);
    setOpenDate(false);
  };

  console.log(date);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();

  const handleSearch = async () => {
    navigate("/services", { state: { destination, date, options } });
  };

  return (
    <>
      <section
        className="bg-cover bg-center bg-gray-800 py-32"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562583078-e6ea1404f83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Explore the place
          </h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            Explore different things to do and see...
          </h3>
        </div>

        <div className=" h-[30px] bg-white border-2 border-solid border-yellow-400 flex items-center justify-around py-7 px-0 rounded-md w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <FaBed />
            <input
              type="text"
              placeholder="Where are you going?"
              className=" border-none outline-none"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineCalendar />
            <span onClick={() => setOpenDate(!openDate)}>
              {formattedDate ||
                date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
            </span>
            {openDate && (
              <Calendar
                date={date}
                onChange={handleSelect}
                color="#009688"
                minDate={new Date()}
                maxDate={new Date(2024, 12, 31)}
                dateDisplayFormat="MMM d, yyyy"
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <BsFillPersonFill />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="text-gray-400 cursor-pointer"
            >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
            {openOptions && (
              <div className="absolute top-96 bg-white text-gray-400 rounded-5 shadow-md">
                <div className=" w-[200px] flex justify-between  m-3">
                  <span className="optionText">Adult</span>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("adult", "d")}
                      disabled={options.adult <= 1}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-[200px] flex justify-between  m-3">
                  <span className="optionText">Children</span>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("children", "d")}
                      disabled={options.children <= 0}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-[200px] flex justify-between  m-3">
                  <span className="optionText">Room</span>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("room", "d")}
                      disabled={options.room <= 1}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className=" w-8 h-8 border border-primary-500 text-primary-500 cursor-pointer bg-white"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
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
