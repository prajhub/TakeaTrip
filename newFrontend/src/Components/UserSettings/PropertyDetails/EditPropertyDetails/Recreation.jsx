import React, { useState } from 'react';

import { GiCampingTent } from 'react-icons/gi'

const Recreation = () => {

    const [recreation, setRecreation] = useState(null);

  const handleButtonClick = (event) => {
    const answer = event.target.value === 'yes';
    setRecreation(answer);
  };


  return (
    <>
    
    <section className='border p-4 bg-gray-200'>
        <span className='flex flex-row items-center gap-2 text-lg font-semibold leading-6 text-gray-900 '>
            <GiCampingTent size={20}/>        Do you have outdoor recreation areas?
        </span>
        <div className='mt-5'>
          <div className='flex gap-2 mb-4'>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                recreation === true ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
              }`}
              onClick={handleButtonClick}
              value='yes'
            >
              Yes
            </button>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                recreation === false ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
              }`}
              onClick={handleButtonClick}
              value='no'
            >
              No
            </button>
          </div>
        </div>
      </section>
    
    </>
  )
}

export default Recreation