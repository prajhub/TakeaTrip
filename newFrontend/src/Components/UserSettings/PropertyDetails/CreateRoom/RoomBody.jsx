import React, { useState } from 'react'
import BasicInfo from './CreationSteps/BasicInfo'
import Amenities from './CreationSteps/Amenities'
import Rates from './CreationSteps/Rates'
import Preview from './CreationSteps/Preview'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {useCreateRoomMutation} from '../../../../Features/api/apiSlice'

//Import for amenities
import { Collapse } from 'antd'
import {FaShower} from 'react-icons/fa'
import {GiWindow} from 'react-icons/gi'
import {RiComputerLine} from 'react-icons/ri'
import {MdOutlineSoupKitchen} from 'react-icons/md'

import {HiOutlineLightBulb} from 'react-icons/hi'

import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

import { useDispatch } from 'react-redux'
import { addRoom } from '../../../../Features/roomControl/onboarding/postRoomAction'

const RoomBody = () => {

  const form = useForm()
  const { register, control, setValue, handleSubmit, watch, getValues } = form

  const [createRoom , { isLoading, isError, isSuccess}] = useCreateRoomMutation()

  const location = useLocation()

  const accoId = location.state.selectedProperty._id;


  
   



  //PRE-Basic-Info
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




    //PRE Amenities Info
    const { Panel } = Collapse;

    // const [numOfBathRoom, setNumOfBathRoom] = useState('');
    // const [roomView, setRoomView] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [kitchenAppliances, setKitchenAppliances] = useState([]);
    const [fixBedding, setFixBedding] = useState([]);
    const [refreshments, setRefreshments] = useState([]);

    
  

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
          setValue("inroomamenities", amenities.filter((name) => name !== amenityName));
          return;
        }
        setValue("inroomamenities", [...amenities, amenityName])
        setValue("accoId", accoId)
      };

      const handleKitcheAppChange = (event) => {
        const appName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setKitchenAppliances([...kitchenAppliances, appName]);
        } else {
          setKitchenAppliances(kitchenAppliances.filter((name) => name !== appName));
          setValue("kitchenamenities", kitchenAppliances.filter((name) => name !== appName));
          return;
        }
        setValue("kitchenamenities", [...kitchenAppliances, appName])
      };

      const handleBeddingChange = (event) => {
        const bedName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setFixBedding([...fixBedding, bedName]);
        } else {
          setFixBedding(fixBedding.filter((name) => name !== bedName));
            setValue("bedding", bedding.filter((name) => name !== bedName));
            return;
        }
        setValue("bedding", [...fixBedding, bedName])
      };

      const handleRefreshmentChange = (event) => {
        const refreshName = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setRefreshments([...refreshments, refreshName]);
        } else {
            setRefreshments(refreshments.filter((name) => name !== refreshName));
            setValue("inroomrefreshments", refreshments.filter((name) => name !== refreshName));
            return;
        }
        setValue("inroomrefreshments", [...refreshments, refreshName])
      };



      //PRE Rates Info
      const [baseRate, setBaseRate] = useState('')



    const handleBaseRateChange = (event) => {
        setBaseRate(event.target.value)
      }

    

     
      const [images, setImages] = useState([])
      console.log(images)
      
  
      const handleImage = async (e) => {
        const files = e.target.files;
        let uploadedImages = []
      
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('upload_preset', 'gqtcjdks');
      
          try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dhngfjx6o/image/upload', formData);
            uploadedImages.push(res.data.secure_url);
          } catch (err) {
            console.log(err);
          }
        }
      
        
        setImages(uploadedImages)
        setValue("photos", uploadedImages);
      }
      


  

  //Watching the form values
      const  type = watch("type")
      const roomclass = watch("roomclass")
      const bedrooms = watch("bedrooms")
      const mainPrice = watch("price")
      const bathroom = watch("bathroom")
      const inroomamenities = watch("inroomamenities")
      const roomview = watch("roomview")
      const kitchenamenities = watch("kitchenamenities")
      const bedding = watch("bedding")
      const inroomrefreshments = watch("inroomrefreshments")

      // console.log(type, roomclass, bedrooms,mainPrice, bathroom, inroomamenities, roomview, kitchenamenities, bedding,inroomrefreshments)

      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

  
   const [formData, setFormData] = useState({
    accoId: accoId,
    price: "",
    

   })



const dispatch = useDispatch()

   const onSumbit = async (data) => {
    
    const { type, roomclass, bedrooms, bathroom, roomview, inroomamenities, inroomrefreshments, kitchenamenities, bedding, photos, price } = data;
    console.log(type, roomclass, price)

    
   
    try {

      

      dispatch(addRoom(formData))


   } catch (error) {
     console.log(error);
   }
   }

  return (
    <>
    
    <section className='max-w-[1400px]   mx-auto py-32'>
      <form onSubmit={handleSubmit(onSumbit)}>
        {/* BASIC INFO*/}

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
          typeof='string'
          className=" mt-2 appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="property-type"
          {...register("type")}
        >
          <option >Select a room type</option>
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
          {...register("roomclass")}
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
         {...register("bedrooms")}
        >
          <option value="">Select the number of bedrooms</option>
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

        {/* BASIC INFO*/}


        {/* Amenities */}

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
         
          {...register("bathroom")}
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
         
          {...register("roomview")}
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
            
          {...register("inroomamenities")}
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
            {...register("kitchenamenities")}
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
            {...register("bedding")}
            checked={fixBedding.includes(bed.name)}
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
            {...register("inroomrefreshments")}
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
         {/* Amenities */}  

        {/*Rates */}

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
                            name='price'
                            onChange={handleInputChange}
                            className=" mt-2 border-gray-400 border py-2 px-4 rounded "
                            />
                            <input type='text'
                            {...register("accoId")} hidden />
                        </div>

                        <div className=' flex flex-col mt-5 '>
                                <h2 className='text-sm font-medium leading-6 text-gray-900'>Included:</h2>
                                <p className='text-sm font-md text-gray-500'>Free Self Parking</p>
                        </div>
                   
                    
                    
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

        {/*Rates */}

        {/* Photos */}

        <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Photos</h3>
              <p className="mt-1 text-sm text-gray-600">Travelers interact with photos more than any other part of your property listing, and the right ones can make a difference.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className=" px-4 py-5 sm:p-6">
                  <div className="col-span-full">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                        <input type='file'  multiple onChange={handleImage}   />
                        <input type='file' hidden multiple {...register("photos")}/>
                  </div>
                  </div>
                    

                    
                    
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

      {/* Photos */}
       
       
        {/*Preview */}
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

                        <p className='text-md mt-4'>Big room</p>
                    
                    
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
        {/*Preview */}

        <button   class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  ">Create Room</button>
        </form>
        <DevTool control={control}/>
    </section>
    
    </>
  )
}

export default RoomBody