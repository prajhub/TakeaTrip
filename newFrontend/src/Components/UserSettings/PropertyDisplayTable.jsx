import React from 'react'
import { useGetAccommodationsByUserIdQuery } from '../../Features/api/apiSlice'
import { useSelector } from 'react-redux'



const PropertyDisplayTable = ({ id }) => {

    const userInfo = useSelector((state) => state.auth.userInfo)
 
  const userId = userInfo._id

    const { data } = useGetAccommodationsByUserIdQuery(userId)
    console.log(data)
   
    
  return (
    <>
    
    {data && data.map(accommodation => (
        <tr key={accommodation._id} className="bg-white border-b hover:bg-gray-50 ">
          <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
            <div className="pl-3">
              <div className="text-base font-semibold">{accommodation.name}</div>
              <div className="font-normal text-gray-500">{accommodation.address}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <p>Owner</p>
          </td>
          <td className="px-6 py-4">
          <button type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ">View</button>
          </td>
        </tr>
      ))}

    </>
  )
}

export default PropertyDisplayTable