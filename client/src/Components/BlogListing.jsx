import React, { useState, useEffect } from 'react';
import Navigation from './navbar/Navigation';
import Footer from './footer/Footer';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';

import './explore_world.css';

const BlogListing = () => {
    const [blogs, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Replace with your token retrieval logic
        
        // Set the Authorization header
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:3001/get-blog')
        .then(res => {
            console.log(res.data.data.blogs);
            if (res.data.status === 'success' && res.data.data.blogs) {
                setMessages(res.data.data.blogs);
            } else {
                setError('Unexpected response format from server');
            }
        })
        .catch(error => {
            if (error.response.data && error.response.data.blogs) {
                setError(error.response.data.blogs);
            } else {
                // If the error message is not in the expected format, use a generic error message
                setError('An error occurred while processing your request');
            }
        });
    }, []);

    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="row">
                {blogs.map((blog, index) => (     
                        <div className="col-3">
                        <Card className="mycard" style={{ maxWidth: "18rem" }}>
                            <Card.Img variant="top" src={ require(`../Images/blog_posts/${blog.imageUrl}`)} className="w-100" />
                            <Card.Body>
                                    <Card.Title>{blog.title  > 20 ? blog.title.substring(0, 20) + '...' : blog.title}</Card.Title>
                                    <Card.Text>
                                    {blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description}
                                    </Card.Text>
                                    <Link to={`/blog-detail/${blog._id}`}>
                                        <Button className="card_button">Read More</Button>
                                    </Link>
                                </Card.Body>
                        </Card>
                    </div>
                    ))}
                </div>
            </div>
            <br/>
            <Footer />
        </div>
    );
};

export default BlogListing;
