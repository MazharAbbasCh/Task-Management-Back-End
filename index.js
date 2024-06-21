const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/user'));
app.use('/task', require('./routes/task'));

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
