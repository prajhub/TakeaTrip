import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { BiPhoneCall, BiPencil } from "react-icons/bi";
import {
  AiOutlineGlobal,
  AiFillMail,
  AiFillCloseCircle,
  AiOutlineWifi,
} from "react-icons/ai";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router";
import moment from "moment";
import { useLocation } from "react-router";
import { useGetServicebyIdQuery } from "../../Features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { bookService } from "../../Features/services/booking/bookServiceAction";
import UserReview from "./UserReview";
import Swal from "sweetalert2";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userid = useSelector((state) => state.auth.userInfo._id);

  const { id } = useParams();

  const { data, isLoading, error } = useGetServicebyIdQuery(id, {
    pollingInterval: 1000,
  });

  console.log(data);

  const navigateToReview = () => {
    navigate(`/review/${data?._id}`);
  };

  const photos = data?.photos;
  console.log(photos);

  const serviceid = data?._id;
  const name = data?.name;

  const allPackages = data?.packages;

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

  const [date, setDate] = useState(new Date());
  console.log(date);
  const [openDate, setOpenDate] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  console.log(formattedDate);

  const handleSelect = (date) => {
    const sendDate = new Date(date); // Convert the selected date to a Date object
    setDate(sendDate);
    setOpenDate(false);
    setFormattedDate(
      sendDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  };

  //Num of Peopl
  const [numPeople, setNumPeople] = useState(0);

  const handleNumPeople = (event) => {
    setNumPeople(event.target.value);
  };

  const [selectedPackage, setSelectedPackage] = useState({});
  console.log(selectedPackage);

  const totalamount = selectedPackage.price * numPeople;
  console.log(totalamount);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  const onToken = async (token) => {
    const bookingDetails = {
      userid,
      serviceid,
      token,
      packagename: selectedPackage.packageName,
      starttime: selectedPackage.startTime ? selectedPackage.startTime[0] : "",
      numofpeople: numPeople,
      name,
      packageid: selectedPackage._id,
      date,

      totalamount,
    };

    try {
      dispatch(bookService(bookingDetails));
      Swal.fire("Congratulations", "Room booked successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data && (
        <section className="max-w-[1400px]  mx-auto mt-4 border-t ">
          <div class="flex justify-between items-center py-2">
            <div class="flex-1">
              <h1 class="text-3xl font-bold">{data.name}</h1>

              <div className="flex flex-row items-center">
                <div class="flex items-center mt-2 mb-3">
                  <span class=" text-gray-500 underline text-md font-semibold">
                    By him
                  </span>
                </div>
              </div>
              <p class="text-gray-700 text-sm mt-2 cursor-pointer   flex flex-row items-center gap-1 ">
                <div className="flex flex-row items-center hover:underline gap-1">
                  <span class="font-bold">
                    <BiPhoneCall size={20} />
                  </span>{" "}
                  +{data.phoneNum}
                </div>
                <div className="flex flex-row items-center hover:underline gap-1">
                  <span class="font-bold md:ml-20 ">
                    <AiOutlineGlobal size={20} />
                  </span>{" "}
                  {data.website}
                </div>

                <div
                  className="flex flex-row items-center hover:underline gap-1"
                  onClick={navigateToReview}
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
                  src={photos[slideNumber]}
                  alt=""
                  className="w-4/5 h-[600px]"
                />
              </div>
              <BsFillArrowRightCircleFill
                onClick={() => handleMove("r")}
                className="m-20 text-5xl  cursor-pointer"
              />
            </div>
          )}
          <div className="flex flex-wrap bg-pink-200 wrap justify-between mt-7">
            {photos.map((photo, i) => (
              <div className=" w-1/3">
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="w-full h-[300px] object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Description Section */}

          <div class="flex flex-wrap py-6 md:mt-6">
            <div class="w-full md:w-2/3 md:pr-10">
              <h2 class="text-xl font-semibold mb-4">Description</h2>
              <p class="text-gray-700 leading-relaxed mb-8">
                {data.description}
              </p>
            </div>

            <div class="w-full md:w-1/3 border border-gray-300 p-4 rounded-md">
              <h2 class="text-black text-3xl font-medium mb-2">Reserve</h2>

              <div className="flex flex-col  mt-4 items-center gap-10 ">
                <div className="border border-gray-400 rounded-lg p-2 w-[200px] cursor-pointer">
                  <span onClick={() => setOpenDate(!openDate)}>
                    {formattedDate ||
                      date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                  </span>
                </div>
                {openDate && (
                  <div className="calendar">
                    <Calendar
                      date={date}
                      onChange={handleSelect}
                      color="#009688"
                      minDate={new Date()}
                      maxDate={new Date(2024, 12, 31)}
                      dateDisplayFormat="MMM d, yyyy"
                    />
                  </div>
                )}
                <div className=" rounded-md flex flex-row items-center gap-2">
                  <FaUser className="ml-2" size={20} />
                  <input
                    onChange={handleNumPeople}
                    type="number"
                    className=" outline-none rounded-md w-[80px] "
                  />
                </div>
              </div>
              <div>
                {allPackages &&
                  allPackages
                    ?.filter(
                      (pckage) =>
                        pckage.numPeopleIncluded >= numPeople &&
                        !pckage.bookedby
                    )
                    .map((pkg) => (
                      <div
                        key={pkg.packageId}
                        className={`border mt-4 border-gray-800 p-3 ${
                          selectedPackage === pkg ? "bg-gray-200" : ""
                        }`}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedPackage === pkg}
                            onChange={() => handleSelectPackage(pkg)}
                          />
                          <div className="flex flex-col mt-2 mb-3">
                            <h2 className="text-lg font-semibold mb-3">
                              {pkg.packageName}
                            </h2>
                            <p className="text-xs mb-1 text-gray-500 font-semibold">
                              {numPeople} Person x {pkg.price}
                            </p>
                            <p className="text-sm text-gray-800 font-semibold">
                              Total ${totalamount}
                            </p>
                          </div>
                          <span className=" font-semibold text-md mt-4">
                            {pkg.startTime}
                          </span>
                        </label>
                      </div>
                    ))}
              </div>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="USD"
                stripeKey="pk_test_51N3LOwIPhGSGqTOKsPfhWcAYHkKJ9IAqwzEdtrp6tsbiRUjzjj1B07oItPnNuhtC58oEwjOW6pRGqppi4gac17rZ008PcjijkA"
              >
                <button class="py-2.5 px-5 mr-2 mb-2 mt-4 text-sm font-medium text-white focus:outline-none bg-primary-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                  Reserve
                </button>
              </StripeCheckout>
            </div>
          </div>

          <UserReview data={data?._id} />
        </section>
      )}
    </>
  );
};

export default Body;
