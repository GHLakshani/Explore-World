const express = require('express');
const Blog = require('../Database/models/blog');
// const { authenticate,authorize } = require('../Middleware/auth'); 


const router = express.Router();

// router.get('/',authenticate, authorize('admin'), async (req, res) => {
router.get('/:id', async (req, res) => {
    const blog_id = req.params.id;
    // console.log(blog_id);
    const otherblogs = await Blog.find({ _id: { $ne: blog_id } }).sort({ createdAt: -1 });
    // console.log(otherblogs);
    try{
        res.status(200).json({
            status:'success',
            data:{
                otherblogs
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message: err.message 
    })
    }
})

module.exports = router;