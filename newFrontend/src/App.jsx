
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';

import Homepage from './Pages/Homepage';
import SignUp from './Pages/SignUp';
import Protected from './Pages/Protected';
import SignIn from './Pages/SignIn';
import './App.css';
import Sucsacc from './Components/sucsacc';
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
            <Route path='/protected' element={<Protected/>}/>
          </Routes>
        </div>
      </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
