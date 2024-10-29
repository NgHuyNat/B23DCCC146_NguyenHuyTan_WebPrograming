const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/user/', (req, res) => {
  res.json([
    {id: 1 , name: "Name1"},
    {id: 2 , name: "Name2"}
    ]);
});
