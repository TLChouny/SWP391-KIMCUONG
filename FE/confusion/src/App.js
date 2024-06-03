import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
// import './App.css';
import Prelogin from "./Components/Prelogin/Prelogin";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
// import Home from "./Components/Home/Home"
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/prelogin' element={<Prelogin/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/Register' element={<Register/>}/>
          {/* <Route path='/Home' element={<Home/>}/> */}

        </Routes>
      </>
    </Router>
  );
}

export default App;
