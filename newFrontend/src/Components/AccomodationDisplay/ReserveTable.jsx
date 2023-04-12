import React from 'react'
import { FaBed, FaMountain, FaTv, FaCoffee, FaWifi, FaBath } from 'react-icons/fa';
import {BiBed} from 'react-icons/bi'

const ReserveTable = () => {
  return (
   <>
   
   <section class="px-4 py-6">
  <h2 class="text-2xl font-bold mb-4">Availability</h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse ">
      <thead>
        <tr>
          <th class="text-left py-2 px-4 border border-primary-500">Accommodation Type</th>
          <th class="text-left py-2 px-4 border border-primary-500">Max Guests</th>
          <th class="text-left py-2 px-4 border border-primary-500">Price per Night</th>
          <th class="text-left py-2 px-4 border border-primary-500"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="py-2 px-4 border border-primary-500">
          <h3 className="text-lg font-bold mb-1">Double Room</h3>
                  <span className="flex items-center">
                   <BiBed/>
                    1 Queen Bed
                  </span>
                  <ul className="text-xs mt-2 flex flex-row border-b border-primary-500 gap-1 flex-wrap">
                    <li>Private bathroom</li>
                    <li>Mountain view</li>
                    <li>Flat-screen TV</li>
                    <li>Coffee machine</li>
                    <li>Free WiFi</li>
                  </ul>

                  <div className="flex flex-wrap mt-2">
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaBed /></span>
        <span>1 queen bed</span>
      </div>
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaMountain /></span>
        <span>Mountain view</span>
      </div>
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaTv /></span>
        <span>Flat-screen TV</span>
      </div>
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaCoffee /></span>
        <span>Coffee machine</span>
      </div>
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaWifi /></span>
        <span>Free WiFi</span>
      </div>
      <div className="w-1/2 md:w-1/2 mb-4 items-center flex">
        <span className="mr-2"><FaBath /></span>
        <span>Private bathroom</span>
      </div>
    </div>
          </td>
          <td class="py-2 px-4 border border-primary-500">2</td>
          <td class="py-2 px-4 border border-primary-500" >€90</td>
          <td class="py-2 px-4 border border-primary-500"><button class="bg-primary-500 text-white px-4 py-2 rounded">I'll Reserve</button></td>
        </tr>
        <tr>
          <td class="py-2 px-4 border border-primary-500">Triple Room</td>
          <td class="py-2 px-4 border border-primary-500">3</td>
          <td class="py-2 px-4 border border-primary-500">€120</td>
          
        </tr>
        <tr>
          <td class="py-2 px-4 border border-primary-500">Family Room</td>
          <td class="py-2 px-4 border border-primary-500">4</td>
          <td class="py-2 px-4 border border-primary-500">€150</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</section>

   
   </>
  )
}

export default ReserveTable