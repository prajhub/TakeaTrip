import React from 'react'
import {AiOutlineBell} from 'react-icons/ai'

const header = () => {
  return (
    <>

        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
            <div class="container flex flex-wrap items-center justify-between mx-auto max-w-[1400px]">
                <div className='flex items-center flex-row  w-[700px] justify-between'>
                            <a href="/" class="flex items-center">
                    
                                <span class="self-center text-3xl font-open-san-normal font-semibold whitespace-nowrap dark:text-white">TakeaTrip</span>
                            </a>

                
                    

            
                        <div className=" w-[200px] md:w-9/12   ">
                        <form className="relative" >
                            <svg className="h-6 w-6 absolute left-3 top-1/4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                        type="text" 
                        placeholder="Where to?"
                        className="bg-white rounded-full w-full pl-12 py-3 shadow-xl focus:outline-none" 
                        
                        
                       
                            />
                        </form>
                    </div>

                    {/* Search Input Field end */}
                </div>

                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
        <li>
        <a href="" class="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:text-primary-700 md:p-0 ">Destinations</a>
        </li>
        <li>
        <a href="" class="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:text-primary-700 md:p-0 ">Review</a>
        </li>
        <li>
        <a href="" class="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:text-primary-700 md:p-0 "><AiOutlineBell size={22}/></a>
        </li>
        <li>
        <a href="" class="block py-2 pl-3 pr-4 text-gray-700 rounded  md:hover:text-primary-700 md:p-0 ">Contact</a>
        </li>
        
      </ul>
    </div>
            </div>
        </nav>
    
    </>
  )
}

export default header