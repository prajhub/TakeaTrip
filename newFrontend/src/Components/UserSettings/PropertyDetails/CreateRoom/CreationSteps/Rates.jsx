import React, {useState } from 'react'

import { useDispatch } from 'react-redux'
import { setBasicRate } from '../../../../../Features/roomControl/onboarding/rateSlice'

const Rates = () => {

    const [baseRate, setBaseRate] = useState('')



    const handleBaseRateChange = (event) => {
        setBaseRate(event.target.value)
      }

      const dispatch = useDispatch()

      const handleRate = () => {
        dispatch(setBasicRate({baseRate}))
      }


  return (
   <>
    
    <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Base rate</h3>
              <p className="mt-1 text-sm text-gray-600">Set up your base rate. This is what’s shown to travelers when they’re searching for rooms. You can update your rates before your property is live.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="col-span-full">
                  
                         
                         <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                        What’s your base rate?
                      </label>
                        <input
                            type="number"
                            value={baseRate}
                            onChange={handleBaseRateChange}
                            className=" mt-2 border-gray-400 border py-2 px-4 rounded "
                            />
                        </div>

                        <div className=' flex flex-col mt-5 '>
                                <h2 className='text-sm font-medium leading-6 text-gray-900'>Included:</h2>
                                <p className='text-sm font-md text-gray-500'>Free Self Parking</p>
                        </div>
                   
                    
                    
                  </div>
                  <button onClick={handleRate} type="button" class="py-2.5 px-5 mr-2 mt-4 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Okay</button>
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

export default Rates