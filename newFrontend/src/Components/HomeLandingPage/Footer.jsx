import React from 'react'
import MainLogo from '../../assets/mainlogo.png'



const Footer = () => {
  return (
    <>
    
    <div className="bg-[#faf1ed]">
        


            <div className="mx-auto max-w-screen-xl  px-4 py-6">
            <footer class=" ">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Company</h2>
            <ul class="text-gray-500  font-medium">
                <li class="mb-4">
                    <a href="#" class=" hover:underline">About</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Careers</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Brand Center</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Help center</h2>
            <ul class="text-gray-500  font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Discord Server</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Twitter</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Facebook</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Contact Us</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
            <ul class="text-gray-500  font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Licensing</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Download</h2>
            <ul class="text-gray-500 font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline">iOS</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Android</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">Windows</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline">MacOS</a>
                </li>
            </ul>
        </div>
    </div>
    
    </div>
</footer>
                <div className="grid grid-cols-12 text-gray-800">
                    <div className="col-span-12 lg:col-span-8 space-y-2 text-dark">
                        <div className="flex space-x-3">
                            <img src={MainLogo} alt="" className="h-10 w-10" />
                            <div className="w-fit">
                                <p className="text-xs">
                                    © 2023 TripAdvisor LLC All rights reserved.
                                </p>
                                <div className="flex flex-wrap">
                                    {["Terms of Use", "Privacy and Cookies Statement", "Cookie consent", "Site Map", "How the site works"].map((item, i) => (
                                        <a key={i} href="#" className="text-[0.8em] md:text-sm font-bold underline mr-2">
                                            { item }
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-[0.7em] md:text-xs w-full space-y-3">
                            <p>
                                This is the version of our website addressed to speakers of English in the United States. If you are a resident of another country or region, please select the appropriate version of TravelAdvisor for your country or region in the drop-down menu.
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-span-8">

                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Footer