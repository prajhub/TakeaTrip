import React from 'react'
import { setLogOut } from '../Features/auth/authSlice'
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
    const { roles } = userInfo
    
  

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
  <MenuButton as={Button} >
    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </MenuButton>
  <MenuList bg='brand.800'>
    <MenuGroup title='Profile' bg='brand.800'>
      <MenuItem>My Account</MenuItem>
      {roles === "Admin" ? 

      
      <MenuItem onClick={handleAdminDashboard}>Dashboard</MenuItem> :  <MenuItem>Land</MenuItem>  
      
      }
      
     
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title='Help' bg='brand.800'>
      <MenuItem>Docs</MenuItem>
      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
   
   </>
  )
}

export default ProfileMenu