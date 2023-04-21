import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLocInfo } from '../../../Features/foodService/foodLocInfoSlice'


const LocInfo = () => {

  const dispatch  = useDispatch()

  const handleSubmit = () => {
    dispatch(setLocInfo({ city, streetAddress, zipCode, selectedCountry}))
  }


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




    const [countries, setCountries] = useState([])
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
          .then(response => {
            setCountries(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
  


      const [selectedCountry, setSelectedCountry] = useState('')
      function handleCountryChange(event) {
        setSelectedCountry(event.target.value);
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
                  Where does your experience take place?
                  </label>
                  <select className="block appearance-none w-full bg-white border mt-3 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleCountryChange}>
        <option>Select a country</option>
        {countries.map(country => (
          <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
        ))}
      </select>
                </div>
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
                <button onClick={handleSubmit} type="button" class="py-2.5 px-5 ml-5 mt-4 mb-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Okay</button>
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