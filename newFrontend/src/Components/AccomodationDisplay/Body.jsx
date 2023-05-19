import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MdFamilyRestroom, MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSmokingNo } from "react-icons/tb";
import { BiPhoneCall, BiPencil } from "react-icons/bi";
import { Link } from "react-scroll";
import {
  AiOutlineGlobal,
  AiFillMail,
  AiFillCloseCircle,
  AiOutlineWifi,
} from "react-icons/ai";
import { CiParking1 } from "react-icons/ci";
import { format } from "date-fns";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { GiBroom } from "react-icons/gi";

import { useParams } from "react-router";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  useGetAccommodationByIdQuery,
  useGetReviewsByBusinessQuery,
} from "../../Features/api/apiSlice";
import { useLocation } from "react-router";

import ReserveTable from "./ReserveTable";
import ReviewSection from "./ReviewSection";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const { data: businessReview } = useGetReviewsByBusinessQuery(id, {
    pollingInterval: 2000,
  });

  const numberOfReviews = businessReview ? businessReview.length : 0;

  let startDate = null;
  let endDate = null;

  if (location.state && location.state.startDate && location.state.endDate) {
    startDate = location.state.startDate;
    endDate = location.state.endDate;
  }

  //if there is no startDate and endDate

  const [openDate, setOpenDate] = useState(false);
  const [newDate, setNewDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      key: "selection",
    },
  ]);

  const handleDateSelect = (item) => {
    setDate([item.selection]);
    setOpenDate(false); // Close the calendar
    setNewDate(true);
  };

  if (newDate) {
    startDate = date[0].startDate;
    endDate = date[0].endDate;
  }

  const { data, isLoading, error } = useGetAccommodationByIdQuery(id, {
    pollingInterval: 2000,
  });

  const photos = data?.photos;
  const accommodationId = data?._id;

  const navigateToReview = () => {
    navigate(`/review/${accommodationId}`);
  };

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(!open);
  };

  const handleMove = (direction) => {
    let newSlideNum;

    if (direction === "l") {
      newSlideNum = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNum = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNum);
  };

  const amenities = [
    {
      name: "Private Parking",
      icon: <CiParking1 />,
    },
    {
      name: "Free WiFi",
      icon: <AiOutlineWifi />,
    },
    {
      name: "Family Rooms",
      icon: <MdFamilyRestroom />,
    },
    {
      name: "Non-smoking rooms",
      icon: <TbSmokingNo />,
    },
    {
      name: "Good Breakfast",
      icon: <MdOutlineFreeBreakfast />,
    },
    {
      name: "Room service",
      icon: <GiBroom />,
    },
  ];

  return (
    <>
      {data && (
        <section className="max-w-[1400px] mx-auto mt-4 border-t ">
          <div class="flex justify-between items-center py-2">
            <div class="flex-1">
              <h1 class="text-3xl font-bold">{data.name}</h1>
              <p class="text-gray-700 text-sm mt-4 flex flex-row items-center gap-1">
                {" "}
                <HiLocationMarker /> {data.address}
              </p>
              <div class="flex items-center mt-2 mb-3">
                <div class="bg-yellow-400 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold  text-xs">
                  8.9
                </div>
                <span class="ml-2 text-gray-700 font-medium text-xs">
                  ({numberOfReviews} reviews)
                </span>
              </div>
              <p class="text-gray-700 text-sm mt-2 cursor-pointer   flex flex-row items-center gap-1 ">
                <div className="flex flex-row items-center hover:underline gap-1">
                  <span class="font-bold">
                    <BiPhoneCall size={20} />
                  </span>{" "}
                  +65 6688 8868
                </div>
                <div className="flex flex-row items-center hover:underline gap-1">
                  <span class="font-bold md:ml-20 ">
                    <AiOutlineGlobal size={20} />
                  </span>{" "}
                  Visit Website
                </div>
                <div className="flex flex-row items-center hover:underline gap-1">
                  <span class="font-bold md:ml-20 ">
                    <AiFillMail size={20} />
                  </span>{" "}
                  Email
                </div>
                <div
                  onClick={navigateToReview}
                  className="flex flex-row items-center hover:underline gap-1"
                >
                  <span class="font-bold md:ml-20 ">
                    <BiPencil size={20} />
                  </span>{" "}
                  Write a review
                </div>
              </p>
            </div>

            <div class="ml-4 flex flex-row items-center gap-4  flex-shrink-0">
              <p class="text-gray-700 font-medium text-sm">
                $320 <span class="text-xs font-normal">/night</span>
              </p>
              <Link
                activeClass="active"
                to="reserve-table"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <button
                  type="button"
                  class="bg-blue-600 text-white font-medium text-sm py-2 px-4 rounded mt-2"
                >
                  View deals
                </button>
              </Link>
            </div>
          </div>

          {open && (
            <div className=" sticky top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-50 flex items-center">
              <AiFillCloseCircle
                size={30}
                onClick={() => setOpen(false)}
                className="absolute top-10 right-40  text-gray-400 cursor-pointer"
              />
              <BsFillArrowLeftCircleFill
                onClick={() => handleMove("l")}
                className="m-20 text-5xl  cursor-pointer"
              />
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={photos[slideNumber]}
                  alt=""
                  className="w-4/5 h-80vh"
                />
              </div>
              <BsFillArrowRightCircleFill
                onClick={() => handleMove("r")}
                className="m-20 text-5xl  cursor-pointer"
              />
            </div>
          )}
          <div className="flex flex-wrap wrap justify-between mt-7">
            {photos.map((photo, i) => (
              <div className=" w-1/3">
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="w-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div class="flex flex-wrap py-6 md:mt-6">
            <div class="w-full md:w-2/3 md:pr-10">
              <h2 class="text-xl font-semibold mb-4">Description</h2>
              <p class="text-gray-700 leading-relaxed mb-8">{data?.desc}</p>
              <h2 class="text-xl font-semibold mb-4">
                Most Popular Facilities
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {data?.amenities?.map((amenity, index) => (
                  <div key={index} className="flex flex-row items-center">
                    <span className="ml-2 font-semibold text-sm">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div class="w-full md:w-1/3 bg-white border h-[100px] border-gray-400 p-4 rounded-md">
              <span className="text-black text-lg font-semibold">
                Selected Date:
              </span>
              <div className="flex items-center justify-between  w-full flex-col gap-6">
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-gray-400 cursor-pointer text-lg"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    onChange={handleDateSelect}
                    moveRangeOnFirstSelection={false}
                    editableDateInputs={true}
                    minDate={new Date()}
                    ranges={date}
                    className=" top-96 w-full "
                  />
                )}
              </div>
            </div>
          </div>
          <div id="reserve-table">
            <ReserveTable data={data} startDate={startDate} endDate={endDate} />
          </div>

          <ReviewSection data={data} review={businessReview} />
        </section>
      )}
    </>
  );
};

export default Body;
