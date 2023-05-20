import React from "react";
import { useNavigate } from "react-router";

const SearchItem = ({ item }) => {
  console.log(item);

  const { features, cuisines } = item;
  const [feature1, feature2] = features.slice(0, 2);

  const allCuisines = cuisines.join(", ");
  console.log(allCuisines);

  const navigate = useNavigate();

  const handleSeeAvailabilityClick = () => {
    navigate(`/foodservice/${item._id}`, { state: { item } });
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
            {feature1} {feature2}
          </span>
          <span className="text-xs font-bold">{allCuisines}</span>
        </div>
        <div className=" flex-1 flex flex-col justify-between">
          <div className="flex justify-end">
            <span className="font-medium">Excellent</span>
          </div>
          <div className="text-right flex flex-col gap-1">
            <button
              onClick={handleSeeAvailabilityClick}
              className="bg-primary-600 text-white text-center font-bold pt-3 pb-2 border-none rounded cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
