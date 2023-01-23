import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar';
import SignUp from './components/signup';
import Homepage from './pages/homepage';
import Register from './pages/register';


function App() {
  return (
    <>
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
