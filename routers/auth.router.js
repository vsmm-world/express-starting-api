const express = require('express');
const { authenticateToken } = require('../shared/auth/jwt.authentication');
const router = express.Router();


router.post('/register', (req, res) => {
    
    const { name, email, password } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password', password);
    
});

router.post('/login', (req, res) => {
    res.send('Login route');
});

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.send(`Welcome to the authentication router, ${user.name}`);

});

module.exports = router;

