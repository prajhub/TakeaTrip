import React from 'react'
import Navbar from './navbar'
import { BsSearch} from 'react-icons/bs'


const Hero = () => {
  return (
    <div >
        <div className='h-[500px] bg-center bg-no-repeat bg-cover bg-[url("../public/assets/switz-hero.jpg")]'>
          <Navbar/>
          <div className='max-w-[1240px] mx-auto flex flex-col  items-center'>
            <h1 className='text-[#FFFFFF] text-[75px] font-["Unbounded"] mx-auto text-center max-w-[600px] pt-3 '>Your adventure starts here</h1>

            <form className='mt-10'>
              <div className='relative flex items-center text-gray-400 focus-within:text-gray-600'>
                <BsSearch className='w-5 h-5 absolute ml-3'/>
              <input type='text' placeholder='Taske a trip' autoComplete='off' name='search' className='pr-[500px] pl-10 py-3  font-semibold placeholder-gray-500 text-black rounded-md border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2'/>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Hero