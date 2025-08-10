const express = require('express');
const Blog = require('../Database/models/blog');

const router = express.Router();

router.get('/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    

    // Find blogs by user ID
    const blogs = await Blog.find({ userId: user_id });

    // console.log(blogs);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        status: 'Failed',
        message: 'No blogs found for the provided user ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        myblogs: blogs
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

module.exports = router;
