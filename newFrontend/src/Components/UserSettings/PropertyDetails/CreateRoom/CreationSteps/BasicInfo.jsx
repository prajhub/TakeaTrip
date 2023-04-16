import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setBasicInfo } from '../../../../../Features/roomControl/onboarding/basicInfoSlice';

const BasicInfo = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [roomClass, setRoomClass] = useState('');
    const [numOfBedRooms, setNumOfBedRooms] = useState('');

    const [livingRoom, setLivingRoom] = useState(null);
    const [numofTotalRooms, setNumOfTotalRooms] = useState('')

    console.log(numofTotalRooms)



  
    const options = [
      'Single Room',
    'Double Room',
    'Triple Room',
    'Quad Room',
    'Queen Room',
    'King Room',
    'Twin Room',
    'Deluxe Room',
    'Suite',
    'Penthouse'
    ];


    const roomsClass = [
        'Basic',
        'Business',
        'City',
        'Classic',
        'Deluxe',
        'Economy',
        'Junior',
        'Honeymoon',
        'Executive',
        'Family',
        'Grand',
        'Standard'
    ]

    const numsOfBedRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleClassChange = (event) => {
        setRoomClass(event.target.value)
      }


      const handleBedRoomChange = (event) => {
        setNumOfBedRooms(event.target.value)
      }


      const handleLivingRoomClick = (event) => {
        const answer = event.target.value === 'yes';
        setLivingRoom(answer);
      };
    
      const handleTotalRoomChange = (event) => {
        setNumOfTotalRooms(event.target.value)
      }


      const dispatch = useDispatch()

      const handleOkay = () => {
        dispatch(setBasicInfo({selectedOption,
          roomClass,
          numOfBedRooms,
          livingRoom,
          numofTotalRooms,}))
      }


  return (
    <>
    
    <div>
            <h1 className='font-open-san text-4xl font-semibold mb-9'>Rooms and rates</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1 ">
            <div className="px-4 sm:px-0">
              
              <p className="mt-1 text-sm text-gray-600">
              Create a room, add amenities, and set up your rates. You can always update this later.
              </p>
            </div>
          </div>

          {/* Type of Room Select */}
        
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                        What type of room is this
                      </label>
                      <div className="relative">
        <select
          className=" mt-2 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="property-type"
          onChange={handleChange}
          value={selectedOption}
        >
          <option value="">Select a room type</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </div>
                    </div>

                    {/* Type of Room Select */}

                
                    {/* Type of Class Select */}

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                        What class is this
                      </label>
                      <div className="relative">
        <select
          className=" mt-2 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="property-class"
          onChange={handleClassChange}
          value={roomClass}
        >
          <option value="">Select a class type</option>
          {roomsClass.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </div>
                    </div>

                    {/* Type of Class Select */}

                    {/*Num of Bedroom select */}

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                      How many bedrooms does it have?
                      </label>
                      <div className="relative">
        <select
          className=" mt-2 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="property-class"
          onChange={handleBedRoomChange}
          value={numOfBedRooms}
        >
          <option value="">Select the number of rooms</option>
          {numsOfBedRooms.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </div>
                    </div>

                    {/*Num of Bedroom select */}

                    {/*Living Room check*/}

                    <div className="col-span-3 sm:col-span-2">
                    <span className='flex flex-row items-center gap-2 text-sm font-semibold leading-6 text-gray-900 '>
                    Is there a living room?
        </span>
        <div className='mt-5'>
          <div className='flex gap-2 mb-4'>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                livingRoom === true ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
              }`}
              onClick={handleLivingRoomClick}
              value='yes'
            >
              Yes
            </button>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                livingRoom === false ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
              }`}
              onClick={handleLivingRoomClick}
              value='no'
            >
              No
            </button>
          </div>
        </div>
                    </div>


                    {/*Living Room check*/}

                    {/*Num of Rooms check*/}
                        <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                        How many of these rooms do you have on your property?
                      </label>
                        <input
                            type="number"
                            value={numofTotalRooms}
                            onChange={handleTotalRoomChange}
                            className=" mt-2 border-gray-400 border py-2 px-4 rounded "
                            />
                        </div>
                    {/*Num of Rooms check*/}
                    
                  </div>



                  <button onClick={handleOkay} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Okay</button>
                    
                 

                 
                  
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

export default BasicInfo