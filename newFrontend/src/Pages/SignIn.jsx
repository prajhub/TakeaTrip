import { useRef, useState} from 'react'

const SignIn = () => {
  return (
    <div>
        <form>
            <input type='text' placeholder='Enter your email'/>
            <input type='text' placeholder='Enter your password'/>
            <button>Sign In</button>
        </form>
    </div>
  )
}

export default SignIn