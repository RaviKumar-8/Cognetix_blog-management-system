import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { format } from 'date-fns';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = "DevBlog";
        API.get('/posts').then(response => {
            setPosts(response.data);
        });
    }, []);

    return (
        <div className="container">
            {posts.length === 0 ? <h3>No posts yet... Be the first to write! ✍️</h3> : null}
            
            {posts.map(post => (
                <div className="blog-card" key={post._id}>
                    <div className="blog-meta">
                        <span>@{post.author.username}</span>
                        <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-preview">{post.content.substring(0, 200)}...</p>
                    <button className="btn-primary" style={{marginTop: '15px', fontSize: '12px'}}>Read More</button>
                </div>
            ))}
        </div>
    );
};

export default Home;