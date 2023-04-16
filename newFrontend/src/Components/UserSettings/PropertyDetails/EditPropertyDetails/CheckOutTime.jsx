import React, { useState } from 'react'

const CheckOutTime = () => {

    const checkOutOptions = [];

    for (let i = 6; i <= 24; i++){
    checkOutOptions.push(<option key={`${i}:00`} value={`${i}:00 AM`}>{`${i}:00 AM`}</option>)
    checkOutOptions.push(
      <option key={`24:00`} value={`12:00 PM`}>12:00 PM</option>
    )};


    const [checkoutTime, setCheckoutTime] = useState('12:00 PM');


    const handleCheckoutChange = (e) => {
        setCheckoutTime(e.target.value);
      }

      

  return (
   <>
    
    <section>
                      <span className="contents text-xl font-semibold leading-6 text-gray-900">
                        When do guests need to check out?
                      </span>
                     <div>
                     <div className=' mt-5 mb-4'>
                     <select value={checkoutTime} onChange={handleCheckoutChange}  className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white">
        {checkOutOptions}
      </select>
                     </div>
                     </div>
                    </section>
   
   </>
  )
}

export default CheckOutTime