const express = require('express');
const Blog = require('../Database/models/blog');
// const { authenticate,authorize } = require('../Middleware/auth'); 


const router = express.Router();

// router.get('/',authenticate, authorize('admin'), async (req, res) => {
router.get('/', async (req, res) => {
     const blogs = await Blog.find({}).sort({ createdAt: -1 });
    try{
        res.status(200).json({
            status:'success',
            data:{
                blogs
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