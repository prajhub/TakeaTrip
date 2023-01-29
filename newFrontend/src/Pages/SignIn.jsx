import { useRef, useState} from 'react'
import { useMutation } from 'react-query';
import axios from 'axios';
import { Navigate } from 'react-router';



const SignIn = () => {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false);


  const {mutate} = useMutation(
    userData => axios.post('http://localhost:5000/auth', userData ),
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
    e.preventDefault();

    const userData = {email, password }
    mutate(userData)
  }


  return (
    <div>
      <div className='flex flex-col mx-auto items-center'>
        <div className='mt-2'>
          <h1 className='text-3xl font-bold'>TakeaTrip</h1>
        </div>
        <form onSubmit={onSubmit}>
            <input type='text' value={email} placeholder='Enter your email' onChange={e => setEmail(e.target.value)}/>
            <input type='password' value={password} placeholder='Enter your password' onChange={e => setPassword(e.target.value)}/>
            <button>Sign In</button>
        </form>
        </div>
    </div>
  )
}

export default SignIn