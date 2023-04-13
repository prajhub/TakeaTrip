import React, { useState, useEffect } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPublicInfo } from '../../../../Features/serviceListing/onboarding/publicInfoSlice'

const PublicInfo = () => {

    const [phoneNum, setPhoneNum] = useState('')
    const [countries, setCountries] = useState([]);


    

    const [description, setDescription] = useState('')
    function handleDescription(event) {
      setDescription(event.target.value);
    }


    const [officialName, setOfficialName] = useState('')
    function handleName(event) {
      setOfficialName(event.target.value);
    }

    const [website, setWebsite] = useState('')
    function handleWebsite(event) {
      setWebsite(event.target.value);
    }


    const [selectedCountry, setSelectedCountry] = useState('');
    function handleCountryChange(event) {
      setSelectedCountry(event.target.value);
    }

    
    

    useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);


    const dispatch = useDispatch()


    const handleSavePublicInfo = () => {
      const newPublicInfo = {
          phoneNum,
          description,
          officialName,
          website,
          selectedCountry
      };

      dispatch(setPublicInfo(newPublicInfo));
  }

  return (
    <>
    
    <div>
            <h1 className='font-open-san text-4xl font-semibold mb-9'>Let's start with the basics</h1>
        </div>
       <div >
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">This information will show on your public Tripadvisor listing.</h3>
              
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                  
                  <label htmlFor="officialname" className="block text-sm font-medium leading-6 text-gray-900">
                  Where does your experience take place?
                  </label>
                  <select className="block appearance-none w-full bg-white border mt-3 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleCountryChange}>
        <option>Select a country</option>
        {countries.map(country => (
          <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
        ))}
      </select>
                </div>
                  <div className='col-span-3 sm:col-span-2'>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                      Tell us more
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        value={description}
                        onChange={handleDescription}
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="Write a brief description about the tours, activities, or other experiences you offer."
                        
                      />
                    </div>
                    
                  </div>
                    
                  <div className="col-span-3 sm:col-span-2">
                  
                      <label htmlFor="officialName" className="block text-sm font-medium leading-6 text-gray-900">
                        Official name
                      </label>
                      <input
                        type="text"
                        placeholder='This is the name used when marketing your tours, activities, or experiences.'
                        name="officialName"
                        id="officialName"
                        value={officialName}
                       onChange={handleName}
                        autoComplete="family-name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                        Website
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          onChange={handleWebsite}
                          name="website"
                          id="website"
                          value={website}
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
                      value={phoneNum}
                      onChange={setPhoneNum}
                      />
                     
                    </div>
                  </div>

                  

                  <button onClick={handleSavePublicInfo} type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-12 py-2.5 mr-2 mb-2 ">Set</button>
                  
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

export default PublicInfo