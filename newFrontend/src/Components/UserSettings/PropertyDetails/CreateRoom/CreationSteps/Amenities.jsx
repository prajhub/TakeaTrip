import React, { useState} from 'react'
import { Collapse } from 'antd'
import {FaShower} from 'react-icons/fa'
import {GiWindow} from 'react-icons/gi'
import {RiComputerLine} from 'react-icons/ri'
import {MdOutlineSoupKitchen} from 'react-icons/md'

import { useDispatch } from 'react-redux'
import { setAddAmenities } from '../../../../../Features/roomControl/onboarding/amenitiesSlice'

const Amenities = () => {


  const dispatch = useDispatch()
  
      
 
    const { Panel } = Collapse;

    const [numOfBathRoom, setNumOfBathRoom] = useState('');
    const [roomView, setRoomView] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [kitchenAppliances, setKitchenAppliances] = useState([]);
    const [bedding, setBedding] = useState([]);
    const [refreshments, setRefreshments] = useState([]);


    console.log(refreshments)

    const bathRoomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const roomViewOptions = [
        "City View", "Beach View", "Sea View", "Garden View",  "Mountain View",
        "Pool View",
        "Lake View",
        "River View",
        "Park View",
        "Courtyard View",
        "Harbor View",
        "Skyline View"
    ]


    const amenitiesList = [
        { id: 1, name: 'TV' },
        { id: 2, name: 'iPod docking station' },
        { id: 3, name: 'MP3 docking station' },
        { id: 4, name: 'CD player' },
        { id: 5, name: 'Computer or tablet' },
        { id: 6, name: 'Video-game console' },
        { id: 7, name: 'Voice-activated smart speaker' },
      ];
    

      const KitchenAppliances = [
        { id: 1, name: 'Cookware, dishware, and utensils' },
        { id: 2, name: 'Dishwasher' },
        { id: 3, name: 'Refrigerator' },
        { id: 4, name: 'Kitchen island' },
        { id: 5, name: 'Oven' },
        { id: 6, name: 'Microwave' },
        { id: 7, name: 'Rice cooker' },
        { id: 8, name: 'Stovetop' },
        { id: 9, name: 'Freezer' },
        { id: 10, name: 'Ice maker' },
        { id: 11, name: 'Blender' },
        { id: 12, name: 'Coffee grinder' },
        { id: 13, name: 'Griddle' },
      ];

      const beddingInfo = [
        { id: 1, name: 'Normal Bedding' },
        { id: 2, name: 'Premium Bedding'},
        { id: 3, name: 'Premium Mattress'},
      ]

      const refreshOptions = [
        { id: 1, name: 'Free bottled water' },
        { id: 2, name: 'Coffee/Expresso maker'},
        { id: 3, name: 'Mini Bar'},
      ]
      



    const handleNumBathroomChange = (event) => {
        setNumOfBathRoom(event.target.value);
      };


      const handleRoomViewChange = (event) => {
        setRoomView(event.target.value);
      };


      const handleAmenityChange = (event) => {
        const amenityName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setAmenities([...amenities, amenityName]);
        } else {
          setAmenities(amenities.filter((name) => name !== amenityName));
        }
      };

      const handleKitcheAppChange = (event) => {
        const appName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setKitchenAppliances([...kitchenAppliances, appName]);
        } else {
          setKitchenAppliances(kitchenAppliances.filter((name) => name !== appName));
        }
      };

      const handleBeddingChange = (event) => {
        const bedName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setBedding([...bedding, bedName]);
        } else {
            setBedding(bedding.filter((name) => name !== bedName));
        }
      };

      const handleRefreshmentChange = (event) => {
        const refreshName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setRefreshments([...refreshments, refreshName]);
        } else {
            setRefreshments(refreshments.filter((name) => name !== refreshName));
        }
      };

      const handleOkay = () => {
        dispatch(setAddAmenities({   
          numOfBathRoom,
          roomView,
          amenities,
          kitchenAppliances,
          bedding,
          refreshments}))
       
    
      }
    

     


  return (

    <>
    
    <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Room amenities</h3>
              <p className="mt-1 text-sm text-gray-600">Add amenities so travelers know what to expect when booking this room.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="col-span-full">
                 
                    
                  <Collapse defaultActiveKey={['1']} >
                        <Panel header="Bathroom Details" key="1">
                        <div className='p-4'>
      <span className="flex gap-2 flex-row items-center text-gray-700 font-bold mb-2" >
        <FaShower size={20}/>        How many bathrooms does it have?
      </span>
      <div className="relative">
        <select
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         
          onChange={handleNumBathroomChange}
          value={numOfBathRoom}
        >
          <option value="">Select a number of bathrooms</option>
          {bathRoomOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </div>
      
    </div>
                        </Panel>
                        <Panel header="Room View" key="2">
                            <div className='p-4'>
      <span className="flex gap-2 flex-row items-center text-gray-700 font-bold mb-2" >
        <GiWindow size={20}/>        View
      </span>
      <div className="relative">
        <select
          className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
         
          onChange={handleRoomViewChange}
          value={roomView}
        >
          <option value="">Select a number of bathrooms</option>
          {roomViewOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
      </div>
      
    </div>
                        </Panel>
                        <Panel header="In-room entertainment" key="3">
                        <div>
      <span className="font-bold flex flex-row items-center gap-2 mb-2"><RiComputerLine size={20}/> Select entertainment options:</span>
      {amenitiesList.map((amenity) => (
        <label key={amenity.id} className="flex mt-4 items-center">
          <input
            type="checkbox"
            value={amenity.name}
            checked={amenities.includes(amenity.name)}
            onChange={handleAmenityChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">{amenity.name}</span>
        </label>
      ))}
      
    </div>
                        </Panel>
                        <Panel header="Kitchen Appliances" key="4">
                        <div>
      <span className="font-bold flex flex-row items-center gap-2 mb-2"><MdOutlineSoupKitchen size={20}/> Select Kitchen wears:</span>
      {KitchenAppliances.map((appliance) => (
        <label key={appliance.id} className="flex mt-4 items-center">
          <input
            type="checkbox"
            value={appliance.name}
            checked={kitchenAppliances.includes(appliance.name)}
            onChange={handleKitcheAppChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">{appliance.name}</span>
        </label>
      ))}
      
    </div>
                        </Panel>
                        <Panel header="Bedding" key="5">
                        <div>
      <span className="font-bold flex flex-row items-center gap-2 mb-2"><MdOutlineSoupKitchen size={20}/> Select offered bedding:</span>
      {beddingInfo.map((bed) => (
        <label key={bed.id} className="flex mt-4 items-center">
          <input
            type="checkbox"
            value={bed.name}
            checked={bedding.includes(bed.name)}
            onChange={handleBeddingChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">{bed.name}</span>
        </label>
      ))}
      
    </div>
                        </Panel>

                        <Panel header="In-room refreshments" key="6">
                        <div>
      <span className="font-bold flex flex-row items-center gap-2 mb-2"><MdOutlineSoupKitchen size={20}/> Select offered options:</span>
      {refreshOptions.map((refresh) => (
        <label key={refresh.id} className="flex mt-4 items-center">
          <input
            type="checkbox"
            value={refresh.name}
            checked={refreshments.includes(refresh.name)}
            onChange={handleRefreshmentChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">{refresh.name}</span>
        </label>
      ))}
      
    </div>
                            </Panel>
                     </Collapse>
                    
                    
                  </div>

                  <button onClick={handleOkay} type="button" class="py-2.5 px-5 mr-2 mt-4 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Okay</button>
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

export default Amenities