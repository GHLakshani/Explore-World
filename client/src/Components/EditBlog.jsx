import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ blog, onSave, onClose }) => {
    console.log(blog);
  const [formData, setFormData] = useState({
    title: blog ? blog.title : '',
    description: blog ? blog.description : '',
    imageUrl: blog ? blog.imageUrl : '',
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog) {
        // Create FormData object to send the updated data
        const updatedData = new FormData();
        updatedData.append('title', formData.title);
        updatedData.append('description', formData.description);
        updatedData.append('image', formData.image);
  
        // Make a PUT request to the update route
        const response = await axios.put(`http://localhost:3001/update-my-blog/${blog._id}`, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Check if the update was successful
        if (response.status === 200) {
          // Call onSave function with updated formData
        //   onSave(blog._id, formData);
        setSuccess('Successfully Updated');  // Reset error on success
          // Clear form data
          setFormData({
            title: '',
            description: '',
            image: ''
          });
          
          // Close the modal
        //   onClose();
          // Show success message
          console.log('Blog post updated successfully');

          // Refresh the current tab
            // window.location.reload();
        } else {
          // Handle error if the update failed
          console.error('Failed to update blog post');
        }
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      // Show error message
      console.error('Failed to update blog post');
    }
  };
  

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {success && <p style={{ color: 'green' }}>{success}</p>}
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="8" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleChange} />
          </div>
          {formData.imageUrl && <img src={ require(`../Images/blog_posts/${formData.imageUrl}`)}  alt="Blog_Image" style={{ maxWidth: '150px', height: '100px' }} />}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
