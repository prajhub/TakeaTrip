
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserCRUD from './Pages/Admin/UserCRUD';
import Homepage from './Pages/LandingPage/Homepage';
import SignUp from './Pages/UserAuthentication/SignUp';
import Onboarding from './Pages/ListService/Onboarding/Onboarding';
import SignIn from './Pages/UserAuthentication/SignIn';
import Landing from './Pages/ListPlace.jsx/landing'
import Explore from './Pages/LocationDisplay/Country/Explore';
import AddAccommodation from './Pages/AddAcccommodation/AddAccommodation';
import UserProfileMain from './Pages/UserSettings/MainPage'
import './App.css';
import AdminRoute from './Protection/AdminRoute';
import UseRoute from './Protection/UserRoute';
import StaysLandingPage from './Pages/StaysLanding/StaysLandingPage';
import Sucsacc from './Components/InfoModals/Sucsacc';
import StaysSearched from './Pages/StaysSearched/StaysSearched'
import Accommodation from './Pages/AccommodationDisplay/Accommodation';
import ListService from './Pages/ListService/ListService';
import ThingsToDo from './Pages/ThingsToDo/thingsToDo';
import MainPropertyDetails from './Pages/UserSettings/PropertyDetails.jsx/Main';
import EmailVerify from './Components/Reusables/EmailVerify';
import CreateRoom from './Pages/UserSettings/PropertyDetails.jsx/CreateRoom/CreateRoom';
import FoodService from './Pages/ListFoodService/FoodService';
import FoodServiceDisplay from './Pages/FoodServiceDisplay/FoodService';
import ServiceDisplay from './Pages/ServiceDisplay/Service'


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
            <Route path='/users/:id/verify/:token' element={<EmailVerify/>} />
            <Route path='/login' element={<SignIn/>} />
            <Route path='/accreation' element={<Sucsacc/>} />
            <Route path='/explore' element={<Explore/>} />
          <Route element={<AdminRoute/>}>
            <Route path='/adashboard' element={<AdminDashboard/>} />
            <Route path='/adashboard/user' element={<UserCRUD/>} />
          </Route>
          <Route element={<UseRoute/>}>
            <Route path='/addaccommodation' element={<AddAccommodation/>}/>
            <Route path='/addlisting' element={<Landing/>}/>
            <Route path='/listservice' element={<ListService/>}/>
            <Route path='/listonboarding' element={<Onboarding/>}/>
            <Route path='/attractions' element={<ThingsToDo/>}/>
            <Route path='/stays' element={<StaysLandingPage/>}/>
            <Route path='/account/properties' element={<MainPropertyDetails/>}/>
            <Route path='/hotels' element={<StaysSearched/>}/>
            <Route path='/listfoodservice' element={<FoodService/>}/>
            <Route path='/account/properties/:accommodationId/createRoom' element={<CreateRoom/>}/>
            <Route path='/accommodation/:id' element={<Accommodation/>}/>
            <Route path='/foodservice/:id' element={<FoodServiceDisplay/>}/>
            <Route path='/service/:id' element={<ServiceDisplay/>}/>
            <Route path='/account' element={<UserProfileMain/>}/>
          </Route>
          
          </Routes>
        </div>
      </Router>
      
      </QueryClientProvider>
    </>
  )
}

export default App
