import React from "react";
import { useNavigate } from "react-router";

const SearchItem = ({ item, min, max, date }) => {
  const navigate = useNavigate();

  const handleSeeAvailabilityClick = () => {
    navigate(`/service/${item._id}`, { state: { date, item } });
  };

  return (
    <>
      <div className="border border-solid border-gray-300 p-3 rounded-lg flex justify-between gap-5 mb-20">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className=" w-[200px] h-[200px] object-cover"
        />

        <div className="flex flex-col gap-3 flex-[2_2_0%]">
          <h1 className="text-2xl font-semibold text-primary-700">
            {item.name}
          </h1>

          <span className="text-xs bg-primary-600 w-max text-white px-3 py-1 rounded-md">
            Free airport taxi
          </span>
          <span className="text-xs font-bold">
            Studio Apartment with Air conditioning
          </span>
          <span className="text-xs">
            Entire studio • 1 bathroom • 21m² 1 full bed
          </span>
          <span className="text-xs  font-bold text-primary-500">
            Free cancellation{" "}
          </span>
          <span className="text-xs text-primary-500">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className=" flex-1 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="font-medium">Excellent</span>
            <button className="bg-primary-600 text-white p-1 font-bold rounded-none border-0">
              8.9
            </button>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className=" text-xl">${item.cheapestPrice}</span>
            <span className="text-xs text-gray-400">
              Includes taxes and fees
            </span>
            <button
              onClick={handleSeeAvailabilityClick}
              className="bg-primary-600 text-white text-center font-bold pt-3 pb-2 border-none rounded cursor-pointer"
            >
              See availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
