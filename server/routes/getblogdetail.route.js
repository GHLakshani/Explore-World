const express = require('express');
const Blog = require('../Database/models/blog');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No blog found with the provided ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                blog
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
