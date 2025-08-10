const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Database/models/user'); 

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  // console.log(req.userId);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err });
    } else {
      req.userId = decoded.userId; // Add decoded userId to request object
      next();
    }
  });
};



// Route to fetch user details
router.get('/', verifyToken, async (req, res) => {
  const userId = req.userId; // Get userId from the request object

  try {
      // Find the user with the matching userId
      const user = await User.findById(userId);

      // Check if user is found
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Serialize user object to remove circular references
      const serializedUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          // Add other properties as needed
      };
      // console.log(serializedUser);

      // If user found, send serialized user details in the response
      res.status(200).json({ status: 'success', data: { user: serializedUser } });
  } catch (error) {
      // Handle errors
      console.error('Error fetching user:', error);
      localStorage.clear();
      res.status(500).json({ message: 'Internal server error' });      
  }
});



module.exports = router;
