const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

const createAuth = (req, res, next) => {
    const { email, password } = req.body;
    const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    next();
}

module.exports = {
    createAuth
};