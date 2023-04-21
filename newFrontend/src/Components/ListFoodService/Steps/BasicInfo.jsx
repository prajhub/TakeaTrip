import React, {useState} from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import { setBasicInfo } from '../../../Features/foodService/foodBasicInfoSlice'


const BasicInfo = () => {

  const handleBasicInfo = () => {
    dispatch(setBasicInfo({ tele, website, desc, placeName}))
    console.log(tele, website, desc, placeName )
  }

    const [tele, setTele ] = useState('')
    const [website, setWebsite] = useState('')
    const [desc, setDesc] = useState('')
    const [placeName, setPlaceName] = useState('')

    console.log(desc)

    const handlePlaceName = (event) => {
        setPlaceName(event.target.value)
    }

    const handleWebsite = (event) => {
      setWebsite(event.target.value)
    }

    const handleDesc = (event) => {
        setDesc(event.target.value)
    }

    const dispatch = useDispatch()

    
    
 

  return (
    <>
    
    
    
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
                          value={website}
                          onChange={handleWebsite}
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
                        onChange={handleDesc}
                        value={desc}
                        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        placeholder="Write something about your place..."
                       
                      />
                    </div>
                    
                  </div>

                  <button onClick={handleBasicInfo} type="button" class="py-2.5 px-5 mr-2 mt-4 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Okay</button>
                  
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