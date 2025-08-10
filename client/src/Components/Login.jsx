import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './explore_world.css'; // Import your global styles
import Navigation from './navbar/Navigation';

const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);  // New state to track successful login
  const navigate = useNavigate();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
      setError('');  // Reset error on change
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:3001/login', formData)
          .then(res => {
              localStorage.setItem('jwtToken', res.data.token);

              const decodedToken = jwtDecode(res.data.token);  // Decode the token
              const userRole = decodedToken.role;  // Extract the role

              console.log('Login successful');
              setError('');
              setSuccess(true);

              // Check the role and navigate accordingly
              switch (userRole) {  // Change this line to use userRole
                  case 'admin':
                      navigate('/getAll');
                      break;
                  case 'user':
                      navigate('/myaccount');
                      break;
                  default:
                      console.error('Unknown role');
                      setError('Invalid role');
              }
          });
      } catch (err) {
          console.error('Login failed', err.response.data);
          setError(err.response.data.message);
          setSuccess(false);
      }
  };

  return (
    <div className="login-container"> 
        <Navigation/>
        <div className="container py-2 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" alt="Loginimage" className="img-fluid" />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {success && <p style={{ color: 'green' }}>Login successful!</p>}  {/* Display success message */}
                      <form onSubmit={handleSubmit}>
                        
                        <h5 className="fw-normal mb-3 pb-3 text-center">Sign into your account</h5>
                        <div className="form-outline mb-4">
                          <input type="email" id="email" name="email" placeholder="exploreWorld@gmail.com" className="form-control form-control-lg" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="password" name="password" placeholder="************" className="form-control form-control-lg" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block card_button" type="submit">Login</button>
                        </div>
                        <p className="mb-5 pb-lg-2">Don't have an account? <Link to="/signup">Register here</Link></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;
