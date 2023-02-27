import { useRef, useState,  useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainLogo from '../assets/mainlogo.png'

import { useDispatch } from 'react-redux'
import { setLogin } from '../Features/auth/authSlice'
import { useLoginMutation } from '../Features/auth/authApiSlice'



const SignIn = () => {

  

  
 

  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const errClass = errMsg ? "errmsg" : "offscreen"

  if(isLoading) return <p>Loading...</p>


  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

   const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password}).unwrap()
      dispatch(setLogin({ accessToken }))
      console.log(accessToken)
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      if(!error.status){
        setErrMsg('No server response');
      } else if (error.status === 400) {
        setErrMsg('Missing email or password')
      } else if (error.status === 401) {
        setErrMsg('Unauthored')
      } else {
        setErrMsg(error.data?.message)
      }
      errRef.current.focus()
    }
   }




  // const [navigate, setNavigate] = useState(false)

  // const mainData = {
  //   email,
  //   password,
  // }



//   const {mutate, data} = useMutation(
//     userData => axios.post('http://localhost:5000/auth', userData ),
//     {
//       onSuccess: () => {
        
//           console.log(data)
//           // dispatch(
//           //   setLogin({
//           //     user: data.data.sameUser,
//           //     token: data.data.accessToken        
//           //   })
//           // )

//           // navigate('/')

//       }
//     }
// )

// const handleSubmit = (e) => {
//   e.preventDefault()
//   mutate(mainData)
//   console.log(mainData)
// }

// if(navigate) {
//   return <Navigate to='/'/>
// }






  return (
    <div class="flex   min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8 px-6 py-8 rounded shadow-md items-center"> 
    <div>
      <img class="mx-auto h-12 w-auto" src={MainLogo} alt="Your Company"/>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a href="#" class=" ml-1 font-medium text-primary-600 hover:text-primary-500">Create One</a>
      </p>
    </div>
    <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
    <form class="mt-8 space-y-6" onSubmit={handleSubmit}  >
      <input type="hidden" name="remember" value="true"/>
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address"   value={email} name="email" type="email" ref={userRef} onChange={handleUserInput} autoComplete='off' required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password"  type="password" value={password} onChange={handlePwdInput}    required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" placeholder="Password"/>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-primary-600 hover:text-primary-500">Forgot your password?</a>
        </div>
      </div>

      <div>
        <button    class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
         
            <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
        
      </div>
    </form>
  </div>
</div>
  )
}

export default SignIn