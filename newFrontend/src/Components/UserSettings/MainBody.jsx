import React from 'react'
import { Avatar } from 'antd'

const MainBody = () => {
  return (
    <>
    
    <div class="pl-0 md:pl-64 transition-all" id="main">
        <div className='p-6 mt-4 border-b shadow-sm'>
            <h1 className='font-open-san text-3xl font-semibold'>My profile</h1>
        </div>

        <section className='bg-gray-200 w-full h-screen flex'>
        <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7  border-gray-200 rounded-lg shadow ">

        <div className="grid grid-cols-5 gap-4 items-center">
        <div className="col-span-3">
          <div className="flex items-center space-x-6 ml-7">
            <Avatar
            size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
              }}
            >
              PM
            </Avatar>
            <div className='flex flex-col'>
              <h1 className="text-2xl font-bold">Prajwal Magar</h1>
              <p className="text-gray-500">Email: prajwalmagar@example.com</p>
              <p className="text-gray-500">Phone: 123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <ul className="list-disc">
            <li>Written: English (US)</li>
            <li>Spoken: English (US)</li>
          </ul>
        </div>
      </div>           

        </div>
        </section>
    </div>


    </>
  )
}

export default MainBody