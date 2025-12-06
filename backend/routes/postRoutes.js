const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a Post (మామూలుగా అయితే ఇక్కడ Token Verify చేయాలి, ఇప్పుడైతే Direct గా రాద్దాం)
router.post('/create', async (req, res) => {
    const { title, content, author, category } = req.body;
    try {
        const newPost = new Post({ title, content, author, category });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Posts (Home Page కోసం)
router.get('/', async (req, res) => {
    try {
        // .populate('author') అంటే User వివరాలు (పేరు) కూడా కలిపి తెస్తుంది
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get My Posts (Profile Page కోసం)
router.get('/my-posts/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;