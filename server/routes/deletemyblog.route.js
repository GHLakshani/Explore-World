const express = require('express');
const router = express.Router();
const Blog = require('../Database/models/blog'); // Import your Blog model

// Route to delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog post by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ status: 'error', message: 'Blog post not found' });
    }

    // Respond with success message
    res.status(200).json({ status: 'success', message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
