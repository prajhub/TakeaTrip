import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import { useGetRoomByIdQuery } from "../../Features/api/apiSlice";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bookRoom } from "../../Features/roomControl/booking/bookRoomAction";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Spinner from "../Reusables/Spinner";

const Body = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { id } = useParams();

  const { data, isFetching, error } = useGetRoomByIdQuery(id, {
    pollingInterval: 2000,
  });

  if (isFetching) {
    console.log("Data fetching");
  }

  if (!data) {
    console.log("Error retreving data");
  }
  console.log(data);

  const location = useLocation();

  const startDateString = location.state.startDate;
  const endDateString = location.state.endDate;

  const startDate = moment(startDateString, "DD-MM-YYYY").toDate();
  const endDate = moment(endDateString, "DD-MM-YYYY").toDate();

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

  const price = data[0]?.price;
  const initialRoomNumbers = data[0]?.roomNumbers;
  console.log(initialRoomNumbers);
  const room = data[0]?.type;
  const roomid = data[0]?._id;

  const total = numberOfDays * price;

  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);

  const handleClick = (event, number) => {
    event.preventDefault();
    setRoomNumber(number);
    setIsRoomSelected(true);
  };

  const roomnumber = roomNumber;
  const userid = useSelector((state) => state.auth.userInfo._id);

  const fromdate = moment(startDateString, "DD-MM-YYYY").format("YYYY-MM-DD");

  const todate = moment(endDateString, "DD-MM-YYYY").format("YYYY-MM-DD");
  const totalamount = total;

  const onToken = async (token) => {
    const bookingDetails = {
      room,

      userid,
      roomnumber,
      roomid,
      fromdate,
      todate,
      totalamount,
      token,
    };

    try {
      setLoading(true);
      dispatch(bookRoom(bookingDetails));
      setLoading(false);
      Swal.fire("Congratulations", "Room booked successfully", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      setLoading(false);
      Swal.fire("Oh no", "Something went wrong", "error");
      console.log(error);
    }
  };

  return (
    <>
      {data && (
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
                  Hanuman | A Luxury Pool Villa | 3-Bedroom
                </h2>
                <div className="border-b" />
                <p class="text-black mb-2 text-xl mt-6 font-bold">
                  Price Details
                </p>
                <div className="flex flex-row mb-4 justify-between">
                  <span>
                    ${price} x {numberOfDays} days
                  </span>
                  <span>$1,793.05</span>
                </div>
                <div className="border-b" />
                <div className="flex flex-row mb-4 mt-4 justify-between">
                  <span className="font-semibold text-md">Total (USD)</span>
                  <span className="font-semibold text-md">${total}</span>
                </div>
              </div>
            </div>
            <div className="max-w-[1000px] mx-auto">
              <label className="mb-4 text-md font-semibold">
                Select room number
              </label>
              {initialRoomNumbers.map((item) => (
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
              class={`py-2.5 px-5 mr-2 mb-2 mt-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ${
                !isRoomSelected && "opacity-50 cursor-not-allowed"
              }`}
            >
              Confirm & Pay
            </button>
          </StripeCheckout>
        </section>
      )}
    </>
  );
};

export default Body;
