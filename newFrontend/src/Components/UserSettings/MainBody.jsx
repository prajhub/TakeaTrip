import React, { useState, useEffect } from 'react'
import { Avatar } from 'antd'
import { MdEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../Features/auth/updateAction'
import PropertyDisplayTable from './PropertyDisplayTable'
import Error from '../Reusables/Error'
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
import { useGetUserProfileQuery, useUserLoginMutation } from '../../Features/api/apiSlice'
// import { useUserLoginMutation } from '../../Features/api/apiSlice'


const MainBody = () => {

  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure()

  

  const { data,  isFetching } = useGetUserProfileQuery('userDetails', {
    pollingInterval: 2000, //1 secs
  })


  const passId = data.id

  

  //States for Edit user Modal

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNum, setPhoneNum] = useState('');


  const {success, loading, error } = useSelector((state) => state.auth)

  const handleUpdate = (e) => {
    e.preventDefault()

    dispatch(updateUser({ firstName, lastName, email,  id: passId, currentPassword: password }))
    onClose()
  }


  useEffect(() => {
    if (success) {
      onClose()
    }
  }, [success])

  
  
  return (
    <>

<div class="pl-0 md:pl-64 " >
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
                  {data.firstName[0]}{data.lastName[0]}
                </Avatar>
                <div className='flex flex-col '>
                  <h1 className="text-2xl font-bold">{data.firstName} {data.lastName}</h1>
             
                  <p className="text-gray-500 mt-4 text-sm flex items-center"><MdEmail className='mr-1'/>{data.email}</p>
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
          <Button  type="button"  colorScheme='lime' onClick={onOpen} className="text-white mt-20 ml-10 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Edit Profile</Button>

          {/* Edit User Modal*/}
              <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <section>
                    <form>
                  <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                        <input type="text" name="firstName" id="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " placeholder={data.firstName}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                        <input type="text" name="lastName" id="name" value={lastName} onChange={(e) => setLastName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={data.lastName}/>
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={data.email}/>
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                        <input type="number" value={phoneNum} name="phoneNumber" id="phoneNumber" onChange={(e) => setPhoneNum(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " />
                    </div>
                    
                    <div className="sm:col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <textarea id="description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  " placeholder="Write a description..."></textarea>                    
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button type="submit" onClick={handleUpdate} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Update 
                    </button>
                    
                </div>
                </form>
                  </section>
               
              </ModalBody>

              
            </ModalContent>
          </Modal>
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
                  <PropertyDisplayTable id={passId}/>
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