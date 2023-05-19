import React from "react";
import { FaHotel } from "react-icons/fa";
import { MdOutlinePayments, MdDashboard } from "react-icons/md";

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
                href="/account/properties"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <FaHotel size={20} />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Property Details
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default SideBar;
