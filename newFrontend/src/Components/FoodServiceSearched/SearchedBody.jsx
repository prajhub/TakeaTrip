import React, { useState } from "react";
import { useLocation } from "react-router";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { Slider } from "antd";
import moment from "moment";
import { useGetFoodServiceByLocationQuery } from "../../Features/api/apiSlice";
import SearchItem from "./SearchItem";

// import SearchItem from "./SearchItem";

const SearchedBody = () => {
  const dollarFormatter = (value) => `$${value}`;

  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);

  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onAfterChange = (value) => {
    setMin(value[0]);
    setMax(value[1]);
  };

  const { data, isLoading, isError, refetch } =
    useGetFoodServiceByLocationQuery(destination, {
      pollingInterval: 2000,
    });

  console.log(data);

  // const handleClick = () => {
  //     const url = `http://localhost:5000/accommodation?location=${destination}&min=${min || 0 }&max=${max || 999}`
  //     refetch({endpoint: url})
  // }

  return (
    <>
      <section className="">
        <div className="flex justify-center mt-5">
          <div className=" w-full max-w-5xl flex gap-5">
            <div className=" flex-1 bg-white p-3 rounded-md border border-gray-300 sticky top-3">
              <h1 className=" text-xl text-[#555] font-semibold mb-3">
                Search
              </h1>
              <div className="flex flex-col gap-2 mb-3">
                <label className="text-md font-semibold">Destination</label>
                <input
                  className=" h-8 rounded-md p-2 mt-2 mb-2"
                  placeholder={destination}
                  type="text"
                />
              </div>

              <button className=" p-2 bg-primary-600 text-white border-none w-full font-medium cursor-pointer">
                Search
              </button>
            </div>
            <div className="flex-[3_1_0%]">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchedBody;
