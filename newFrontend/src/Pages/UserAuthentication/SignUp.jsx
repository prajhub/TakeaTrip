import React, { useState, useEffect, useCallback } from 'react'
import { Formik, Form } from 'formik';
import { TextField } from '../../Components/FormInputs/TextField';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { userRegister } from '../../Features/auth/registerAction';
import {setClearSuccess} from '../../Features/auth/authSlice'
import { handleSuccess } from '../../Components/Reusables/SuccessMessage';

const SignUp = () => {


const [navigate, setNavigate] = useState(false)

const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
 console.log(firstName, lastName, email, password)

const dispatch = useDispatch()

if(navigate) {
  return <Navigate to='/accreation'/>
}



  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    
  })

  const { registerMsg } = useSelector((state)=> state.auth)
      const { success } = useSelector((state)=> state.auth)
      console.log(registerMsg)



      useEffect(() => {
        if(success) {
        handleSuccess(success, registerMsg);
        dispatch(setClearSuccess());

        }

      }, [success, registerMsg, dispatch]);

     
    

  return (
    <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      
    }}
    validationSchema={validate}
    onSubmit={values => {
      const userData = values
      
      dispatch(userRegister(userData))

      

      // dispatch(userRegister({))
      
    }}

    
  >
    {formik => (
      <div class="bg-gray-100 min-h-screen flex flex-col">
      
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white  px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-4 font-bold text-3xl">Create an Account</h1>
        <Form>
          <TextField label="First Name" name="firstName" type="text" />
          <TextField label="Last Name" name="lastName" type="text" />
          <TextField label="Email" name="email" type="email" />
          <TextField label="Password" name="password" type="password" />
         
          <button type="submit" class="text-white w-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
          
        </Form>
        <div class="text-center text-gray-600 text-xs text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class=" ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class=" ml-1 no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
        </div>
        </div>
      </div>
    )}
  </Formik>
  )
}

export default SignUp