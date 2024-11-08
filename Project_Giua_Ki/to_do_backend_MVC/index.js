const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./src/routers/todoRoutes');
const userRoutes = require('./src/routers/userRoutes');

const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', todoRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
