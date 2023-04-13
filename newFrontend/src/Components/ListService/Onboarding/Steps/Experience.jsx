import React, { useState } from 'react'
import { FaMapSigns } from 'react-icons/fa'
import {GiFlyingFox} from 'react-icons/gi'
import { AiFillCar } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { setExperience } from '../../../../Features/serviceListing/onboarding/experienceSlice';


const Experience = () => {

    const [selectedService, setSelectedService] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);


  

    

    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };

  const handleServiceSelection = (event) => {
    const value = event.target.value;
    setSelectedService(value);
    setSelectedOption(null); // Reset selectedOption when a new service is selected
  };

  console.log("Selected service:", selectedService);
console.log("Selected option:", selectedOption);

const dispatch = useDispatch()

const handleExperience = () => {

  dispatch(setExperience({ selectedService, selectedOption}))

}


  return (
    <>

<div>
            <h1 className='text-xl font-semibold leading-6 mb-4 text-gray-900'>About your experiences</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
              <h3 className="text-base  leading-6 text-gray-900">The information that you provide here will be used for your Tripadvisor listing. Here, travelers can see what products/experiences you offer and where you're located.</h3>
              
            </div>
            
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  
                  <div className="col-span-3 sm:col-span-2">

                        

                         <div className="flex flex-col space-y-4">

                     {/* First Selection  */}         
                         <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                         <input
                            type="radio"
                            id="tours"
                            name="serviceType"
                            value="tours"
                            checked={selectedService === "tours"}
                            onChange={handleServiceSelection}
                            />

                            <div className='flex flex-row items-center ml-6 '>
                                <FaMapSigns size={45} className='mr-3'/>
                                <div className='flex flex-col ml-3'>
                                <h3 className='text-xl font-semibold'>Tours</h3>
                                <p className='text-md mb-4 text-gray-600'>Guided visits to one or more sites</p>
                                <span className='font-semibold'>What tours do you offer?</span>
                                {/*Dropdown for Tours*/}

                                <div className='mt-3'>
                                    <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                                        <option value=''>Select an option</option>
                                        <optgroup label='Air Tours'>
                                        <option value='Air Tours'>Air Tours</option>
                                        <option value='Balloon Rides'>Balloon Rides</option>
                                        <option value='Helicopter Tours'>Helicopter Tours</option>
                                        </optgroup>
                                        <optgroup label='Land Tour'>
                                        <option value='Bike Tours'>Bike Tours</option>
                                        <option value='Bus Tours'>Bus Tours</option>
                                        <option value='Motorcycle Tours'>Motorcycle Tours</option>
                                        <option value='Train Tours'>Train Tours</option>
                                        <option value='Walking Tours'>Walking Tours</option>
                                        </optgroup>
                                        <optgroup label='Food & Drinks'>
                                        <option value='Beer Tasting Tours'>Beer Tasting Tours</option>
                                        <option value='Wine Tasting Tours'>Wine Tasting Tours</option>
                                        <option value='Distillery Tours'>Distillery Tours</option>
                                        <option value='Food tours'>Food tours</option>
                                        </optgroup>
                                        <optgroup label='Water Tours'>
                                        <option value='Boat Tours'>Boat Tours</option>
                                        <option value='Fishing Cruises'>Fishing Cruises</option>
                                        <option value='Gondola Cruise'>Gondola Cruise</option>
                                        <option value='Speedboat tours'>Speedboat tours</option>
                                        </optgroup>
                                        <option value='Private Tour'>Private Tour</option>
                                    </select>
                                    </div>

                                </div>
                            </div>
                         </div>

                          {/* First Selection  */}

                           {/* Second Selection  */}
                           <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                         <input
                            type="radio"
                            id="activities"
                            name="serviceType"
                            value="activities"
                            checked={selectedService === "activities"}
                            onChange={handleServiceSelection}
                            />

                            <div className='flex flex-row items-center ml-6 '>
                                <GiFlyingFox size={45} className='mr-3'/>
                                <div className='flex flex-col ml-3'>
                                <h3 className='text-xl font-semibold'>Activities</h3>
                                <p className='text-md mb-4 text-gray-600'>Instructed, hands-on experiences</p>
                                <span className='font-semibold'>What activities do you offer?</span>
                                <div className='mt-3'>
                                    <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                                        <option value=''>Select an option</option>
                                        <optgroup label='Air Activities'>
                                        <option value='Paragliding'>Paragliding</option>
                                        <option value='Skydiving'>Skydiving</option>
                                        <option value='Ziplining'>Helicopter Ziplining</option>
                                        </optgroup>
                                        <optgroup label='Land & Outdoor activities'>
                                        <option value='Climbing'>Climbing</option>
                                        <option value='Hiking'>Hiking</option>
                                        <option value='Safaris'>Safaris</option>
                                        <option value='Ski & Snow activities'>Ski & Snow activities</option>
                                        
                                        </optgroup>
                                        <optgroup label='Water activities'>
                                        <option value='Kayaking'>Kayaking</option>
                                        <option value='Parasailing'>Parasailing</option>
                                        <option value='Surfing'>Surfing</option>
                                        <option value='Water Skiing'>Water Skiing</option>
                                        </optgroup>
                                        <optgroup label='Water Tours'>
                                        <option value='Boat Tours'>Boat Tours</option>
                                        <option value='Fishing Cruises'>Fishing Cruises</option>
                                        <option value='Gondola Cruise'>Gondola Cruise</option>
                                        <option value='Speedboat tours'>Speedboat tours</option>
                                        </optgroup>
                                        <option value='Private Tour'>Private Tour</option>
                                    </select>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                         </div>

                         <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                         <input
                            type="radio"
                            id="rentals"
                            name="serviceType"
                            value="rentals"
                            checked={selectedService === "rentals"}
                            onChange={handleServiceSelection}
                            />

                            <div className='flex flex-row items-center ml-6 '>
                                <AiFillCar size={45} className='mr-3'/>
                                <div className='flex flex-col ml-3'>
                                <h3 className='text-xl font-semibold'>Rentals</h3>
                                <p className='text-md mb-4 text-gray-600'>Temporary access to a piece of equipment for independent use </p>
                                <span className='font-semibold'>What rentals do you offer?</span>
                                <div className='mt-3'>
                                    <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                                        <option value='Land Transport'>Land Transport</option>
                                        <option value='Water Transport'>Land Transport</option>
                                        
                                        
                                    </select>
                                    </div>
                                    
                                </div>
                               
                            </div>
                            
                         </div>
                         

                         
                         </div>

                    

                    

                  </div>
                  
                
                   
                    
                  
                   
                   
                   
                  </div>

                  

                  <button onClick={handleExperience}   type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-12 py-2.5 ml-4 mb-6 ">Set</button>
                  
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

export default Experience