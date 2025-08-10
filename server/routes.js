const express = require('express');
const router =  express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to the landing page!');
});

router.post('/signup', (req, res) => {
    res.send('Welcome to the landing page!');
});

module.exports = router;