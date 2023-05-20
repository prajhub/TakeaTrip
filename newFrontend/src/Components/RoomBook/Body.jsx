import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import { useGetRoomDetailByIdQuery } from "../../Features/api/apiSlice";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../Features/auth/authSlice";
import { bookRoom } from "../../Features/roomControl/booking/bookRoomAction";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useGetUserDetailsQuery } from "../../Features/api/apiSlice";
import Spinner from "../Reusables/Spinner";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: userData } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 2000,
  });
  useEffect(() => {
    if (userData) {
      dispatch(setCredentials(userData));
    }
  }, [userData]);

  //Getting accomodation data
  const accoData = location.state.accommodationData;

  //Getting user ID
  const userid = useSelector((state) => state.auth.userInfo._id);

  const { id } = useParams();
  const { data, isFetching, error } = useGetRoomDetailByIdQuery(id, {
    pollingInterval: 2000,
  });
  console.log(data);

  //Getting the room data the first time
  const roomData = data?.[0];

  //Getting the room numbers from the room
  const rooms = roomData?.roomNumbers ?? [];

  //For Formatting Dates

  const startDateString = location.state.startDate;
  const endDateString = location.state.endDate;

  const startDate = moment(startDateString, "DD-MM-YYYY").toDate();
  const endDate = moment(endDateString, "DD-MM-YYYY").toDate();

  //Final date to be submitted when sending form
  const fromdate = moment(startDateString, "DD-MM-YYYY").format("DD-MM-YYYY");
  const todate = moment(endDateString, "DD-MM-YYYY").format("DD-MM-YYYY");

  const startMonthDay = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endMonthDay = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Calculate the number of days between the start and end dates
  const numberOfDays = Math.round(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  //Total cost
  const totalamount = numberOfDays * roomData?.price;

  const includingFee = numberOfDays * roomData?.price + 20;

  //For Handling choosing room
  const [isRoomSelected, setIsRoomSelected] = useState(false); // For disabling main confirm button if no rooms are selected
  const [roomNumber, setRoomNumber] = useState(null); //Stores selected rooms numbr

  const handleClick = (event, number) => {
    event.preventDefault();
    setRoomNumber(number);
    setIsRoomSelected(true);
  };

  //Main data that gets submit to backend
  const onToken = async (token) => {
    const bookingDetails = {
      room: roomData?.type,
      userid,
      roomnumber: roomNumber,
      roomid: roomData?._id,
      fromdate,
      todate,
      totalamount,
      token,
    };

    try {
      dispatch(bookRoom(bookingDetails));

      Swal.fire("Congratulations", "Room booked successfully", "success");
    } catch (error) {
      Swal.fire("Oh no", "Something went wrong", "error");
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <form>
          <div className="max-w-[1000px]  justify-between mx-auto items-center flex flex-wrap py-6 md:mt-6">
            <div className="flex flex-col md:-[500px]gap-4 mt-20">
              <h1 className="text-3xl font-semibold">Confirm and Pay</h1>
              <div className="flex flex-col gap-8 mt-5 border-b ">
                <h2 className="text-xl font-semibold">Your Trip</h2>
                <div className="flex flex-col">
                  <span className="font-semibold text-md">Dates</span>
                  <p className="text-md">
                    {startMonthDay} - {endMonthDay}
                  </p>
                </div>
                <div className="flex flex-col mb-5">
                  <span className="font-semibold text-md">Guests</span>
                  <p className="text-md">2</p>
                </div>
              </div>
            </div>

            <div class="w-full md:w-auto border   p-5 rounded-md">
              <h2 class="text-black text-lg font-medium  mb-3">
                {roomData?.type} | {roomData?.roomview} | {roomData?.roomclass}
              </h2>
              <div className="border-b" />
              <p class="text-black mb-2 text-xl mt-6 font-bold">
                Price Details
              </p>
              <div className="flex flex-row mb-4 justify-between">
                <span>
                  ${roomData?.price} x {numberOfDays} days
                </span>
                <span>${totalamount}</span>
              </div>
              <div className="flex flex-row mb-4 justify-between">
                <span className="text-xs text-gray-600">Added Tax & Fees</span>
                <span className="text-sm">$20</span>
              </div>
              <div className="border-b" />
              <div className="flex flex-row mb-4 mt-4 justify-between">
                <span className="font-semibold text-md">Total (USD)</span>
                <span className="font-semibold text-md">${includingFee}</span>
              </div>
              <div
                id="toast-danger"
                class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow "
                role="alert"
              >
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div class="ml-3 text-sm font-normal">
                  Keep in mind. We have a no cancellation Policy
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] mx-auto">
            <label className="mb-4 text-md font-semibold">
              Select room number
            </label>
            {rooms.map((item) => (
              <div className="mt-4">
                <button
                  key={item.number}
                  className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium focus:outline-none 
        ${
          item.userId
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
        }`}
                  onClick={(event) => handleClick(event, item.number)}
                  disabled={!!item.userId}
                >
                  {item.number}
                </button>
              </div>
            ))}
          </div>
        </form>
        <StripeCheckout
          amount={totalamount * 100}
          token={onToken}
          currency="USD"
          stripeKey="pk_test_51N3LOwIPhGSGqTOKsPfhWcAYHkKJ9IAqwzEdtrp6tsbiRUjzjj1B07oItPnNuhtC58oEwjOW6pRGqppi4gac17rZ008PcjijkA"
        >
          <button
            disabled={!isRoomSelected}
            class={`py-2.5 px-5 mr-2 ml-56 mb-2 mt-7 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ${
              !isRoomSelected && "opacity-50 cursor-not-allowed"
            }`}
          >
            Confirm & Pay
          </button>
        </StripeCheckout>
      </section>
    </>
  );
};

export default Body;
