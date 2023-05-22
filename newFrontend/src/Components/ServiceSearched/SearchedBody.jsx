import React, { useState } from "react";
import { useLocation } from "react-router";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { Slider } from "antd";
import moment from "moment";
import { useGetServiceByLocationQuery } from "../../Features/api/apiSlice";
import SearchItem from "./SearchItem";
import { Skeleton } from "antd";
// import SearchItem from "./SearchItem";

const SearchedBody = () => {
  const dollarFormatter = (value) => `$${value}`;

  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  
  const [options, setOptions] = useState(location.state.options);

  const formattedDate = moment(date).format("DD-MM-YYYY");

  console.log(formattedDate);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);

  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onAfterChange = (value) => {
    setMin(value[0]);
    setMax(value[1]);
  };

  const { data, isLoading, isError, refetch } = useGetServiceByLocationQuery(
    destination,
    {
      pollingInterval: 15000,
    }
  );

  console.log(data);

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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label className="text-sm font-semibold">Check-in Date</label>

                <span
                
                  className="h-8 text-sm border-none p-1 bg-white flex items-center cursor-pointer"
                >{`${format(date, "MM/dd/yyyy")}`}</span>
              
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label className="text-sm font-semibold">Price per night</label>
                <div className=" ">
                 

                  <div className="flex justify-between mb-4 text-xs">
                    <span className="lsOpnText">Adult</span>
                    <input
                      type="nubmer"
                      min={1}
                      className="w-50 "
                      placeholder={options.adult}
                    />
                  </div>
                  <div className="flex justify-between mb-4 text-xs">
                    <span className="lsOpnText">Children</span>
                    <input
                      type="nubmer"
                      min={0}
                      className="w-50"
                      placeholder={options.children}
                    />
                  </div>
                  <div className="flex justify-between mb-4 text-xs">
                    <span className="lsOpnText">Rooms</span>
                    <input
                      type="nubmer"
                      min={1}
                      className="w-50"
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
             
            </div>
            <div className="flex-[3_1_0%]">
              {isLoading ? (
                <Skeleton active />
              ) : isError ? (
                <span className="text-2xl font-semibold">
                  No accommodations found in the location!
                </span>
              ) : (
                <>
                  {data?.map((item) => (
                    <SearchItem
                      item={item}
                      date={formattedDate}
                      key={item._id}
                    />
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
