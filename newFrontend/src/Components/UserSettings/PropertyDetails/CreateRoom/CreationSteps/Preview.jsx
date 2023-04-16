import React, {useState} from 'react'
import {HiOutlineLightBulb} from 'react-icons/hi'

const Preview = ({roomData}) => {

  const data = roomData
  console.log(data)
  return (
    <>
    
    <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="col-span-full">

                        <h1 className='text-lg font-semibold'>Preview</h1>

                        <div className='flex mt-4 flex-row gap-2 items-center bg-gray-300 border p-3'>
                                <HiOutlineLightBulb size={20}/>
                                <p className='text-sm text-gray-400'>
                                    You’re done—great work. We’ll show the information below to travelers. Review and edit as needed before you go live.
                                </p>

                                
                        </div>

                        <p className='text-md mt-4'>{data[0]}, {data[1]}</p>
                    
                    
                  </div>
                </div>
                
              </div>
            
          </div>
        </div>
      </div>

      <div className="hidden sm:block " aria-hidden="true">
        <div className="py-5 ">
          <div className="border-t border-gray-200 " />
        </div>
      </div>
    
    </>
  )
}

export default Preview