import React from 'react'

const TopAttractionCard = ({attractions}) => {
  return (
   <>
   
   <div  className="flex flex-col   p-5 mx-auto md:w-[400px]   text-gray-900 bg-white rounded-lg border border-gray-100 shadow  md:p-7 ">
                                                <h2>{attractions.name}</h2>
                                                <p className="text-md font-semibold mt-2 ">{attractions.description}</p>
                                          </div>
   
   </>
  )
}

export default TopAttractionCard