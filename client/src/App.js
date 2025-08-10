import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import LandingPage from './Components/LandingPage';
import Login from './Components/Login'; // Import the Login component
import SignUp from './Components/SignUp';
import MyAccount from './Components/MyAccount';
import BlogDetails from './Components/BlogDetails';
import BlogListing from './Components/BlogListing';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog-listing" element={<BlogListing/>} />
          <Route path="/blog-detail/:id" element={<BlogDetails/>} />   
          {/* <Route path="/about-us" element={<BlogDetails/>} />   
          <Route path="/contact-us" element={<BlogDetails/>} />    */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myaccount" element={<MyAccount/>} />          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
