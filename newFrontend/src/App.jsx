
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserCRUD from './Pages/Admin/UserCRUD';
import Homepage from './Pages/LandingPage/Homepage';
import SignUp from './Pages/UserAuthentication/SignUp';

import SignIn from './Pages/UserAuthentication/SignIn';
import Landing from './Pages/ListPlace.jsx/landing'
import Explore from './Pages/LocationDisplay/Country/Explore';

import './App.css';
import AdminRoute from './Components/AdminComponents/AdminRoute';

import Sucsacc from './Components/InfoModals/Sucsacc';
const queryClient = new QueryClient();





function App() {
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Router>
        <div >
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/register' element={<SignUp/>} />
            
            <Route path='/login' element={<SignIn/>} />
            <Route path='/accreation' element={<Sucsacc/>} />
            <Route path='/explore' element={<Explore/>} />
          <Route element={<AdminRoute/>}>
            <Route path='/adashboard' element={<AdminDashboard/>} />
            <Route path='/adashboard/user' element={<UserCRUD/>} />
          </Route>
        
            <Route path='/addlisting' element={<Landing/>}/>
            
          
          </Routes>
        </div>
      </Router>
      
      </QueryClientProvider>
    </>
  )
}

export default App
