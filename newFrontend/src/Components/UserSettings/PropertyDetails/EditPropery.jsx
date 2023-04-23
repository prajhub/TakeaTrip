import React, { useState } from 'react'

import FrontDesk from './EditPropertyDetails/FrontDesk';
import SelfCheckIn from './EditPropertyDetails/SelfCheckIn';
import CheckInTime from './EditPropertyDetails/CheckInTime';
import CheckOutTime from './EditPropertyDetails/CheckOutTime';
import OfferBreakfast from './EditPropertyDetails/OfferBreakfast';
import HasSpa from './EditPropertyDetails/HasSpa';
import AllowPet from './EditPropertyDetails/AllowPet';
import Recreation from './EditPropertyDetails/Recreation';
import { useNavigate } from 'react-router';


const EditPropery = ({selectedProperty}) => {

  const navigate = useNavigate()

  const handleAddRoom = () =>{

    navigate(`/account/properties/${selectedProperty._id}/createRoom`, {state: { selectedProperty }})

  }


  return (
    <>
    
        <section className='w-full h-full flex flex-col'>
          <div className='flex flex-col gap-9'>
                <FrontDesk/>
                <SelfCheckIn/>
                <CheckInTime/>
                <CheckOutTime/>
                <OfferBreakfast/>

                <div className='font-semibold text-lg text-gray-500'>More facilities</div>
                <HasSpa/>
                <AllowPet/>
                <Recreation/>

                <button onClick={handleAddRoom} type="button" className="text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mr-2 mb-2">Add Room</button>
          </div>
        </section>
    
    </>
  )
}

export default EditPropery