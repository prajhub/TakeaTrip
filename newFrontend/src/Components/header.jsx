import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
const Header = () => {
  return (
    <>
    <div className='border-b-2'>
        <div className='flex items-center  max-w-[830px] justify-between mt-5'>
        <BsArrowLeft className='ml-2' size={20}/>
       
        <h1 className='font-bold text-2xl'>TakeaTrip</h1>
        </div>
        </div>
    
    </>
  )
}

export default Header