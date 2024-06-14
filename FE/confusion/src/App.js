import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Prelogin from "./Components/Prelogin/Prelogin";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"

function App() {
  return (
    <Router>
      <>
        <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/prelogin' element={<Prelogin/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/Register' element={<Register/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
