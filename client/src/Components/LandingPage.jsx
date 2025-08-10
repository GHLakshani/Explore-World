// LandingPage.js
import React, { useState, useEffect }  from 'react';
import Navigation from './navbar/Navigation';
import Footer from './footer/Footer';
import { Link  } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import SLIDER_IMAGES from './CarouselImages';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { Person, CalendarDate, ChatDots } from 'react-bootstrap-icons'; // Import required icons

import axios from 'axios';

import ad_1 from '../Images/ad_1.jpg';

import './explore_world.css';

const LandingPage = () => {

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
      <Navigation/>
      {/* <Navbar /> */}
      <div className='af-height-50 af-max-width mx-auto '>
        <Carousel>
          <Carousel.Item>
            <img className='d-block w-100'  src={SLIDER_IMAGES[0].src} alt='First slide' style={{ height: '500px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <div className='af-position-lg af-bg-dark-transparent py-3'>
                <h3>{SLIDER_IMAGES[0].title}</h3>
                <p>{SLIDER_IMAGES[0].description}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src={SLIDER_IMAGES[1].src} alt='Third slide' style={{ height: '500px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <div className='af-position-lg af-bg-dark-transparent py-3'>
                <h3>{SLIDER_IMAGES[1].title}</h3>
                <p>{SLIDER_IMAGES[1].description}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src={SLIDER_IMAGES[2].src} alt='Third slide' style={{ height: '500px', objectFit: 'cover' }} />
            <Carousel.Caption>
              <div className='af-position-lg af-bg-dark-transparent py-3'>
                <h3>{SLIDER_IMAGES[2].title}</h3>
                <p>{SLIDER_IMAGES[2].description}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="home_container">
        <div className="container">
          <div className="row"> 
            <div className="col-8">
              <div className='container'>
              {
                // Slice the first two blogs and map over them
                blogs.slice(0, 2).map((blog, index) => (
                <Card className='blog_card border-0'>
                  <Card.Img variant="top" src={ require(`../Images/blog_posts/${blog.imageUrl}`)} />
                  <Card.Body className="border-0"> {/* Apply border-0 class to remove border */}
                    <Card.Title>{blog.title  > 20 ? blog.title.substring(0, 20) + '...' : blog.title}</Card.Title>
                    <Card.Text>{blog.description.length > 100 ? blog.description.substring(0, 100) + '...' : blog.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush border-0"> {/* Apply border-0 class to remove border */}
                    <div className='container'>
                      <div className='row'>
                        <div className='col-4'>
                          <ListGroup.Item className="border-0"><Person />Admin</ListGroup.Item> {/* Apply border-0 class to remove border */}
                        </div>
                        <div className='col-4'>
                          <ListGroup.Item className="border-0"><CalendarDate />January 12, 2019</ListGroup.Item> {/* Apply border-0 class to remove border */}
                        </div>
                        <div className='col-4'>
                          <ListGroup.Item className="border-0"><ChatDots />2 Comments</ListGroup.Item> {/* Apply border-0 class to remove border */}
                        </div>
                      </div>
                    </div>
                  </ListGroup>
                  <Card.Body className="border-0"> {/* Apply border-0 class to remove border */}
                  <Button className="card_button">
                    <Link to={`/blog-detail/${blog._id}`} style={{ color: '#a4b143', textDecoration: 'none' }}>Read More</Link>
                  </Button>
                  </Card.Body>
                </Card>
                
              ))}
               
                <br/>
              </div>
            </div>
            <div className="col-4">
              <div className='container'>
                <div className="poster_div">              
                  <img className='d-block w-100' src={ad_1} alt='side advertisement' />
                </div>
                <br/>                           
              </div>           
            </div>               
          </div>
        </div>
        
        <div className="container">
        <h3>More Blogs</h3>
        <div className="row">
        {blogs.slice(2,6).map((blog, index) => (
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
      </div>
      <Footer/>
      {/* <FooterBar/> */}
    </div>
  );
};

export default LandingPage;
