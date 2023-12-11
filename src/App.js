import './App.css';
import React from 'react'
import MasterLayout from './template/layout/MasterLayout';
import Login from './template/pages/Login/Login'
import Home from './template/pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import About from './template/pages/About/About';
import Contact from './template/pages/Contact/Contact';
import Signin from './template/pages/Signin/Signin';
import VerifyEmail from './service/VerifyEmail';
import Profile from './template/pages/Profile/Profile';
import Shop from './template/pages/Shop/Shop';
import Cart from './template/pages/Cart/Cart';
import Detail from './template/pages/Detail/Detail';
import ForgotPassword from './template/pages/ForgotPassword/ForgotPassword';
import SetNewPassword from './service/SetNewPassword'
// import CreateProduct from './template/pages/CreateProduct/CreateProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MasterLayout Page={<Home />} />} />
        <Route path='/about' element={<MasterLayout Page={<About />} />} />
        <Route path='/shop' element={<MasterLayout Page={<Shop />} />} />
        <Route path='/contact' element={<MasterLayout Page={<Contact />} />} />
        <Route path='/login' element={<MasterLayout Page={<Login />} />} />
        <Route path='/signup' element={<MasterLayout Page={<Signin />} />} />
        <Route path='/verifyEmail' element={<MasterLayout Page={<VerifyEmail />} />} />
        <Route path='/profile' element={<MasterLayout Page={<Profile />} />} />
        <Route path='/cart' element={<MasterLayout Page={<Cart />} />} />
        <Route path='/detail/:id' element={<MasterLayout Page={<Detail />} />} />
        <Route path='redirect/setnewpassword' element={<MasterLayout Page={<SetNewPassword />} />} />
        <Route path='/forgotPassword' element={<MasterLayout Page={<ForgotPassword />} />} />
        {/* <Route path='/admin/createproduct' element={<MasterLayout Page={<CreateProduct />} />} /> */}

      </Routes>
    </div>
  );
}

export default App;