import React, { useState } from 'react'


import PublicInfo from './Steps/PublicInfo'
import Photo from './Steps/Photo'
import LocInfo from './Steps/LocInfo'
import Experience from './Steps/Experience'
import { useSelector } from 'react-redux'

import { useCreateServiceMutation } from '../../../Features/services/addServiceSlice'


const OnboardingBody = () => {

  const publicInfo = useSelector((state) => state.addPublicInfo.publicInfo)
  
  const photos = useSelector((state) => state.addPhotos.photos)
  console.log(photos)
  
  
  const locationInfo = useSelector((state) => state.insertLocation.locationInfo)
  
  

  const expereinces = useSelector((state) => state.experience.experienceInfo)
  


  const [ createService ] = useCreateServiceMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createService({ country:publicInfo.selectedCountry, description: publicInfo.description, phoneNum: publicInfo.phoneNum, website: publicInfo.website, officialName: publicInfo.officialName, city: locationInfo.city, streetAddress: locationInfo.streetAddress, zipCode: locationInfo.zipCode, serviceType: expereinces.selectedService, serviceOption: expereinces.selectedOption, img: photos   })
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
        <div className='max-w-[1400px]   mx-auto py-20 '>
          <form>
        <PublicInfo/>
        <Photo/>
        <LocInfo/>
        <Experience/>
        <button onClick={handleSubmit} type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none">Continue</button>
        </form>
       
      </div>

    
    </>
  )
}

export default OnboardingBody