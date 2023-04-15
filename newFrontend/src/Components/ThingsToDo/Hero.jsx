import React from 'react'

const Hero = () => {
  return (
   <>
   
   <section class="bg-white ">
    <div class="grid  px-4 py-8  lg:gap-8  max-w-[1400px] mx-auto xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Things to Do in <span className='text-primary-700'>Paris</span></h1>
            <p class="max-w-2xl mb-6 font-md text-black lg:mb-8 md:text-2xl lg:text-2xl ">Snap a pic at the Eiffel Tower, wander around the Louvre, take a day trip to Versailles, or try a sightseeing tour to uncover even more art, history, and undeniable charm.</p>
        
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://images.unsplash.com/photo-1550340499-a6c60fc8287c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
        </div>                
    </div>
</section>
   
   </>
  )
}

export default Hero