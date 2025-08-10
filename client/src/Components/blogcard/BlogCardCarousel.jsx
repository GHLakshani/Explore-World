import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import blog_3 from '../../Images/blog_3.jpg';
import blog_4 from '../../Images/blog_4.jpg';

function BlogCardCarousel() {
  return (
    <div className="container">
        <h3>More Blogs</h3>
        <div className="row">
            <div className="col-3">
                <Card className="mycard" style={{ maxWidth: "18rem" }}>
                    <Card.Img variant="top" src={blog_3} className="w-100" />
                    <Card.Body>
                        <Card.Title>What is Lorem Ipsum</Card.Title>
                        <Card.Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                        </Card.Text>
                        <Button className="card_button">Read More</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-3">
                <Card className="mycard" style={{ maxWidth: "18rem" }}>
                    <Card.Img variant="top" src={blog_4} />
                    <Card.Body>
                        <Card.Title>Why do we use it</Card.Title>
                        <Card.Text>
                        It is a long established fact that a reader will be distracted by the readable content of...
                        </Card.Text>
                        <Button className="card_button">Read More</Button>
                    </Card.Body>
                </Card>

            </div>
            <div className="col-3">
                <Card className="mycard" style={{ maxWidth: "18rem" }}>
                    <Card.Img variant="top" src={blog_3} className="w-100" />
                    <Card.Body>
                        <Card.Title>What is Lorem Ipsum</Card.Title>
                        <Card.Text>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...
                        </Card.Text>
                        <Button className="card_button">Read More</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-3">
                <Card className="mycard" style={{ maxWidth: "18rem" }}>
                    <Card.Img variant="top" src={blog_4} />
                    <Card.Body>
                        <Card.Title>Why do we use it</Card.Title>
                        <Card.Text>
                        It is a long established fact that a reader will be distracted by the readable content of...
                        </Card.Text>
                        <Button className="card_button">Read More</Button>
                    </Card.Body>
                </Card>

            </div>                 

                
                
                
            {/* </Carousel> */}
        </div>
      
    </div>
  );
}

export default BlogCardCarousel;
