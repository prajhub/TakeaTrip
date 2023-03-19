import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react'

const accomodationbody = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const accommodationTypes = [
    { name: "Hotels", icon: "🏨" },
    { name: "Resorts", icon: "🏝️" },
    { name: "Vacation Rentals", icon: "🏠" },
    { name: "Apartments", icon: "🏢" },
    { name: "Guesthouses", icon: "🏡" },
    { name: "Hostels", icon: "🛏️" },
    { name: "Motels", icon: "🏩" },
    { name: "Inns", icon: "🏚️" },
    { name: "Villas", icon: "🏰" },
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
  const [selectedType, setSelectedType] = useState(null);
  const [numRooms, setNumRooms] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOption, setSelectedOption] = useState(onSiteStaffOptions[0].value);
  const [hasFrontDesk, setHasFrontDesk] = useState(null);
  const [hasCheckIn, setHasCheckIn] = useState(null);
  const [checkInFrom, setCheckInFrom] = useState("12:00 pm");
  const [checkInTo, setCheckInTo] = useState("12:00 pm");
  const [checkoutTime, setCheckoutTime] = useState('12:00 PM');

  const handlePlaceName = (e) => {
  
    setPlaceName(e.target.value)
    
  }

  const handleCountryName = (e) => {
  
    setCountry(e.target.value)
    
  }

  // useEffect(() => {
  //   console.log(placeName);
  // }, [placeName]);

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

  return (
    <>
    
    <div className='max-w-[1400px]  mx-auto py-32'>
        <div>
            <h1 className='font-open-san text-4xl font-semibold mb-9'>How can we find you?</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">Name & Description</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
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
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
              <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <input
                        type="text"
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
                        id="city"
                        autoComplete="address-level2"
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
                      
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Identification Document</label>
                        <input className="block w-full text-sm text-primary-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
                        <div className="mt-3 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Identification documents of the business owner or authorized signatory, such as a passport or driving license.</div>

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
                        name="city"
                        value={country}
                        id="city"

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
                        id="city"
                        autoComplete="address-level2"
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

      <div className="mt-10 sm:mt-0">
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
                  <fieldset>
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
                  </fieldset>
                  <fieldset>
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
                  </fieldset>
                  <fieldset >
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                      Select the number of rooms / units the property has
                    </legend>
                    <div className="mt-4">
        
        <input
          type="number"
          className="border-gray-400 border py-2 px-4 rounded ml-2"
          value={numRooms}
          // onChange={}
        />
      </div>
                  </fieldset>
                  <fieldset>
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
                  </fieldset>
                  <fieldset>
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900 ">
                      Is there a front desk at your property?
                    </legend>
                    <div className='mt-5'>
                    
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-full ${
            hasFrontDesk === true ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={handleButtonClick}
          value="yes"
        >
          Yes
        </button>
        <button
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
                  </fieldset>
                  <fieldset>
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
                    </fieldset>
                    <fieldset>
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
                    </fieldset>
                    <fieldset>
                  <legend className="contents text-xl font-semibold leading-6 text-gray-900 ">
                  Is the check-in location on the property?
                    </legend>
                    <div className='mt-5'>
                    
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 font-semibold rounded-full ${
            hasFrontDesk === true ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={secondhandleButtonClick}
          value="yes"
        >
          Yes
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-full ${
            hasFrontDesk === false ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={secondhandleButtonClick}
          value="no"
        >
          No
        </button>
      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <Button
                    type="submit"
                    onClick={onOpen}
                    colorScheme='teal'
                    className="inline-flex justify-center rounded-md bg-primary-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    Save
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
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
              <div>Starboy</div>
            <div className="font-medium">Country:</div>
              <div>Starboy</div>
            <div className="font-medium">Street address (50 character maximum):</div>
              <div>Starboy</div>
            <div className="font-medium">Telephone:</div>
              <div>Starboy</div>
            <div className="font-medium">What accommodation type best describes this property?:</div>
              <div>Starboy</div>
            <div className="font-medium">How many rooms or units does the property have?:</div>
              <div>Starboy</div>
            <div className="font-medium">How frequently is the front desk or check-in location staffed?:</div>
              <div>Starboy</div> 
            <div className="font-medium">What are the check-in hours? Start time:</div>
              <div>Starboy</div>
            <div className="font-medium">End time:</div>
              <div>Starboy</div> 
            <div className="font-medium">What is the check-out time?:</div>
              <div>Starboy</div> 
            <div className="font-medium">Are there onsite staff?:</div>
              <div>Starboy</div>
            <div className="font-medium">Is the check-in location on the property?:</div>
              <div>Starboy</div>
            </div>
            </section>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
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