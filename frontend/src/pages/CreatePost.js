import React, { useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "DevBlog-CreatePost";
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/posts/create', { 
                title, 
                content, 
                author: userInfo.id // User ID from Context
            });
            alert("Post Created!");
            navigate('/');
        } catch (err) {
            alert("Failed to create post");
        }
    };

    return (
        <form className="post-form" onSubmit={handleCreate}>
            <h2>Create New Post ✍️</h2>
            <div className="form-group">
                <input type="text" placeholder="Title" className="form-control" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <textarea placeholder="Tell your story..." className="form-control" onChange={e => setContent(e.target.value)} />
            </div>
            <button className="btn-primary" style={{width: '100%'}}>Publish Post</button>
        </form>
    );
};

export default CreatePost;