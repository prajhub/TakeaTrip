
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserCRUD from './Pages/Admin/UserCRUD';
import Homepage from './Pages/Homepage';
import SignUp from './Pages/SignUp';
import Protected from './Pages/Protected';
import SignIn from './Pages/SignIn';
import SuccessModal from './Components/SuccessModal';
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
          <Route element={<AdminRoute/>}>
            <Route path='/adashboard' element={<AdminDashboard/>} />
            <Route path='/adashboard/user' element={<UserCRUD/>} />
          </Route>
            <Route path='/protected' element={<Protected/>}/>
          </Routes>
        </div>
      </Router>
      
      </QueryClientProvider>
    </>
  )
}

export default App
