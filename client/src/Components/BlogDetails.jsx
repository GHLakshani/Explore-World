import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './navbar/Navigation';
import axios from 'axios';
import './explore_world.css';
// import BlogCardCarousel from './blogcard/BlogCardCarousel';
import Footer from './footer/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'; // Import Link from React Router


const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();
    const [otherblogs, setOtherBlog] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/get-blog-detail/${id}`)
        .then(res => {
            if (res.data.status === 'success' && res.data.data.blog) {
                setBlog(res.data.data.blog);
            } else {
                setError('Blog not found');
            }
        })
        .catch(err => {
            setError('An error occurred while fetching blog details');
        });       
        
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/get-other-blog/${id}`)
            .then(res => {
                console.log(res.data); // Log the response data
                if (res.data.status === 'success' && res.data.data.otherblogs) {
                    setOtherBlog(res.data.data.otherblogs);
                } else {
                    setError('Blog not found');
                }
            })
            .catch(err => {
                console.error(err); // Log any errors
                setError('An error occurred while fetching blog details');
            })
            .finally(() => {
                console.log(otherblogs); // Log the state after update
            });
    }, []);
    
    
    
    return (
        <div>
            <Navigation/>
            <div className="container mt-5">
                <div id="main-content" className="blog-page">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-lg-8 col-md-12 left-box">
                                <div className="blog_detail_card single_post">
                                {blog ? (
                                    <div className="body">
                                        <div className="img-post">
                                            <img className="d-block img-fluid" src={ require(`../Images/blog_posts/${blog.imageUrl}`)} alt="First slide" />
                                        </div>
                                        <h3>{blog.title}</h3>
                                        <p>{blog.description}</p>
                                    </div>   
                                    ) : (
                                        <p>{error}</p>
                                    )}                     
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-4 col-md-12 left-box">
                                <div className="blog_detail_card">
                                        <div className="header">
                                            <h5>Comments 3</h5>
                                        </div>
                                        <div className="body">
                                            <ul className="comment-reply list-unstyled">
                                                <li className="row clearfix">
                                                    <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Awesome_Image" /></div>
                                                    <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                                                        <h5 className="m-b-0">Alex Pierce</h5>
                                                        <p>Why are there so many tutorials on how to decouple WordPress? how fast and easy it is to get it running (and keep it running!) and its massive ecosystem. </p>
                                                        <ul className="list-inline">
                                                            <li>Mar 09 2018</li>
                                                        </ul>
                                                    </div>                                                    
                                                </li>
                                                <br />
                                                <li className="row clearfix">
                                                    <div className="icon-box col-md-2 col-4"><img className="img-fluid img-thumbnail" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Awesome_Image" /></div>
                                                    <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                                                        <h5 className="m-b-0">Peter Finley</h5>
                                                        <p>Great tutorial but few issues with it? If i try open post i get following errors. Please can you help me?</p>
                                                        <ul className="list-inline">
                                                            <li>Mar 12 2018</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <br />
                                            </ul>                                        
                                        </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container">
            <h3>More Blogs</h3>
                <div className="row">
                {otherblogs.slice(0,4).map((blog, index) => (
                    <div className="col-3">
                        <Card className="mycard" style={{ maxWidth: "18rem" }}>
                            <Card.Img variant="top" src={ require(`../Images/blog_posts/${blog.imageUrl}`)} className="w-100" />
                            <Card.Body>
                                <Card.Title>{blog.title  > 20 ? blog.title.substring(0, 20) + '...' : blog.title}</Card.Title>
                                <Card.Text>{blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description}</Card.Text>
                                <Button className="card_button">
                                  <Link to={`/blog-detail/${blog._id}`} style={{ color: '#a4b143', textDecoration: 'none' }}>Read More</Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    ))}
                                   
                </div>
            </div>        
                <br/>  
            <Footer/>
            
        </div>
    );
};

export default BlogDetails;
