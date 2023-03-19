
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserCRUD from './Pages/Admin/UserCRUD';
import Homepage from './Pages/Homepage';
import SignUp from './Pages/SignUp';
import Protected from './Pages/Protected';
import SignIn from './Pages/SignIn';
import SuccessModal from './Components/SuccessModal';
import Landing from './Pages/ListPlace.jsx/landing'
import Explore from './Pages/Explore';
import Accomodation from './Pages/Accomodation/Accomodation';
import './App.css';
import AdminRoute from './Components/AdminComponents/AdminRoute';
import Sucsacc from './Components/Sucsacc';
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
            <Route path='/successreg' element={<SuccessModal/>} />
            <Route path='/login' element={<SignIn/>} />
            <Route path='/accreation' element={<Sucsacc/>} />
            <Route path='/explore' element={<Explore/>} />
          <Route element={<AdminRoute/>}>
            <Route path='/adashboard' element={<AdminDashboard/>} />
            <Route path='/adashboard/user' element={<UserCRUD/>} />
          </Route>
            <Route path='/protected' element={<Protected/>}/>
            <Route path='/addlisting' element={<Landing/>}/>
            <Route path='/addaccomodation' element={<Accomodation/>}/>
          </Routes>
        </div>
      </Router>
      
      </QueryClientProvider>
    </>
  )
}

export default App
