import React from 'react'
import { BsArrowLeft} from 'react-icons/bs'
import SignUp from './registerForm'

const Register = () => {
  return (
    <div>
        <div className='flex  h-20   items-center'>
            <BsArrowLeft/>
            <h1 className='text-3xl text-bold mx-auto'>TakeaTrip</h1>
    
        </div>
        <SignUp/>
    </div>
  )
}

export default Register