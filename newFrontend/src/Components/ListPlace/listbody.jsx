import React from 'react'
import { BiBed } from 'react-icons/bi'
import { MdOutlineLocalActivity } from 'react-icons/md'
import { RiRestaurantLine } from 'react-icons/ri'
import {MdCarRental} from 'react-icons/md'

import cx from 'classnames'


const listbody = () => {



    const [isSaved, setIsSaved] = useState(false);

  const handleYesClick = () => {
    setIsSaved(true);
  };

  const handleNoClick = () => {
    setIsSaved(false);
  };


    const handleExist = () => {

    }
  return (
    <>
    
        <section className=' md:py-5'>

            <div className=' h-screen flex flex-col'>
                <h2 className='font-open-san-normal text-2xl font-semibold'>What are you listing?</h2>
                <div className='flex flex-row pt-4 '>
                <button type="button" className="text-black bg-white border border-gray-400 hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <BiBed className='w-5 h-5 mr-2 -ml-1 '/>
                    Accomodation
                        </button>
                        <button type="button" className="text-black bg-white border border-gray-400  hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <MdOutlineLocalActivity className='w-5 h-5 mr-2 -ml-1 '/>
                    Things to Do
                        </button>
                <button type="button" className="text-black bg-white border border-gray-400  hover:border-black   focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <RiRestaurantLine className='w-5 h-5 mr-2 -ml-1 '/>
                    Restaurant
                        </button>
            <button type="button" className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <MdCarRental className='w-5 h-5 mr-2 -ml-1 '/>
                    Rentals
                        </button>
                        </div>


                        <div className='flex flex-col py-5 mt-5  w-[600px]'>
                            <h2 className='font-open-san-normal text-xl font-lg'>Is this place already posted on Takeatrip platform?</h2>
                            <div className='flex flex-row pt-2'>
                            <button type="button" onClick={handleYesClick} className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-3 py-2 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Yes</button>
                            <button type="button" className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-3 py-2 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">No</button>
                            </div>
                            
                        </div>
                        <div className='flex flex-col py-5 mt-5  w-[600px]'>
                            <h2 className='font-open-san-normal text-xl font-lg'>Is this place currently open?</h2>
                            <div className='flex flex-row pt-2'>
                            <button type="button" className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-3 py-2 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Yes</button>
                            <button type="button" className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-3 py-2 text-center flex items-center mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">No</button>
                            </div>
                            
                            
                        </div>
                        <div className='py-7'>
                        <button disabled={isSaved} type="button" className={cx("text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",{'opacity-50 cursor-not-allowed': isSaved,})}>Continue</button>
                        </div>
                        
                        </div>
        </section>
    
    </>
  )
}

export default listbody