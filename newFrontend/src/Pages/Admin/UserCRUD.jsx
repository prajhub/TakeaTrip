import React from 'react'
import NavBar from '../../Components/AdminComponents/NavBar'
import SideBar from '../../Components/AdminComponents/SideBar'
import User from '../../Components/AdminComponents/User'

const UserCRUD = () => {
  return (
    <>
    
    <NavBar/>
    <SideBar/>
    <div class="p- mt-14 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  dark:border-gray-700">
                <User/>
             </div>
         </div>

    
</>
  )
}

export default UserCRUD