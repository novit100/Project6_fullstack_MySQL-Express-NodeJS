const express = require('express');
const users = require('./userServer');
const todos = require('./todosServer');
const posts = require('./postServer');
const comments = require('./commentServer');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS before the route middleware
app.use(express.json());
app.use(users);
app.use(todos);
app.use(posts);
app.use(comments);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
