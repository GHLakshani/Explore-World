import React, { useState, useEffect } from 'react';
import logo from '../../Images/logo.png';
import '../navbar/NabBar.css'; // Import CSS file for styling
import { jwtDecode } from "jwt-decode";


const Navigation = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Function to check if JWT token exists in local storage or cookies
        const checkToken = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                try {
                    // Decode the token
                    const decodedToken = jwtDecode(token);
                    // Check if the token is expired
                    const currentTime = Date.now() / 1000; // in seconds
                    if (decodedToken.exp < currentTime) {
                        // Token is expired
                        setLoggedIn(false);
                        // Optionally, you can remove the expired token from local storage
                        localStorage.removeItem('jwtToken');
                    } else {
                        // Token is valid
                        setLoggedIn(true);
                    }
                } catch (error) {
                    // Handle decoding error
                    console.error('Error decoding token:', error);
                    setLoggedIn(false);
                }
            } else {
                // Token is not present, consider the user logged out
                setLoggedIn(false);
            }
        };

        // Call the function to check JWT token when the component mounts
        checkToken();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div className="navbar-container">          
            <div className="navbar-logo">
                <a href="/">
                    <img src={logo} className="logo-img" alt="logo" />
                </a>
            </div>
            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/blog-listing">All Blogs</a>
                {loggedIn ? (
                    <a href="/myaccount">My Account</a>
                ) : (
                    <>
                        <a href="/signup">Sign Up</a>
                        <a href="/login">Sign In</a> 
                    </>
                )}
            </div>           
        </div>
    );
}

export default Navigation;
