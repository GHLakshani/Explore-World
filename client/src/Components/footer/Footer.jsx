import React from 'react';
import './FooterBar.css';
import logo from '../../Images/logo.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Footer() {
    return (
        <div className="footer_container"> 
            <div className='row'>
                <div className='col-4'>
                    <img src={logo} className="logo_img" alt="logo" />
                </div>
                <div className='col-4'>
                    <div className="footer_links">
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Contact Us</p>
                    </div>
                </div>
                <div className='col-4 '>
                    <div className='newsletter_div'>
                    <Form>
                    <Form.Text className="" style={{ color: "#ffffff" }}>
                        Newsletter
                    </Form.Text>
                    <Form.Group className="mb-2 p-2" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />                  
                    </Form.Group>
                    <Button className="card_button ">Submit</Button>
                    </Form>
                </div> 
                </div>
            </div>
        </div>
    );
}

export default Footer;
