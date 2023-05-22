import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MdFamilyRestroom, MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSmokingNo } from "react-icons/tb";
import { BiPhoneCall, BiPencil } from "react-icons/bi";
import {
  AiOutlineGlobal,
  AiFillMail,
  AiFillCloseCircle,
  AiOutlineWifi,
} from "react-icons/ai";
import { CiParking1 } from "react-icons/ci";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import { RiMapPin2Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router";

import ReviewSection from "./ReviewSection";
import { useGetFoodServicebyIdQuery } from "../../Features/api/apiSlice";

const Body = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: FoodData,
    isLoading,
    error,
  } = useGetFoodServicebyIdQuery(id, {
    pollingInterval: 2000,
  });

  console.log(FoodData);

  const redirectToWebsite = () => {
    window.location.href =`http://${FoodData?.website}`;
  };

  const photos = FoodData?.photos;

  const navigateToReview = () => {
    navigate(`/review/${FoodData?._id}`);
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

  return (
    <>
      <section className="max-w-[1400px]  mx-auto mt-4 border-t ">
        <div class="flex justify-between items-center py-2">
          <div class="flex-1">
            <h1 class="text-3xl font-bold">{FoodData?.name}</h1>
            <p class="text-gray-700 text-sm mt-4 flex flex-row items-center gap-1">
              {" "}
              <HiLocationMarker /> {FoodData?.address}
            </p>
            <div className="flex flex-row items-center">
              <div class="flex items-center mt-2 mb-3">
                <span class="ml-2 text-gray-700 font-medium text-xs">
                  ({FoodData?.reviews} reviews)
                </span>
              </div>
              <div className=" ml-2 border-l">
                <p className="text-xs ml-2  text-gray-400">{FoodData?.type}</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm mt-2 cursor-pointer   flex flex-row items-center gap-1 ">
              <div className="flex flex-row items-center hover:underline gap-1">
                <span class="font-bold">
                  <BiPhoneCall size={20} />
                </span>{" "}
                {FoodData?.number}
              </div>
              <div onClick={redirectToWebsite} className="flex flex-row items-center hover:underline gap-1">
                <span class="font-bold md:ml-20 ">
                  <AiOutlineGlobal size={20} />
                </span>{" "}
                Visit Website
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

          <div class="ml-4 flex flex-row hover:underline items-center  flex-shrink-0">
            <BsFillPencilFill />
            <button class=" text-black  font-medium text-md py-2 px-2 ">
              Review
            </button>
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
                src={photos[slideNumber].src}
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
          {photos?.map((photo, i) => (
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

        {/* Description Section */}

        <div class="flex flex-wrap py-6 md:mt-6">
          <div class="w-full md:w-2/3 md:pr-10">
            <h2 class="text-xl font-semibold mb-4">Description</h2>
            <p class="text-gray-700 leading-relaxed mb-8">
              {FoodData?.description}
            </p>
          </div>
          <div class="w-full md:w-1/3 bg-primary-500 p-4 rounded-md">
            <h2 class="text-white text-lg font-medium mb-2">Details</h2>

            <p class="text-white mb-2 text-md font-semibold">Price Range</p>
            <p class="text-white mb-3 text-sm">
              $ {FoodData?.minPrice} - $ {FoodData?.maxPrice}
            </p>
            <p class="text-white mb-1 text-md font-semibold">Cuisines</p>
            <p class="text-white mb-3 flex flex-row items-center gap-1">
              {FoodData?.cuisines?.map((cuisine) => (
                <p>{cuisine}, </p>
              ))}
            </p>
            <p class="text-white mb-1 text-md font-semibold">Food</p>
            <p class="text-white mb-3 flex flex-row items-center gap-1">
              {FoodData?.foods?.map((food) => (
                <p>{food}, </p>
              ))}
            </p>
            <p class="text-white mb-1 text-md font-semibold">Features</p>
            <p class="text-white mb-2 flex flex-row items-center gap-1">
              {FoodData?.features?.map((feature) => (
                <p>{feature}, </p>
              ))}
            </p>
          </div>
        </div>

        {/* Description Section */}

        <ReviewSection data={FoodData} />
      </section>
    </>
  );
};

export default Body;
