import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const ListService = () => {

    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState('')

    const handleOptionChange = (option) => {
        setSelectedOption(option);
      };

    const handleGetStarted = () => {
        if (selectedOption === 'supplier') {
          navigate('/supplier-page');
        } else if (selectedOption === 'point-of-interest') {
          navigate('/poi-page');
        } else if (selectedOption === 'travel-agency') {
          navigate('/travel-agency-page');
        }
      };


  return (
    <>
    
        <header className='text-3xl font-semibold border border-b py-2 px-4 text-primary-700'>TakeaTrip</header>


        <section class=" ">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 ">
            <h1 class="max-w-2xl mb-4 text-1xl font-bold border-b pb-3 tracking-tight  md:text-2xl xl:text-3xl ">What best describes what you do?</h1>
            
            <form>
                <div className='flex gap-4 border-b  py-4'>
                    <input  checked={selectedOption === 'supplier'}
                        onChange={() => handleOptionChange('supplier')}  type='radio' className='mt-2'/>
                    <div><h3 className='text-xl font-semibold mb-2'>Supplier</h3><p className='text-gray-500'>A company or individual that provides a product or service to help travelers experience a place or point of interest. e.g. Big Apple Food Tours, Open Road Bike Rentals</p></div>
                </div>
                <div className='flex gap-4 border-b  py-4'>
                    <input checked={selectedOption === 'point-of-interest'}
                  onChange={() => handleOptionChange('point-of-interest')}  type='radio' className='mt-2'/>
                    <div><h3 className='text-xl font-semibold mb-2'>Point of Intereset</h3><p className='text-gray-500'>A location or attraction that travelers see or visit. e.g. Impressionist Art Museum, Oceanfront Theme Park</p></div>
                </div>
                <div className='flex gap-4 border-b  py-4'>
                    <input   checked={selectedOption === 'travel-agency'}
                  onChange={() => handleOptionChange('travel-agency')} type='radio' className='mt-2'/>
                    <div><h3 className='text-xl font-semibold mb-2'>Travel Agency</h3><p className='text-gray-500'>A company or individual that receives commission for booking travel experiences for clients. Selecting this option allows you to sign up for the Viator Travel Agent Program.</p></div>
                </div>
                <button
                type='button'
                className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-9 py-3 mr-2 mb-2 mt-10 ${
                  selectedOption === '' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleGetStarted}
                disabled={selectedOption === ''}
              >
                Get Started
              </button>
            </form>
        </div>
        <div class="hidden lg:ml-8 lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="mockup"/>
        </div>                
    </div>
</section>
    </>
  )
}

export default ListService