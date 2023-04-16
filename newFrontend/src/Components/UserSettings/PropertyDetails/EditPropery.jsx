import React, { useState } from 'react'

import FrontDesk from './EditPropertyDetails/FrontDesk';
import SelfCheckIn from './EditPropertyDetails/SelfCheckIn';
import CheckInTime from './EditPropertyDetails/CheckInTime';
import CheckOutTime from './EditPropertyDetails/CheckOutTime';
import OfferBreakfast from './EditPropertyDetails/OfferBreakfast';
import HasSpa from './EditPropertyDetails/HasSpa';
import AllowPet from './EditPropertyDetails/AllowPet';
import Recreation from './EditPropertyDetails/Recreation';



const EditPropery = (property) => {

  console.log(property)

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
          </div>
        </section>
    
    </>
  )
}

export default EditPropery