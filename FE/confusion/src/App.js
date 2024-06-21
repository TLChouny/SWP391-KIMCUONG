import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prelogin from "./Components/Prelogin/Prelogin";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Homepage from "./Components/Homepage/Homepage"
import ManageAccount from "./Components/Admin/ManageAccount"
import ManageProduct from './Components/Manager/ManageProduct';
import Contact from './Components/Contact/Contact';
import Header from './Components/Header/Header';
import Menuheader from './Components/Menu/Menuheader';
import Footer from './Components/Footer/Footer';
import Homepagelogin from './Components/Homepagelogin/Homepagelogin';
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Prelogin' element={<Prelogin />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Admin' element={<ManageAccount />} />
          <Route path='/Manager' element={<ManageProduct />} />
          <Route path='/contact' element={<><Header /><Menuheader /><Contact /><Footer /></>} />
          < Route path='/homepagelogin' element={<Homepagelogin />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
