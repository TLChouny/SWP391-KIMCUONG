import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prelogin from "./Components/Prelogin/Prelogin";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import HomeAdmin from './Components/HomeAdmin/HomeAdmin';
import QuanLyKhachHang from './Components/QuanLyKhachHang/QuanLyKhachHang';
import QuanLySanPham from './Components/QuanLySanPham/QuanLySanPham';
import QuanLyDonHang from './Components/QuanLyDonHang/QuanLyDonHang';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/prelogin' element={<Prelogin/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Header' element={<Header/>}/>
          <Route path='/HomeAdmin' element={<HomeAdmin/>}/>
          <Route path='/QuanLyKhachHang' element={<QuanLyKhachHang/>}/>
          <Route path='/QuanLySanPham' element={<QuanLySanPham/>}/>
          <Route path='/QuanLyDonHang' element={<QuanLyDonHang/>}/>


        </Routes>
      </>
    </Router>
  );
}

export default App;
