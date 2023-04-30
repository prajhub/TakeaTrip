import React from 'react'
import {  } from '../../Features/api/apiSlice'
import { useSelector } from 'react-redux'

import {  useGetAccommodationByUserIDQuery } from '../../Features/api/apiSlice'

const PropertyDisplayTable = ({ id }) => {

    const userInfo = useSelector((state) => state.auth.userInfo)
 
  const userId = userInfo._id
  
  const { data } = useGetAccommodationByUserIDQuery(userId,  {
    refetchOnMountOrArgChange: true,
    refetchInterval: 5000, // Refetch every 5 seconds
  })
  
    

    const accommodations = data?.accommodations || [];
    const services = data?.services || []
    const foodservices = data?.foodservices || [];
    const allProperties = accommodations.concat(services, foodservices);

    console.log(allProperties)
    
  return (
    <>
    
    {allProperties.map((property) => (
        <tr key={property._id} className="bg-white border-b hover:bg-gray-50 ">
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
          >
            <div className="pl-3">
              <div className="text-base font-semibold">{property.name}</div>
              <div className="font-normal text-gray-500">{property.address}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <p>Owner</p>
          </td>
          <td className="px-6 py-4">
            <button
              type="button"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  "
            >
              View
            </button>
          </td>
        </tr>
      ))}

    </>
  )
}

export default PropertyDisplayTable