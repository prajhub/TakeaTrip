import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar';
import SignUp from './components/signup';
import Homepage from './pages/homepage';
import Register from './pages/register';
import SignIn from './pages/SignIn';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
