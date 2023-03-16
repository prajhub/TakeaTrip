import React from 'react'
import {BsArrowDownShort} from 'react-icons/bs'

const description = () => {
  return (
    <>
    
        <section className='py-9'>
            <div className='mx-auto max-w-[1400px] '>
                <div className=' md:w-[900px] max-h-lg'>
                <p className='text-sm underline font-bold'>Europe</p>
                <h1 className='font-bold text-6xl font-open-san mt-6 text-primary-800'>Switzerland</h1>

                <p className=' mt-5 font-lg text-2xl font-open-san-normal'>Switzerland is no ordinary place. It is the last great European plains, shrouded in mystery and magic, where a traditional Buddhist culture carefully embraces global developments.</p>

                <div className='flex  items-center mt-4'>
                    <p className='text-sm'>See More</p>
                    <BsArrowDownShort/>
                </div>
                
                </div>
            </div>
        </section>

    </>
  )
}

export default description