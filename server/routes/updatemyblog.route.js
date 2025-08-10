const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../Database/models/blog');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the temporary destination folder for multer
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

// Initialize multer upload with storage configuration
const upload = multer({ storage: storage });

const jwt = require('jsonwebtoken');

// Update route for blog post
// Update route for blog post
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // Extract updated data from the request body
    const { title, description } = req.body;

    // Check if a new image file was uploaded
    if (req.file) {
      console.log("file has");
      // Move the image to the client-side directory
      const imageDestination = path.join('F:/explore-world/client/src/Images/blog_posts/', blog._id + path.extname(req.file.originalname));
      fs.renameSync(req.file.path, imageDestination);
      
      // Update the imageUrl in the database to the client-side path
      const imageUrl = path.join(blog._id + path.extname(req.file.originalname));

      // Update the blog post in the database with the new image
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        description,
        imageUrl
      }, { new: true });

      res.status(200).json(updatedBlog);
    } else {
      console.log("no file");
      // If no new image was uploaded, update only title and description
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        description
      }, { new: true });

      res.status(200).json(updatedBlog);
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: error });
  }
});



module.exports = router;
