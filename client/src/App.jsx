
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import About from './pages/About';
import Headers from './components/Header';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
  return (
  <BrowserRouter>
  <Headers/>
 <Routes>

<Route path="/" element={<Home/>} />
<Route path="/sign-in" element={<Signin/>} />
<Route path="/sign-up" element={<Signup/>} />
<Route path="/about" element={<About/>} />
<Route  element={< PrivateRoute />} >
  <Route path="/profile" element={<Profile/>} />
</Route>
 </Routes>
  
  </BrowserRouter>

  );
}
