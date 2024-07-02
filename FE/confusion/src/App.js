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
import Albumlogin from './Components/Albumlogin/albumlogin';
import Contactlogin from './Components/Contaclogin/Contactlogin';
import Headerlogin from './Components/Headerlogin/Headerlogin';
import Menuheaderlogin from './Components/Menuheaderlogin/Menuheaderlogin';
import Product from "./Components/Productlist/Productlist";
import Albumlist from './Components/Album/Albumlist';
import Productlist from './Components/Productlist/Productlist';
import Braceletsproduct from './Components/Braceletsproduct/Braceletsproduct';
import Earringsproduct from './Components/Earringsproduct/Earringsproduct';
import Necklacesproduct from './Components/Necklacesproduct/Necklacesproduct';
import Ringsproduct from './Components/Ringsproduct/Ringsproduct';
import Braceletsproductmenu from './Components/Braceletsproductmenu/Braceletsproductmenu';
import ProductlistBrace from './Components/ProductlistBrace/ProductlistBrace';
import Earringsproductmenu from './Components/Earringsproductmenu/Earringsproductmenu';
import Necklacesproductmenu from './Components/Necklacesproductmenu/Necklacesproductmenu';
import Ringsproductmenu from './Components/Ringsproductmenu/Ringsproductmenu';
import Overviewhome from './Components/Overviewhomealbum/Overviewhome';
import Catalog from './Components/Catalog/Catalog';
import Catalogin from './Components/Catalogin/Catalogin';
import Braceletsproductmenulogin from './Components/Braceletsproductmenulogin/Braceletsproductmenulogin';
import Earringsproductmenulogin from './Components/Earringsproductmenulogin/Earringsproductmenulogin';
import Necklacesproductmenulogin from './Components/Necklacesproductmenulogin/Necklacesproductmenulogin';
import Ringsproductmenulogin from './Components/Ringsproductmenulogin/Ringsproductmenulogin';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
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
          <Route path='/homepagelogin' element={<Homepagelogin />} />
          <Route path='/contactlogin' element={<><Headerlogin /><Menuheaderlogin /><Contactlogin/><Footer /></>}/>
          <Route path='/Product' element={<Productlist/>}/>
          <Route path='/album' element={<Albumlist/>}/>
          <Route path='/album/Bracelet' element={<Braceletsproductmenu/>}/>
          <Route path='/album/Earring' element={<Earringsproductmenu/>}/>
          <Route path='/album/Necklace' element={<Necklacesproductmenu/>}/>
          <Route path='/album/Ring' element={<Ringsproductmenu/>}/> 
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/catalogin' element={<Catalogin/>}/>
          <Route path='/albumlogin' element={<Albumlogin/>}/>
          <Route path='/albumlogin/Bracelet' element={<Braceletsproductmenulogin/>}/>
          <Route path='/albumlogin/Earring' element={<Earringsproductmenulogin/>}/>
          <Route path='/albumlogin/Necklace' element={<Necklacesproductmenulogin/>}/>
          <Route path='/albumlogin/Ring' element={<Ringsproductmenulogin/>}/>
          <Route path="/productdetail/:productId" element={<><ProductDetail/></>} />
          <Route path='/cart' element={<Cart/>}/>
          {/* <Route path='/news' element={<News/>}/> */}
          <Route path='/payment' element={<Payment/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
