
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';

import Homepage from './Pages/Homepage';
import SignUp from './Pages/SignUp';

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
            
          </Routes>
        </div>
      </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
