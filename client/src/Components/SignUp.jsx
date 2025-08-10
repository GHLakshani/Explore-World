import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

// import logo from '../Images/logo.png';
import './explore_world.css'; // Import your global styles
import Navigation from './navbar/Navigation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { password, confirmPassword } = formData;

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
      setError('');  // Reset error on change
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:3001/signup', formData);
        console.log(response.data); // Assuming the server responds with a message
        // Reset form after successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setError('');  // Reset error on success
        navigate('/login');  // Redirect to login page
      } catch (error) {
        console.error('Registration failed', error.response.data);
        setError(error.response.data.message);  // Set error message
      }
    }
    else{
      setError("Password does not matched");  // Set error message
    }
  };

 

  return (
    <div>
        <Navigation/>
        <div className="container py-2 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">                  
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <h5 className="fw-normal mb-3 pb-3 text-center">Sign Up Here</h5>
                            <div className="form-outline mb-4">
                              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="form-control form-control-lg" />
                            </div>
                            <div className="form-outline mb-4">
                              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="form-control form-control-lg" />
                            </div>
                            <div className="form-outline mb-4">
                              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-control form-control-lg" />
                            </div>
                            <div className="form-outline mb-4">
                              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" className="form-control form-control-lg" />
                            </div>
                            <div className="d-flex justify-content-center">
                              <button type="submit" className="btn btn-dark btn-lg btn-block card_button">Register</button>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login">Login here</Link></p>

                        </form>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" alt="Loginimage" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default SignUp;
