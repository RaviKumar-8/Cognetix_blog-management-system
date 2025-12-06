const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // బ్లాగ్ మేటర్
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ఎవరు రాశారు?
    category: { type: String, default: 'General' }, // Optional Feature [cite: 88]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);