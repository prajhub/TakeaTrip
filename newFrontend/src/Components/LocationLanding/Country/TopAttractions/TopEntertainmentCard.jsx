import React from 'react'

const TopEntertainmentCard = ({entertainments}) => {
  return (
    <>

                    <div  className="flex flex-col   p-5 mx-auto md:w-[400px]   text-gray-900 bg-white rounded-lg border border-gray-100 shadow  md:p-7 ">
                                                <h2>{entertainments.name}</h2>
                                                <p className="text-md font-semibold mt-2 ">{entertainments.description}</p>
                                          </div>
   

    
    </>

  )
}

export default TopEntertainmentCard