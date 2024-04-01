// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let posts = []; // Array to store posts

app.use(bodyParser.json());

// Route to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Route to create a new post
app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    const newPost = { username, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Route to delete a post by index
app.delete('/posts/:index', (req, res) => {
    const { index } = req.params;
    if (index < 0 || index >= posts.length) {
        return res.status(404).json({ message: 'Post not found' });
    }
    posts.splice(index, 1);
    res.json({ message: 'Post deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
