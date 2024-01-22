
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import About from './pages/About'
import Headers from './components/Header'


export default function App() {
  return <BrowserRouter>
  <Headers/>
 <Routes>

<Route path="/" element={<Home/>} />
<Route path="/about" element={<About/>} />
<Route path="/profile" element={<Profile/>} />
<Route path="/sign-in" element={<Signin/>} />
<Route path="/sign-up" element={<Signup/>} />


 </Routes>
  
  </BrowserRouter>
}
