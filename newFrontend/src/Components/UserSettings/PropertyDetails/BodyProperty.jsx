import React, { useState, useEffect } from 'react'
import { Avatar } from 'antd'
import { MdEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BsFillTelephoneFill, BsGlobe } from 'react-icons/bs'




const BodyProperty = () => {

 

  const { isOpen, onOpen, onClose } = useDisclosure()

  

 



  




  
  
  
  return (
    <>

<div class="pl-0 md:pl-64 " >
        
        
        <section className='bg-gray-200 w-full h-screen flex flex-col'>

          {/* Profile Card */}

            <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7 mt-20  border-gray-200 rounded-lg shadow ">

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
                 
                </Avatar>
                <div className='flex flex-col '>
                  <h1 className="text-2xl font-bold"></h1>
             
                  <p className="text-gray-500 mt-4 text-sm flex items-center"><MdEmail className='mr-1'/></p>
                  <p className="text-gray-500 mt-4 text-sm flex items-center"><BsFillTelephoneFill className='mr-1'/>: 123-456-7890</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <ul className="">
                <li className='flex items-center'><BsGlobe className='mr-1'/> English (US)</li>
                <li className='ml-5'>English (US)</li>
              </ul>

              
            </div>
            
          </div>           
         
            </div>
        {/* Profile Card */}





        </section>
    </div>
    
   


    </>
  )
}

export default BodyProperty