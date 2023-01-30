import React from 'react'

const Explore = () => {
  return (
    <>
        <div className='mt-8'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-5xl font-bold mb-3'>Explore the <span className='text-primary-700'>World</span></h1>
                <p>Great opportunities To travel | Take a Holiday | Enjoy yourself | Take a Trip!</p>
            </div>
            <section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Santorini, Greece</h2>
            <p class="mb-4">Santorini is a breathtaking Greek island with white-washed villages and blue-domed churches perched on cliffs overlooking the Aegean Sea. Soak up the sun on black sand beaches, taste traditional Greek cuisine and enjoy stunning sunsets from hilltop tavernas. Explore the island's ancient history with a visit to Akrotiri archaeological site or the stunning Red Beach. With its unique architecture, picturesque villages, and spectacular natural beauty, Santorini is a must-visit destination for all <span className='text-primary-700 font-bold'>travelers.</span></p>
            <p>Plan your trip to Santorni with us and get amazing deals and discounts.</p>
            <a href="#" class=" mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            View more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://images.pexels.com/photos/3772273/pexels-photo-3772273.jpeg?auto=compress&cs=tinysrgb&w=600" alt="office content 1"/>
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://images.pexels.com/photos/12604793/pexels-photo-12604793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 2"/>
        </div>
    </div>
</section>
<section class="bg-white dark:bg-gray-900">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://images.pexels.com/photos/12747172/pexels-photo-12747172.jpeg?auto=compress&cs=tinysrgb&w=600" alt="office content 1"/>
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://images.pexels.com/photos/14105898/pexels-photo-14105898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 2"/>
        </div>
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Seoul, South Korea</h2>
            <p class="mb-4">Seoul, the capital city of South Korea, is a dynamic metropolis with a rich cultural heritage. The city boasts modern skyscrapers, historic temples, traditional markets, and delicious cuisine. Explore the Gyeongbokgung Palace, hike up the iconic Namsan Tower for panoramic views, indulge in street food at Myeong-dong, and shop for electronics at the bustling Akihabara neighborhood. Seoul is a city that offers something for everyone and is a <span className='text-primary-700 font-bold'>must-visit</span> destination for anyone traveling to South Korea.</p>
            <a href="#" class=" mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            View more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
        </div>
        
    </div>
</section>
        </div>
    
    </>
  )
}

export default Explore;