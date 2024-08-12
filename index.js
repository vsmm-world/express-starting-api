const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const { connectToMongo } = require('./db/mongo.connection');
const port = process.env.PORT || 5000;
const authRouter = require('./routers/auth.router');

connectToMongo();

// Ensure express.json() middleware is used before any router to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Changed extended to true to support parsing of arrays and objects
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.post('/', (req, res) => {
    console.log('Request Body:', req.body);
    res.send('Hello World');
});

app.get('/', (req, res) => {
    console.log('Request Headers:', req.headers);
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
