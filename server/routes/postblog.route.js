const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../Database/models/blog');

// Multer storage configuration
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

// Route to handle post creation with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        
        const { title, description,userId } = req.body;
        const imageUrl = req.file.path; // Save the path of the uploaded image
        const imageName = req.file.filename; // Save the name of the uploaded image
        const savedPost = new Post({
            title,
            description,
            imageUrl,
            userId
        });
        // Move the image from temporary folder to client-side directory
        // const imageDestination = path.join(__dirname, '/', 'src', 'Images', 'blog_posts', savedPost._id + path.extname(req.file.originalname));
        const imageDestination = path.join('F:/explore-world/client/src/Images/blog_posts/', savedPost._id + path.extname(req.file.originalname));
        fs.renameSync(imageUrl, imageDestination);

        // Update the imageUrl in the database to the client-side path
        savedPost.imageUrl = path.join(savedPost._id + path.extname(req.file.originalname));
        await savedPost.save();

        res.json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
