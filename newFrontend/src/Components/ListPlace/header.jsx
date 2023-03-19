import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { CiBellOn } from 'react-icons/ci'
import ProfileMenu from '../ProfileMenu'
import MainLogo from '../../assets/mainlogo.png'

import SearchModal from '../SearchModal'

const header = () => {

  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <header>
      <nav class="w-full border-gray-200 px-4 absolute bg-primary-200  text-black sm:px-5  rounded dark:bg-gray-900">

        <div class=" flex flex-wrap items-center max-w-[1400px]  mt-2 justify-between mx-auto">


            <button onClick={toggleHidden} className={!isHidden ? 'hidden': '' }>
            <div className='flex items-center' >
              
                <BiSearch className='text-2xl mr-1'/>
                <p className='font-semibold text-lg'>Search</p>
             
            </div> 
            </button>
            <div className={isHidden ? 'hidden': ''}>
              <SearchModal />
            </div>
          
              
        <div className=' ml-40 block'>
            <a href="/" className="flex items-center ">
                
                <span className="self-center text-xl font-extrabold whitespace-nowrap dark:text-white">TakeaTrip</span>
            </a>

            </div>



            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col items-center p-4 mt-4 border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-[18px]">Destinations</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-[18px]">Reviews</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><CiBellOn className='text-2xl font-bold'/></a>
      </li>
      <li>
          <ProfileMenu/>
      </li>
    </ul>
  </div>

        </div>
      </nav>
      </header>
    
    </>
  )
}

export default header