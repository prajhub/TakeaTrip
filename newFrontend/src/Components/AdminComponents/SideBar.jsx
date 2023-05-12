import React from "react";
import { FaHotel } from "react-icons/fa";
import { MdOutlinePayments, MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <section
        class="fixed top-[70px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 :bg-gray-800">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg :text-white hover:bg-gray-100 "
              >
                <MdDashboard size={20} />
                <span class="ml-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <FaHotel size={20} />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Accommodations
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <FaHotel size={20} />
                <span class="flex-1 ml-3 whitespace-nowrap">Services</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <FaHotel size={20} />
                <span class="flex-1 ml-3 whitespace-nowrap">Food Services</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <MdOutlinePayments size={20} />
                <span class="flex-1 ml-3 whitespace-nowrap">Payment</span>
                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full :bg-blue-900 :text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <Link
                to="/adashboard/user"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default SideBar;
