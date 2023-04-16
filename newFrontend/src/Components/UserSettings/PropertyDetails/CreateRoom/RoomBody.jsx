import React, { useState } from 'react'
import BasicInfo from './CreationSteps/BasicInfo'
import Amenities from './CreationSteps/Amenities'
import Rates from './CreationSteps/Rates'
import Preview from './CreationSteps/Preview'
import { useLocation } from 'react-router'

import { useSelector } from 'react-redux'
import { useCreateRoomMutation } from '../../../../Features/roomControl/onboarding/postRoom'

const RoomBody = () => {

  const location = useLocation()

  const id = location.state.selectedProperty._id;


  

  const basicInfo = useSelector((state) => state.addRoomBasic.basicInfo)
  
  const typeOfRoom = basicInfo.selectedOption
  

  const classofRoom = basicInfo.roomClass
  console.log(classofRoom)

  const amenitiesInfo = useSelector((state) => state.addRoomAmenities.amenities)
  
  const rateInfo = useSelector((state) => state.addBasicRate.basicRate)
  const rate = rateInfo.baseRate
  console.log(rate)
  
  
  const roomType = basicInfo.selectedOption;  
  const bedRoom = basicInfo.numOfBedRooms

  const roomData = {
    type: typeOfRoom,
    class: classofRoom,
    price: rate,
}

  
   const previewData = [ roomType, bedRoom]

   const [createRoom, { isError, isSuccess, isLoading, error}] = useCreateRoomMutation()

   
   const handleSubmit = async(e) =>{

      e.preventDefault();


      try {
        const { data } = await createRoom(id, { type: typeOfRoom,  roomclass: classofRoom, price: rate})
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