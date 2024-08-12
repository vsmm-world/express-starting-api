const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

// Function to generate a JWT token
function generateToken(payload, expiresIn) {

    console.log('secretKey', secretKey);

    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
}

// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log('User inside authenticateToken', user);
        req.user = user.mongoUser;
        next();
    });
}

module.exports = {
    generateToken,
    authenticateToken
};