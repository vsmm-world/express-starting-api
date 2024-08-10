const express = require('express');
const app = express();
const { connectToMongo } = require('./db/mongo.connection');
const port = 3000 || process.env.PORT;

connectToMongo();

app.get('/', (req, res) => {
    console.log('Request', req.header);
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
