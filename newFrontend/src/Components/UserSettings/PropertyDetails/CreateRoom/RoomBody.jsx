import React, { useState } from 'react'
import BasicInfo from './CreationSteps/BasicInfo'
import Amenities from './CreationSteps/Amenities'
import Rates from './CreationSteps/Rates'
import Preview from './CreationSteps/Preview'
import { useLocation } from 'react-router'

import { useSelector } from 'react-redux'
import {useCreateRoomMutation} from '../../../../Features/api/apiSlice'

const RoomBody = () => {

  const [createRoom , { isLoading, isError, isSuccess}] = useCreateRoomMutation()

  const location = useLocation()

  const accoId = location.state.selectedProperty._id;

console.log(accoId)
  

  const basicInfo = useSelector((state) => state.addRoomBasic.basicInfo)
  
  const type = basicInfo.selectedOption
  

  const roomClass = basicInfo.roomClass


  const amenitiesInfo = useSelector((state) => state.addRoomAmenities.amenities)
  
  const rateInfo = useSelector((state) => state.addBasicRate.basicRate)
  const price = rateInfo.baseRate

  
  
  const roomType = basicInfo.selectedOption;  
  const bedRoom = basicInfo.numOfBedRooms

 

  
   const previewData = [ roomType, bedRoom]

   


   
   const handleSubmit = async(e) =>{

      e.preventDefault();


      try {

        const { data } = await createRoom(accoId, {
          type, roomclass: roomClass, price
        })
       
        if(!data){
          console.log('error ayo')
        }
        console.log(data)
      } catch (error) {
        console.error(error);
      }
  

   }


  return (
    <>
    
    <section className='max-w-[1400px]   mx-auto py-32'>
        <BasicInfo/>
        <Amenities/>
        <Rates/>
        <Preview roomData={previewData}/>
        <button onClick={handleSubmit} type="button" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  ">Create Room</button>
    </section>
    
    </>
  )
}

export default RoomBody