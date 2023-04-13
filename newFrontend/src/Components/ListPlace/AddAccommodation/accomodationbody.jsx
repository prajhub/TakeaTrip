import React, { useState, useEffect } from 'react'
import { useCreateAccommodationMutation } from '../../../Features/accommodations/accommodationApiSlice'
import PhoneInput from 'react-phone-number-input'

import { useNavigate, Link } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import {

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Spinner,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react'

const accomodationbody = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [openSecond, setOpenSecond] = useState(false)

  const onSecondOpen = () => setOpenSecond(true)
  const onSecondClose = () => setOpenSecond(false)


  const accommodationTypes = [
    { name: "Hotel", icon: "🏨" },
    { name: "Resort", icon: "🏝️" },
    { name: "Vacation Rental", icon: "🏠" },
    { name: "Apartment", icon: "🏢" },
    { name: "Guesthouse", icon: "🏡" },
    { name: "Hostel", icon: "🛏️" },
    { name: "Motel", icon: "🏩" },
    { name: "Inn", icon: "🏚️" },
    { name: "Villa", icon: "🏰" },
    { name: "Bed and Breakfast", icon: "🛌" },
  ];

  const onSiteStaffOptions = [
    { label: "Full time", value: "full_time" },
    { label: "Part time", value: "part_time" },
    { label: "No on site staff", value: "no_staff" },
  ];
  

  const amenitiesList = [
    "Free Wi-Fi",
    "Swimming pool",
    "Air conditioning",
    "Parking",
    "Fitness center",
    "Breakfast included",
    "24-hour front desk",
    "Pet-friendly",
    "Non-smoking rooms",
    "Family rooms",
    "Airport shuttle",
    "Spa",
    "Bar",
    "Restaurant",
    "Room service",
    "Laundry",
  ];
  const checkInOptions = [];
  const checkOutOptions = [];
  for (let i = 6; i <= 24; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
    checkOutOptions.push(<option key={`${i}:00`} value={`${i}:00 AM`}>{`${i}:00 AM`}</option>)
    checkOutOptions.push(
      <option key={`24:00`} value={`12:00 PM`}>12:00 PM</option>
    );
  }
  for (let i = 0; i <= 5; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
    checkOutOptions.push(
      <option key={`${i}:30`} value={`${i}:30 PM`}>{`${i}:30 PM`}</option>
    );
  }
  checkInOptions.push(`12:00 PM`);
  for (let i = 13; i <= 24; i++) {
    checkInOptions.push(`${i < 22 ? "0" : ""}${i - 12}:00 PM`);
    checkInOptions.push(`${i < 22 ? "0" : ""}${i - 12}:30 PM`);
  }
  
  const [placeName, setPlaceName] = useState('')
  const [country, setCountry] = useState('')
  const [street, setStreet] = useState('')
  const [tele, setTele] = useState('')
  const [city , setCity] = useState('')
  const [selectedType, setSelectedType] = useState(null);
  const [numRooms, setNumRooms] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOption, setSelectedOption] = useState(onSiteStaffOptions[0].value);
  const [hasFrontDesk, setHasFrontDesk] = useState(null);
  const [hasCheckIn, setHasCheckIn] = useState(null);
  const [checkInFrom, setCheckInFrom] = useState("6:00 AM");
  const [checkInTo, setCheckInTo] = useState("5:30 AM");
  const [checkoutTime, setCheckoutTime] = useState('12:00 PM');
  const [image, setImage] = useState('')



    const handleImage = (e) => {

      const file = e.target.files[0]
      setFileToBase(file)
      console.log(file)

    }

    const setFileToBase = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
        // console.log(reader.result)
      }
    }



  const handlePlaceName = (e) => {
  
    setPlaceName(e.target.value)
    
  }

  const handleCity = (e) => {
    setCity(e.target.value)
    console.log(e.target.value)
  }

  const handleCountryName = (e) => {
  
    setCountry(e.target.value)
    console.log(e.target.value)
    
  }

  const handleStreetName = (e) => {
  
    setStreet(e.target.value)
    
  }

 

  const handleCheckInFromChange = (event) => {
    setCheckInFrom(event.target.value);
  };

  const handleCheckInToChange = (event) => {
    setCheckInTo(event.target.value);
  };

  const handleCheckoutChange = (e) => {
    setCheckoutTime(e.target.value);
  }

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    console.log(selectedType)
  };

 
  const handleNumRoomsChange = (event) => {
    setNumRooms(event.target.value);
    console.log(event.target.value);
  };
  
  const handleAmenitySelect = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleButtonClick = (event) => {
    const answer = event.target.value === "yes";
    setHasFrontDesk(answer);
  };

  const secondhandleButtonClick = (event) => {
    const answer = event.target.value === "yes";
    setHasCheckIn(answer);
  };


  const [createAccommodation, { isLoading, isError, error, isSuccess }] = useCreateAccommodationMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();



    

    try {
      const { data } = await createAccommodation({ name: placeName, country: country, type: selectedType.name, address: street, city: city, img: image, })
      if(!data){
        console.log('error ayo')
      }
      console.log(data)
    } catch (error) {
      console.error(error);
    }

    // onSecondOpen()
    
  };

  // if(isLoading){
  //   <Spinner/>
  // }
 





  const navigate = useNavigate()

  const navigateBack = () => {
    navigate('/addlisting')
  }


  return (
    <>
    
    <div className='max-w-[1400px]   mx-auto py-32'>
        <div>
            <h1 className='font-open-san text-4xl font-semibold mb-9'>How can we find you?</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1 ">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Name & Description</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                        Official name
                      </label>
                      <input
                        type="text"
                        value={placeName}
                        name="placeName"
                        id="placeName"
                        onChange={handlePlaceName}
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium leading-6 text-gray-900">
                        Website
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="telephone" className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                        Telephone 
                      </label>
                      <PhoneInput
                      placeholder='Enter phone number'
                      value={tele}
                      onChange={setTele}/>
                      {/* <input
                        type="text"
                        
                        name="telephone"
                        id="telephone"
                        
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      /> */}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="Write something about your place..."
                        defaultValue={''}
                      />
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
                        <input type='file' name='file-upload' multiple onChange={handleImage} />
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

      <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Additional Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    



                    <div className="col-span-6 sm:col-span-3 ">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        id="country"

                        onChange={handleCountryName}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <input
                        type="text"
                        value={street}
                        onChange={handleStreetName}
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleCity}
                        id="city"
                        
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3 '>
                      
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Business registration documents</label>
                        <input className="block w-full text-sm text-primary-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                        <div className="mt-3 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Registered legal license to operate.</div>

                    </div>
                  </div>
                </div>
               
              </div>
            
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10  sm:mt-0">
        <div className="md:grid md:grid-cols-3  md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Property ameneities</h3>
              <p className="mt-1 text-sm text-gray-600">Some additional information about your property.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden  shadow sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <section>
                    <h3>Choose the accommodation type</h3>
                    <div className="flex flex-wrap justify-center">
      {accommodationTypes.map((type) => (
        <button
          key={type.name}
          className={`${
            selectedType === type ? "bg-primary-500 text-white" : "bg-white text-gray-700"
          } font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2 flex items-center`}
          onClick={() => handleTypeSelect(type)}
        >
          <span className="mr-2">{type.icon}</span>
          <span>{type.name}</span>
        </button>
      ))}
    </div>
                  </section>
                  <section>
                    <h2 className='py-2 mb-2'>Select ameneities this property offers.</h2>
                    <div className="grid grid-cols-3 gap-4">
      {amenitiesList.map((amenity) => (
        <div key={amenity}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary-600"
              onChange={() => handleAmenitySelect(amenity)}
              checked={selectedAmenities.includes(amenity)}
            />
            <span className="ml-2 text-gray-700">{amenity}</span>
          </label>
        </div>
      ))}
    </div>
                  </section>
                  <section >
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                      Select the number of rooms / units the property has
                    </legend>
                    <div className="mt-4">
        
        <input
          type="number"
          className="border-gray-400 border py-2 px-4 rounded ml-2"
          value={numRooms}
          onChange={handleNumRoomsChange}
        />
      </div>
                  </section>
                  <section>
                    <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                    Are there onsite staff?
                    </legend>
                   
                    <div className="mt-4 space-y-4">
                    
      <div className="flex justify-between items-center mb-4 ">
        {onSiteStaffOptions.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-primary-600"
              name="onSiteStaff"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleOptionSelect}
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
                    </div>
                  </section>
                  <section>
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900 ">
                      Is there a front desk at your property?
                    </legend>
                    <div className='mt-5'>
                    
      <div className="flex gap-2 mb-4">
        <button
        id='front-desk'
          className={`px-4 py-2 font-semibold rounded-full ${
            hasFrontDesk === true ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={handleButtonClick}
          value="yes"
        >
          Yes
        </button>
        <button
        id='front-desk'
          className={`px-4 py-2 font-semibold rounded-full ${
            hasFrontDesk === false ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={handleButtonClick}
          value="no"
        >
          No
        </button>
      </div>
                    </div>
                  </section>
                  <section>
                  <legend className="contents text-xl font-semibold leading-6  text-gray-900 ">
                      When can guests check in?
                    </legend>
                    <div>
                      <div className='flex gap-4'>
                        <div className='flex gap-4 items-center mt-5 mb-4'>
                        <label className="block font-medium mb-1">From:</label>
                        <select value={checkInFrom} onChange={handleCheckInFromChange}  className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
          {checkInOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="block font-medium mb-1">To:</label>
        <select value={checkInTo} onChange={handleCheckInToChange} className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
          {checkInOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
                        </div>
                      </div>
                    </div>
                    </section>
                    <section>
                      <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                        When do guests need to check out?
                      </legend>
                     <div>
                     <div className=' mt-5 mb-4'>
                     <select value={checkoutTime} onChange={handleCheckoutChange}  className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
        {checkOutOptions}
      </select>
                     </div>
                     </div>
                    </section>
                    <section>
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900 ">
                  Is the check-in location on the property?
                    </legend>
                    <div className='mt-5'>
                    
      <div className="flex gap-2">
        <button
        id='check-in'
          className={`px-4 py-2 font-semibold rounded-full ${
            hasCheckIn === true ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={secondhandleButtonClick}
          value="yes"
        >
          Yes
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-full ${
            hasCheckIn === false ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={secondhandleButtonClick}
          value="no"
        >
          No
        </button>
      </div>
                    </div>
                  </section>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 items-center">
                <Button onClick={navigateBack} colorScheme='teal' className='mr-5 underline' variant='link'>
                  Go back
                </Button> 
                  <Button
                    type="button"
                    onClick={onOpen}
                    colorScheme='teal'
                    className="inline-flex justify-center rounded-md bg-primary-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    Save
                  </Button>

                  {/* Modal for final details */}
                  <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
                  <form onSubmi={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please review this information before submitting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section>
            
            <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">What kind of place is this?:</div>
              <div>Accommodation</div>
            <div className="font-medium">Official place name:</div>
              <div><p className='text-black'>{placeName}</p></div>
            <div className="font-medium">City/Town, State/Province/Region:</div>
              <div><p className='text-black'>{city}</p></div>
            <div className="font-medium">Country:</div>
              <div>{country}</div>
            <div className="font-medium">Street address (50 character maximum):</div>
              <div><p className='text-black'>{street}</p></div>
            <div className="font-medium">Telephone:</div>
              <div><p className='text-black'>{tele}</p></div>
            <div className="font-medium">What accommodation type best describes this property?:</div>
              <div> {selectedType && <p className="text-black">{selectedType.name}</p>}</div>
            <div className="font-medium">How many rooms or units does the property have?:</div>
              <div>{numRooms}</div>
            <div className="font-medium">Is the front desk location staffed?:</div>
              <div><p className='text-black'>{hasFrontDesk ? "Yes" : "No"}</p></div> 
            <div className="font-medium">What are the check-in hours? Start time:</div>
              <div><p className='text-black'>{checkInFrom}</p></div>
            <div className="font-medium">End time:</div>
              <div><p className='text-black'>{checkInTo}</p></div> 
            <div className="font-medium">What is the check-out time?:</div>
              <div><p className='text-black'>{checkoutTime}</p></div> 
            <div className="font-medium">Are there onsite staff?:</div>
              <div>Starboy</div>
            <div className="font-medium">Is the check-in location on the property?:</div>
              <div><p className='text-black'>{hasCheckIn ? "Yes" : "No"}</p></div>
            </div>
            </section>
           
          </ModalBody>

          <ModalFooter>
          
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>

       {/* Modal for final details closed */}

       {/* Modal for success message */}
       <Modal isOpen={openSecond} onClose={onSecondClose} size='3xl'>
          <ModalOverlay />
            <ModalContent>
              <ModalHeader>Thankyou for telling us about {placeName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <p className='font-open-san mb-3'>To ensure travellers benefit from the most accurate listing information, we screen requests to ensure all content complies with policies and formatting requirements.</p>
                  <h3 className='font-semibold text-lg py-4'>Would you like to view your listing?</h3>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className='flex  w-[800px] justify-between'>
              <Button colorScheme='teal' variant='link'>
                  No, continue browsing
                </Button>
                <Button colorScheme='teal' variant='solid'>
                  View
                </Button>
                </div>
              </ModalFooter>
              </ModalContent>
       </Modal>



                </div>
              </div>
            
          </div>
        </div>
        </div> 
      </div>
    
    </>
  )
}

export default accomodationbody