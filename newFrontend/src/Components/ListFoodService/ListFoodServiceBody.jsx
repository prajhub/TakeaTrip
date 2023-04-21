import React, { useState } from 'react'
import axios from 'axios'
import BasicInfo from './Steps/BasicInfo'

import LocInfo from './Steps/LocInfo'
import { RiRestaurantLine } from 'react-icons/ri'
import {MdCarRental} from 'react-icons/md'
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";

import { BiBed } from 'react-icons/bi'
import { MdOutlineLocalActivity } from 'react-icons/md'

import { useSelector, useDispatch } from 'react-redux'
import { useCreateFoodServiceMutation } from '../../Features/foodService/addFoodServiceSlice'

const ListFoodServiceBody = () => {
  
  const [selectedListing, setSelectedListing] = useState('');


    const basicInfo = useSelector((state) => state.listFoodService.briefInfo)
    

    const contact = basicInfo.tele
    const website = basicInfo.website
    const name = basicInfo.placeName
    
    
    const locInfo = useSelector((state) => state.foodLocInfo.locInfo)
    
    
    const city = locInfo.city
    const address = locInfo.streetAddress
    const country = locInfo.selectedCountry
    const type = selectedListing
    console.log(type)
    

  

  console.log(selectedListing)
  
  
    const listClick = (name) => {
  
        console.log(name)
        setSelectedListing(name)
       
    }

    

    const [images, setImages] = useState([])
    console.log(images)

    let uploadedImages = []

  

    const handleImage = async (e) => {
      const files = e.target.files;
      
    
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
    
      setImages(uploadedImages);

    }
    

    // const setFileToBase = (file) => {
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onloadend = () => {
    //     setImage(reader.result)
    //     // console.log(reader.result)
    //   }
    // }

    


  

    const [createFoodService, { isError, isSuccess, isLoading}] = useCreateFoodServiceMutation()
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        
    
        try {
         
          const { data } = await createFoodService({ name, contact, type, city, address, country, images: uploadedImages,})
          if(!data){
            console.log('error ayo')
          }
          console.log(data)
        } catch (error) {
          console.error(error);
        }
    
      


        
      };

  return (
    <>  
    <section className='max-w-[1400px]   mx-auto py-5'>
    
    <section className=' md:py-5'>

<div className=' h-[100px]  flex flex-col'>
    <h2 className='font-open-san-normal text-2xl font-semibold'>What type of restaurant is it?</h2>
    <div className='flex flex-row pt-4 '>
    <button type="button" onClick={() => listClick('Cafe')}    className="text-black bg-white border border-gray-400 hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 ">
        <BiBed className='w-5 h-5 mr-2 -ml-1 '/>
        Café
            </button>
            <button type="button" onClick={() => listClick('Restaurant')}  className="text-black bg-white border border-gray-400  hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 ">
        <MdOutlineLocalActivity className='w-5 h-5 mr-2 -ml-1 '/>
        Restaurant
            </button>
    <button type="button" onClick={() => listClick('Diner')}  className="text-black bg-white border border-gray-400  hover:border-black   focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 ">
        <RiRestaurantLine className='w-5 h-5 mr-2 -ml-1 '/>
        Diner
            </button>
<button type="button" onClick={() => listClick('Pub')}  className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 ">
        <MdCarRental className='w-5 h-5 mr-2 -ml-1 '/>
        Pub
            </button>
            <button type="button" onClick={() => listClick('Food Truck')}  className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 ">
        <MdCarRental className='w-5 h-5 mr-2 -ml-1 '/>
        Food Truck
            </button>

            
            </div>


           
           
            <div className='py-7'>
           
           
            </div>


           
           
           
            
            </div>
</section>



        <BasicInfo/>
        {/* Photo Section*/}

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

    {/* Photo Section*/}

        <LocInfo/>
        <button onClick={handleSubmit} type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none">Continue</button>
    </section>
    </>
  )
}

export default ListFoodServiceBody