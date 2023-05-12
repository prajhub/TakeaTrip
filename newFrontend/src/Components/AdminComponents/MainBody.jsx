import React from "react";
import { Route, Routes } from "react-router-dom";
import UserCRUD from "./UserCRUD";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../Features/users/usersApiSlice";
import {
  useGetAllAccommodationsQuery,
  useGetAllServicesQuery,
  useGetAllFoodServiceQuery,
} from "../../Features/api/apiSlice";

const MainBody = () => {
  const { data: allAccommodations } = useGetAllAccommodationsQuery();

  const { data: allServices } = useGetAllServicesQuery();

  const { data: allFoodServices } = useGetAllFoodServiceQuery();
  const { data: allUsers } = useGetAllUsersQuery();

  return (
    <>
      <div class="pl-0 md:pl-64  ">
        <div className="border md:p-10 m-4 border-gray-300 rounded-lg md:w-[1200px]">
          <div className="flex flex-row gap-4 justify-between">
            <Link to="/adashboard/accommodations">
              <div className="flex flex-col gap-2 hover:text-primary-700  items-center">
                <span className="text-3xl  font-semibold">
                  Total Accommodations
                </span>
                <p className="text-7xl ">
                  {allAccommodations ? allAccommodations.length : 0}
                </p>
              </div>
            </Link>
            <Link to="/adashboard/services">
              <div className="flex flex-col gap-2 hover:text-primary-700 items-center">
                <span className="text-3xl font-semibold">Total Services</span>
                <p className="text-7xl">
                  {allServices ? allServices.length : 0}
                </p>
              </div>
            </Link>
            <Link to="/adashboard/foodservices">
              <div className="flex flex-col gap-2 items-center hover:text-primary-700">
                <span className="text-3xl font-semibold">
                  Total Food Service
                </span>
                <p className="text-7xl">
                  {" "}
                  {allFoodServices ? allFoodServices.length : 0}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="border flex items-center justify-between md:p-4 m-4 border-gray-300 rounded-lg md:w-[400px]">
          <div className="flex  flex-row gap-2 items-center">
            <span className="text-lg font-semibold">Total users:</span>
            <p className="text-lg font-semibold">
              {" "}
              {allUsers ? allUsers.length : 0}
            </p>
          </div>
          <Link to="/adashboard/user">
            <span className="mr-2 text-xs cursor-pointer hover:text-primary-700">
              View more...
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainBody;
