import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        console.log(email,password)
        axios.post("http://localhost:5000/api/user/login", {email, password}).then(user => {
            console.log(user)
            localStorage.setItem('token', user.data.token)
        }).catch(err => console.log(err))
    }

  return (
    <div>
        <input type='text' placeholder='Enter Email' value={email} onChange={event => setEmail (event.target.value)}/>
        <input type='password' placeholder='Enter Password' value={password} onChange={event => setPassword(event.target.value)}/>
        <button onClick={submit}>Log IN</button>
    </div>
  )
}

export default Login