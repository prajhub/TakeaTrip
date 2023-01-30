import React from 'react'
import Header from './header'
const Sucsacc = () => {
  return (
    <>
        <Header/>
        <div className='flex flex-col items-center justify-center  h-[400px]'>
            <h1 className='text-4xl font-bold my-4'>Your Account has been created</h1>
            <p>Thank you for creating your account at TakeaTrip</p>
            <button type="button" class="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue exploring</button>

        </div>
    
    </>
  )
}

export default Sucsacc;