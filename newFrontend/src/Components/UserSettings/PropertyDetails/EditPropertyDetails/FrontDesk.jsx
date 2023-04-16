import React, { useState } from 'react';

const FrontDesk = () => {
  const [hasFrontDesk, setHasFrontDesk] = useState(null);

  const handleButtonClick = (event) => {
    const answer = event.target.value === 'yes';
    setHasFrontDesk(answer);
  };

  return (
    <>
      <section className='border p-4 bg-gray-200'>
        <span className='contents text-lg font-semibold leading-6 text-gray-900 '>
          Is there a front desk at your property?
        </span>
        <div className='mt-5'>
          <div className='flex gap-2 mb-4'>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                hasFrontDesk === true ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
              }`}
              onClick={handleButtonClick}
              value='yes'
            >
              Yes
            </button>
            <button
              id='front-desk'
              className={`px-4 py-2 font-semibold rounded-full ${
                hasFrontDesk === false ? 'bg-primary-600 text-white ring-2 ring-primary-600' : 'bg-white text-gray-700'
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
  );
};

export default FrontDesk;
