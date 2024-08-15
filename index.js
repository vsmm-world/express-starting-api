const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const { connectToMongo } = require('./db/mongo.connection');
const port = process.env.PORT || 5000;
const authRouter = require('./routers/auth.router');

connectToMongo();

// Enable CORS for all incoming requests
app.use(cors());

// Ensure express.json() middleware is used before any router to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Changed extended to true to support parsing of arrays and objects
app.use(cookieParser());
app.use("/api/auth", authRouter);



app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Express js Backend API Starting Template Developed by Ravindra Valand'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
