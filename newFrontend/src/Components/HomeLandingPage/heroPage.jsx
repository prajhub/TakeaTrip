import React, { useState, useRef } from 'react'
import SearchModal from '../Reusables/SearchModal';

import beachVid from '../../assets/beachVid.mp4';


const Hero = () => {



  


  return (
    <div className='w-full h-screen relative'>
        <video className='w-full object-cover h-full' src={beachVid} autoPlay loop muted />
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
          <h1 className='font-["Unbounded"] text-[70px]'>Your adventure starts here</h1>
          
<section className='mt-40  md:w-[1000px] w-[600px] mx-auto'>   
   
    <SearchModal/>
                    
</section>

        </div>
    </div>
  )
}

export default Hero;