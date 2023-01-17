import React from 'react'
import { Link } from 'react-router-dom';
import { BiBellMinus} from 'react-icons/bi'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SignUp from './signup';

const Navbar = () => {
  return (
    <div className='text-white flex justify-between max-w-[1240px] mx-auto px-4 items-center h-24 '>
        <h1 className='w-full font-bold text-3xl text-black'><Link to='/'>TakeaTrip</Link></h1>
        <ul className='flex text-black font-semibold  pr-8  items-center'>
            <li className='p-3'>Support</li>
            <li className='p-3'>Trips</li>
            <li className='p-3'><span className='flex mx-auto'><BiBellMinus/></span></li>
            <li className='p-3'><SignUp/></li>
            
        </ul>
    </div>
  )
}

export default Navbar