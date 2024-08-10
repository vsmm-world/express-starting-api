const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const { connectToMongo } = require('./db/mongo.connection');
const port = 3000 || process.env.PORT;
const authRouter = require('./routers/auth.router');

connectToMongo();


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Request', req.header);
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
