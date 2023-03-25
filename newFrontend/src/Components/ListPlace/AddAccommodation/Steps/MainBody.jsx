import React, { useState, useEffect } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router'
import OnBoarding from '../../FinalOnboarding/mainBody'

import { AutoComplete } from 'antd'


    const schema = z.object({
        country: z.string().nonempty('Field required')
    })

   



    const maxStep = 3

    const MainBody = () => {

   

    const [formStep, setFormStep] = useState(0)

    const [selectedCountry, setSelectedCountry] = useState('');
    const [streetAdd, setStreetAdd] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [propertyName, setPropertyName] = useState('')
    const [propertyType, setPropertyType] = useState('')

    const navigate = useNavigate()
    

    const { watch, register, formState: {errors} } = useForm({ 
        resolver: zodResolver(schema),
    })

    const [ countryData, setCountryData ] = useState([])


    const fetchData = async (searchText) => {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searchText}`);
        return response.data;

      }

      const handleSearch = async (value) => {
        const data = await fetchData(value);
        
        setCountryData(data);
       
      }
 
      console.log(selectedCountry)
      console.log(streetAdd)
      console.log(city)
      console.log(zipCode)
      console.log(propertyName)
      console.log(propertyType)

      const preDetails = [selectedCountry]

    const completeStep = () => {
            setFormStep(curr => curr + 1)
    }

    const prevtStep = () => {
        setFormStep(curr => curr - 1)
    }


    const hanldeSubmit = () => {
        navigate('/onboarding'),
       <OnBoarding details = {preDetails}/>
    }

    const renderButton = () => {
        if (formStep > 3) {
            return undefined
            
        }else if ( formStep === 3){
            return (
                
                    <button type="button" onClick={hanldeSubmit} class="text-white bg-primary-700 hover:bg-primary-800 mt-8 w-full focus:ring-4 focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2 ">Submit</button>
            )
        }
        else {
            return (
                <button type="button" onClick={completeStep} class="text-white bg-primary-700 hover:bg-primary-800 mt-8 w-full focus:ring-4 focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 mr-2 mb-2 ">Next</button>
            )
        }
    }

  return (
    <>

        <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">

            <div className="px-16 py-10">


                <form>
                    {formStep < maxStep && (
                        <div className='flex items-center mb-2'>
                           {formStep > 0 && <button onClick={prevtStep} type='button'><BiChevronLeft size={21} className='hover:text-gray-600 mr-1'/></button>}
                            <p className='text-sm text-gray-700 '>Step {formStep + 1} of {maxStep}</p>
                        </div>)}
                    {formStep === 0 && (
                        <section>
                            <h2 className='text-2xl font-open-san font-semibold'>Where is your property located?</h2>
                            {/* <input
                                type='text'
                                id='location'
                                {...register("location")}
                                name='location'
                                className='text-input mt-4 w-full'
                            
                            /> */}
                            <AutoComplete className='text-black mt-4'
                                options={countryData.map((country) => ({ label: country.name.common, value: country.name.common }))}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, value) => setSelectedCountry(value.value)}
                                onSearch={handleSearch}
                                style={{ width: 400 }}
                                placeholder="Where are you"
                               
                                />
                                
                               
                        </section>
                    )}

                    {formStep === 1 && (
                        <section>
                            <h2 className='text-2xl font-open-san font-semibold mb-4'>What is your property's address?</h2>
                            <label htmlFor='street-address' className='mt-5'>Street Adress</label>
                            <input
                                type='text'
                                onChange={(e) => setStreetAdd(e.target.value)}
                                id='street-address'
                                name='street-address'
                                className='text-input mb-6 w-full'
                            
                            />
                            <label htmlFor='street-address' className='mt-2'>City</label>
                            <input
                                type='text'
                                id='city'
                                name='city'
                                onChange={(e) => setCity(e.target.value)}
                                className='text-input mb-6 w-full'
                            
                            />
                            <label htmlFor='state' className='mt-6'>State</label>
                            <input
                                type='text'
                                id='state'

                                name='state'
                                className='text-input mb-6  w-full'
                            
                            />
                            
                            <input
                                type='text'
                                id='zipcode'
                                onChange={(e) => setZipCode(e.target.value)}
                                name='zipcode'
                                placeholder='ZIP Code'
                                className='text-input mt-2 w-full'
                            
                            />
                            
                        </section>
                    )}

                    {formStep === 2 && (
                        <section>
                            <h2 className='text-2xl font-open-san font-semibold mb-4'>Tell us a little about your property</h2>
                            <input
                                type='text'
                                id='property-name'
                                placeholder='Property name'
                                name='property-name'
                                onChange={(e) => setPropertyName(e.target.value)}
                                className='text-input mt-4 mb-7 w-full'
                            
                            />

                            <input
                                type='text'
                                id='property-type'
                                placeholder='Property type'
                                name='property-type'
                                onChange={(e) => setPropertyType(e.target.value)}
                                className='text-input mb-7 w-full'
                            
                            />
                            <input
                                type='text'
                                id='room-num'
                                placeholder='Number of rooms/units'
                                name='room-num'
                                className='text-input  w-full'

                            />
                            

                        </section>
                    )}
                    {formStep === 3 && (
                        <section>
                            <h2 className='text-2xl font-open-san font-semibold'>Are you finished ?</h2>
                            
                        </section>
                    )}


                {renderButton()}
                <pre>{JSON.stringify(watch(), null, 2)}</pre>

                </form>

            </div>




        </div>

    
    </>
  )
}

export default MainBody