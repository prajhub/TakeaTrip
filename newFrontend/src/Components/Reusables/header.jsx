import React, { useState } from 'react'
import {AiOutlineBell, AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {BsList} from 'react-icons/bs'

import ProfileMenu from './ProfileMenu'
import { useSelector, useDispatch } from 'react-redux'

const header = () => {

    const userInfo = useSelector((state) => state.auth.token)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen)
    }


  return (
    <>
        <header className=' h-[70px]'>
            <nav class="flex justify-between  items-center max-w-[1400px] mx-auto py-2">
                <div className='w-[650px] flex items-center '>
                    <div >
                            <a href="/" class="flex items-center hidden md:block ">
                    
                                <span class="self-center text-3xl font-open-san-normal font-semibold whitespace-nowrap dark:text-white">TakeaTrip</span>
                            </a>
                    </div>

                    {/* Search Input Field  */}
            
                    <div className=" w-48 md:w-9/12 ml-4 hidden md:block">
                            <form className="relative" >
                            <svg className="h-6 w-6 absolute left-3 top-1/4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                            type="text" 
                            placeholder="Where to?"
                            className="bg-white rounded-full w-full pl-12 py-2 shadow-xl focus:outline-none" 
                        
                        
                       
                                    />
                            </form>
                        </div>

                    {/* Search Input Field end */}
                </div>
                <div className='flex items-center mr-4'>
                <ul className='hidden md:flex items-center'>
                <li className='p-4'><a href='' className='text-blackfont-open-san-normal md:hover:bg-transparent md:hover:text-primary-700'>Home</a></li>
                <li className='p-4'><a href='' className='text-black font-open-san-normal md:hover:bg-transparent md:hover:text-primary-700'>Destination</a></li>
                <li className='p-4'><a href='' className='text-black font-open-san-normal md:hover:bg-transparent md:hover:text-primary-700'>Review</a></li>
        
                    <li className='p-4'><AiOutlineBell/></li>
                
                </ul>

                <div>
                            {userInfo !== null ?  <ProfileMenu/> :
                
                <a href="/register" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>}
                            </div>

                </div>
                




                <div onClick={toggleMobileNav} className='block md:hidden mt-1 mr-3'>
                    {isMobileNavOpen ? <AiOutlineClose size={20}/> :   <AiOutlineMenu size={20}/>}
                  
                </div>

                <div className={isMobileNavOpen ? 'fixed left-0 top-0 w-[50%] border-r border-r-gray-900 h-full z-20 bg-gray-400 ease-in-out duration-500' : 'fixed left-[-100%]'}>
                    <ul className='pt-12 uppercase'>
                        <li className='p-4'>Destinations</li>
                        <li className='p-4'>Reviews</li>
                        <li className='p-4'>sdas</li>   
                    </ul>
                </div>
                
            </nav>
        </header>
    
    </>
  )
}

export default header