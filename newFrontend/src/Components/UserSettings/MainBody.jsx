import React from 'react'
import { Avatar } from 'antd'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill, BsGlobe } from 'react-icons/bs'
import { useGetUserDetailsQuery } from '../../Features/api/apiSlice'
// import { useUserLoginMutation } from '../../Features/api/apiSlice'

const MainBody = () => {

  const { data, isLoading, error, isFetching } = useGetUserDetailsQuery()
  console.log(data)

  


  
  return (
    <>

    
    
    <div class="pl-0 md:pl-64 transition-all" id="main">
        <div className='p-6 mt-4 border-b shadow-sm'>
            <h1 className='font-open-san text-3xl font-semibold'>My profile</h1>
        </div>
        
        <section className='bg-gray-200 w-full h-screen flex flex-col'>

          {/* Profile Card */}

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
                <div className='flex flex-col '>
                  <h1 className="text-2xl font-bold">Prajwal Magar</h1>
             
                  <p className="text-gray-500 mt-4 text-sm flex items-center"><MdEmail className='mr-1'/> prajwalmagar@example.com</p>
                  <p className="text-gray-500 mt-4 text-sm flex items-center"><BsFillTelephoneFill className='mr-1'/>: 123-456-7890</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <ul className="">
                <li className='flex items-center'><BsGlobe className='mr-1'/> English (US)</li>
                <li className='ml-5'>English (US)</li>
              </ul>

              <button onClick={() => {
                
              }}>submit</button>
            </div>
          </div>           

            </div>
        {/* Profile Card */}


        {/* Property Section*/}
        <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7  border-gray-200 rounded-lg shadow ">

              <div className='flex flex-col'>

          
                  <div>
                    <h2 className='font-open-san text-xl font-semibold p-4'>My properties</h2>
                  </div>

                  {/* Table Body */}

                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" class="px-6 py-3">
                    Property
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>

        <tbody>
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
              
              <div className="pl-3">
                <div className="text-base font-semibold">Hotel del luna</div>
                <div className="font-normal text-gray-500">chowk</div>
              </div>
            </th>
            <td className="px-6 py-4">
              <p>Owner</p>
            </td>
        </tr>
        </tbody>
        
    </table>
                  

              </div>
        </div>




        </section>
    </div>


    </>
  )
}

export default MainBody