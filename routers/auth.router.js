const express = require('express');
const { authenticateToken } = require('../shared/auth/jwt.authentication');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.send(`Welcome to the authentication router, ${user.name}`);

});

module.exports = router;
