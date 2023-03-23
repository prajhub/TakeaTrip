import React from 'react'
import { setLogOut } from '../../Features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import { Button } from '@chakra-ui/react'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const ProfileMenu = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector((state) => state.auth.userInfo)
    const { role } = userInfo
    
  

    const handleLogout = (e) => {
        e.preventDefault()
      
        dispatch(setLogOut())
        
        navigate('/')
      }

const handleAdminDashboard = (e) => {

  e.preventDefault()
  navigate('/adashboard')
}

  return (
   <>
   
   <Menu>
  <MenuButton >
    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </MenuButton>
  <MenuList  >
      <MenuItem>Profile Settings</MenuItem>
          {role === "Admin" ? 

      
            <MenuItem onClick={handleAdminDashboard}>Dashboard</MenuItem> :  <MenuItem>Land</MenuItem>  
      
          }
          <MenuItem>Sign Out</MenuItem>
  </MenuList>
</Menu>
   
   </>
  )
}

export default ProfileMenu