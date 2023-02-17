import { useRef, useState, useContext} from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import Header from '../Components/header';
import MainLogo from '../assets/mainlogo.png'
import { setLogin } from '../state';


const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [navigate, setNavigate] = useState(false)

  const mainData = {
    email,
    password,
  }



  const {mutate, data} = useMutation(
    userData => axios.post('http://localhost:5000/auth', userData ),
    {
      onSuccess: () => {
        
          console.log(data)
          dispatch(
            setLogin({
              user: data.data.sameUser,
              token: data.data.accessToken        
            })
          )

          navigate('/')

      }
    }
)

const handleSubmit = (e) => {
  e.preventDefault()
  mutate(mainData)
  console.log(mainData)
}

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
    <form class="mt-8 space-y-6"  onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true"/>
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" onChange={(e) => setEmail(e.target.value)} value={email} name="email" type="email"  required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" value={password}  autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm" placeholder="Password"/>
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
        <button   class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
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