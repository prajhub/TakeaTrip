import React from 'react'

const SideBar = () => {
  return (
    <>
    
    <div className="fixed top-[70px] max-w-[1650px] mx-auto transition-all overflow-hidden left-0 w-64 bg-white border-r border-gray-200 bottom-0 sidebar-collapse z-40" id="sidebar">
        
        <div className="py-4 ">
           <ul className='flex flex-col'>
                <li>
                <a href="#" class="p-4 font-open-san text-lg flex items-center gap-4 hover:bg-blue-50">Home</a>
                </li>
                <li>
                <a href="#" class="p-4 flex font-open-san text-lg items-center gap-4 hover:bg-blue-50">Property Details</a>
                </li>
                <li>
                <a href="#" class="p-4 flex font-open-san text-lg items-center gap-4 hover:bg-blue-50">Payment</a>
                </li>
                <li>
                <a href="#" class="p-4 flex font-open-san text-lg items-center gap-4 hover:bg-blue-50">Payment</a>
                </li>
           </ul>
        </div>
    </div>
    
    </>
  )
}

export default SideBar