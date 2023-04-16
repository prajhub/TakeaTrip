import React, { useState } from 'react'

const CheckInTime = () => {

    const [checkInFrom, setCheckInFrom] = useState("6:00 AM");
    const [checkInTo, setCheckInTo] = useState("5:30 AM");

    const checkInOptions = [];
  
  for (let i = 6; i <= 24; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
    
  }


  const handleCheckInFromChange = (event) => {
    setCheckInFrom(event.target.value);
  };

  const handleCheckInToChange = (event) => {
    setCheckInTo(event.target.value);
  };


  return (
    <>
        <section className=''>
                  <span className="contents text-xl font-semibold leading-6  text-gray-900 ">
                      When can guests check in?
                    </span>
                    <div>
                      <div className='flex gap-4'>
                        <div className='flex gap-4 items-center mt-5 mb-4'>
                        <label className="block font-medium mb-1">From:</label>
                        <select value={checkInFrom} onChange={handleCheckInFromChange}  className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
          {checkInOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="block font-medium mb-1">To:</label>
        <select value={checkInTo} onChange={handleCheckInToChange} className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
          {checkInOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
                        </div>
                      </div>
                    </div>
                    </section>

    </>
  )
}

export default CheckInTime