import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import PoliciesPage from './pages/PoliciesPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProfileInfo from './pages/ProfileInfo';
import EditProfile from './pages/EditProfile';
import CheckoutPage from './pages/CheckoutPage';
import Claim from './pages/claim'
import Home from './pages/Home';
import Compare from './pages/compare';
import Footer from './component/Footer';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ProfileInfo" element={<ProfileInfo />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/CheckoutPage/:policyId" element={<CheckoutPage />} />
        <Route path="/claim/:id" element={<Claim />} />
        <Route path="/PoliciesPage" element={<PoliciesPage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>
     <Footer/>
    </BrowserRouter>
  );
};

export default App;
