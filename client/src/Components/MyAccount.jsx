import React, { useState, useEffect } from 'react';
import Navigation from './navbar/Navigation';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditModal from './EditBlog'; // Import EditModal component
import { useNavigate } from 'react-router-dom';

function MyAccount() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [myblogs, setMyBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();


  // Add the faTrash icon to the library
  library.add(faTrash, faEdit);

  useEffect(() => {
    getMyBlogs();
  }, []); // Fetch blogs on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return;
      }

      const user_response = await axios.get('http://localhost:3001/get-user-details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (user_response.data.status === 'success' && user_response.data.data.user) {
        const user_id = user_response.data.data.user.id;

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('userId', user_id);

        const response = await axios.post('http://localhost:3001/post-blog', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response);

        setFormData({
          title: '',
          description: '',
          image: ''
        });
        setSuccess('Post submitted successfully');
      } else {
        console.error('Unexpected response format from server');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Error submitting post:', error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return;
      }

      const response = await axios.get('http://localhost:3001/get-user-details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === 'success' && response.data.data.user) {
        setUser(response.data.data.user);
        const user =  response.data.data.user;
        // console.log(user.email);
        const user_id = response.data.data.user.id;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        const res = await axios.get(`http://localhost:3001/get-my-blogs/${user_id}`);
        if (res.data.status === 'success' && res.data.data.myblogs) {
          setMyBlogs(res.data.data.myblogs);
        } else {
          setError('Unexpected response format from server');
        }
      } else {
        console.error('Unexpected response format from server');
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  
  // Function to toggle modal visibility and set selected blog
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true); // Open the modal when edit icon is clicked
  };
  
  // Function to close modal
  const handleCloseModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false); // Close the modal
  };

  //delete
  const handleDelete = (blogId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog post?');
  
    if (isConfirmed) {
      // Call the function to perform the deletion
      deleteBlogPost(blogId);
    }
  };

  const deleteBlogPost  = async (blogId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return;
      }
  
      const response = await axios.delete(`http://localhost:3001/delete-blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.status === 'success') {
        // Remove the deleted blog post from the state
        setMyBlogs(myblogs.filter(blog => blog._id !== blogId));
        setSuccess('Blog post deleted successfully');
      } else {
        setError('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setError('Error deleting blog post');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-3">
            <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active w-100" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="account" aria-selected="true">Account Details</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link w-100" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts" type="button" role="tab" aria-controls="posts" aria-selected="false">My Posts</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link w-100" id="submit-post-tab" data-bs-toggle="tab" data-bs-target="#submit-post" type="button" role="tab" aria-controls="submit-post" aria-selected="false">Submit a Post</button>
              </li>
              <br />
              <div>
                <button className='btn shadow-none btn-danger text-white' onClick={handleLogout} >Logout</button>
              </div>
            </ul>
          </div>
          <div className="col-sm-9">
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
              <h2 className='sub_heading'>My Account</h2>
                    <br />
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="mb-2">
                                <label htmlFor="exampleInputName" className="form-label">Name</label>
                                <input type="text" className="form-control shadow-none" name="name" id="exampleInputName" placeholder="" value={user.name} required />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="mb-2">
                                <label htmlFor="exampleInputName" className="form-label">Email</label>
                                <input type="email" className="form-control shadow-none" name="email" id="exampleInputEmail" placeholder="" value={user.email} required />
                            </div>
                        </div>
                    </div>
              </div>
              <div className="tab-pane fade" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                <h2>My Posts</h2>
                {/* Data table for displaying posts */}
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myblogs.map((blog, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{blog.title}</td>
                        <td>{blog.createdAt}</td>
                        <td><FontAwesomeIcon icon="edit" onClick={() => { handleEdit(blog); handleOpenModal(); }} /></td>
                        <td><FontAwesomeIcon icon="trash" onClick={() => handleDelete(blog._id)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Render the modal */}
                { isModalOpen ?  (<EditModal blog={selectedBlog} onClose={handleCloseModal} />) : null }
                
              </div>
              <div className="tab-pane fade" id="submit-post" role="tabpanel" aria-labelledby="submit-post-tab">
                <h2>Submit a Blog Post</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                  {/* Form fields for submitting a post */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    {/* <CKEditor editor={ClassicEditor} data={formData.description} onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormData({
                                            ...formData,
                                            description: data
                                        });
                                    }} /> */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                    {/* Display selected file name */}
                    {formData.image && <p>Selected file: {formData.image.name}</p>}
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
