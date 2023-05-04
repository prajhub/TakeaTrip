import React from "react";
import { TbPointFilled } from "react-icons/tb";
import { useParams } from "react-router";
import { useGetRoomsByAccommodationQuery } from "../../Features/api/apiSlice";
import { useNavigate } from "react-router";

const ReserveTable = ({ data: accommodationData, startDate, endDate }) => {
  const { id } = useParams();

  const { data: roomData, isFetching } = useGetRoomsByAccommodationQuery(id, {
    pollingInterval: 2000,
  });

  console.log(roomData);

  const navigate = useNavigate();

  const navigateRoom = (room) => {
    navigate(`/room/${room._id}`, {
      state: { startDate, endDate, accommodationData },
    });
  };

  const amenities = [
    "Hoes everywhere",
    "Free Self Parking",
    "Free Breakfast",
    "Free WiFi",
  ];
  return (
    <>
      {roomData && (
        <section class="px-4 py-6 flex flex-row gap-5">
          {roomData?.map((room) => (
            <div className="w-80 border border-gray-200 rounded-md overflow-hidden shadow-md">
              <img
                src="https://res.cloudinary.com/dhngfjx6o/image/upload/v1682595506/dutxv35hdej0evyw9x4i.jpg"
                alt=""
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{room.type}</h2>
                <div className="flex items-center gap-2 my-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.5 10H1.5" />
                    <path d="M12 1.5l-3 3v16.5l3 3 3-3V4.5l-3-3z" />
                  </svg>
                  <span>{room.maxPeople}</span>
                  <span>&bull;</span>
                  <span>{room.bathroom} Bathrooms</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  2 sq ft
                </p>
                <ul className="mb-2 border-b">
                  {room.inroomamenities.map((amenity) => (
                    <li key={amenity} className="flex items-center mb-2 gap-1">
                      <TbPointFilled />
                      <p className="text-sm ">{amenity}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col ">
                    <span className="text-xl font-semibold">${room.price}</span>
                    <span className="text-xs mt-1 text-gray-500">
                      $132 total
                    </span>
                    <span className="text-xs mt-1 text-gray-500">
                      including taxes & fees
                    </span>
                  </div>
                  <button
                    onClick={() => navigateRoom(room)}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default ReserveTable;
