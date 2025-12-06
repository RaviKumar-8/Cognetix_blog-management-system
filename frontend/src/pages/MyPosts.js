import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { UserContext } from '../context/UserContext';
import { format } from 'date-fns';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        document.title = "My Posts DevBlog";

        if (userInfo) {
            API.get(`/posts/my-posts/${userInfo.id}`).then(response => {
                setPosts(response.data);
            });
        }
    }, [userInfo]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await API.delete(`/posts/${id}`);
            setPosts(posts.filter(p => p._id !== id));
        }
    };

    return (
        <div className="container">
            <h2>My Dashboard</h2>
            {posts.map(post => (
                <div className="blog-card" key={post._id} style={{borderLeft: '5px solid #6c5ce7'}}>
                    <div className="blog-meta">
                        <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                        <button onClick={() => handleDelete(post._id)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>Delete</button>
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p>{post.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default MyPosts;