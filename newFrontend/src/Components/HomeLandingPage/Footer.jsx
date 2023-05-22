import React from 'react'
import MainLogo from '../../assets/mainlogo.png'



const Footer = () => {
  return (
    <>
    
    <footer class="bg-[#faf1ed] rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0">
                <img src={MainLogo} class="h-8 mr-3" alt="Takeatrip logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap ">Takeatrip</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/" class="mr-4 hover:underline md:mr-6 ">Home</a>
                </li>
                <li>
                    <a href="/stays" class="mr-4 hover:underline md:mr-6">View Hotels</a>
                </li>
                <li>
                    <a href="/addlisting" class="mr-4 hover:underline md:mr-6 ">List Property</a>
                </li>
                
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto " />
        <span class="block text-sm text-gray-500 sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">Takeatrip™</a>. All Rights Reserved.</span>
    </div>
</footer>

    </>
  )
}

export default Footer