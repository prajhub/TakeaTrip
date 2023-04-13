import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../../Features/serviceListing/onboarding/locationInfoSlice';

const LocInfo = () => {


    const [city, setCity] = useState('')
    function handleCity(event) {
        setCity(event.target.value);
    }

    const [streetAddress, setStreetAddress] = useState('')
    function handleStreetAddress(event) {
        setStreetAddress(event.target.value);
    }

    const [zipCode, setZipCode] = useState('')
    function handleZip(event) {
        setZipCode(event.target.value);
    }

    const dispatch = useDispatch()


    const handleLocation = () => {
        dispatch(setLocation({city, streetAddress, zipCode }))
    }


  return (
    <>
    
    <div>
            <h1 className='text-xl font-semibold leading-6 mb-4 text-gray-900'>Next, tell us where you operate from</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1">
            
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                  
                  <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                  Search for a city or town
                  </label>
                  <input
                  onChange={handleCity}
                    type="text"
                    placeholder=''
                    value={city}
                
                   
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
                  
                
                 
                    
                  <div className="col-span-3 sm:col-span-2">
                  
                      <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                        Street Address
                      </label>
                      <input
                        type="text"
                        onChange={handleStreetAddress}
                        value={streetAddress}
                        name="streetAddress"
                        id="streetAddress"
                       
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                  
                      <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
                      Zip code/postal code
                      </label>
                      <input
                        type="number"
                        onChange={handleZip}
                        value={zipCode}
                        name="zipcode"
                        id="zipcode"
                       
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    
                    
                   
                   
                  </div>

                  

                 
                  
                </div>
                <button onClick={handleLocation}  type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-12 py-2.5 ml-4 mb-6 ">Set</button>
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

export default LocInfo