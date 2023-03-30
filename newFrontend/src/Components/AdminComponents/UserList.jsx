import React, { useState } from 'react'
import EditUserModal from './EditUserModal'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'




const UserList = ({ users }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [editingUser, setEditingUser] = useState(null)
  

  const handleEditUser = (user) => {
    console.log(user)
  }

  return (
    <>
      <tbody>
        {users?.map(user => (
          <tr key={user._id} className="bg-white border-b hover:bg-gray-50 ">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input id={`checkbox-table-search-${user.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={`checkbox-table-search-${user.id}`} className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <img className="w-10 h-10 rounded-full" src='https://bit.ly/prosper-baba' alt={user.name} />
              <div className="pl-3">
                <div className="text-base font-semibold">{user.firstName} {user.lastName}</div>
                <div className="font-normal text-gray-500">{user.email}</div>
              </div>  
            </th>
            <td className="px-6 py-4">
              {user.jobTitle}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-300'} mr-2`}></div> {user.online ? 'Online' : 'Offline'}
              </div>
            </td>
            <td className="px-6 py-4">
            <button type="button" onClick={() => handleEditUser(user)}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    Edit user
                                </button>
                               
                                
                                <button type="button" data-modal-toggle="delete-user-modal" className="inline-flex items-center px-3 ml-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                    <svg className="w-4 h-4 mr-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete user
                                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )
}

export default UserList
