import { useRef, useState } from 'react';
import { useMutation } from 'react-query';

import React from 'react';

import { Navigate } from 'react-router';
import axios from 'axios';


const SignUp = () => {

const [email, setEmail] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const [password, setPassword] = useState('');
const [navigate, setNavigate] = useState(false);


const {mutate} = useMutation(
    userData => axios.post('http://localhost:5000/register', userData ),
    {
      onSuccess: () => {
        setNavigate(true)
      }
    }
)

if(navigate) {
  return <Navigate to='/'/>
}



const onSubmit = (e) => {
  e.preventDefault()
  const userData = { firstName, lastName, email, password }
  mutate(userData)
}

  return (
    <div>
      <h1 className='font-bold text-3xl text-center'>Sign Up</h1>

      <form onSubmit={onSubmit}>
        <input value={firstName} type='text' placeholder='Enter your First Name' onChange={e => setFirstName(e.target.value)}/>
        <input value={lastName} type='text' placeholder='Enter your Last Name' onChange={e => setLastName(e.target.value)}/>
        <input value={email} type='text' placeholder='Enter your email' onChange={e => setEmail(e.target.value)}/>
        <input type='password' value={password} placeholder='Enter your password' onChange={e => setPassword(e.target.value)}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp;