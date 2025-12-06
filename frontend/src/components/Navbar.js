import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setUserInfo(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2 onClick={() => navigate('/')}>DevBlogs ✍️</h2>
            <div className="nav-links">
                {userInfo ? (
                    <>
                        <Link to="/create">Write New Post</Link>
                        <Link to="/my-posts">My Posts</Link>
                        <span style={{fontWeight:'bold', color: '#6c5ce7', marginLeft: '20px', marginRight: '20px'}}>Hello! {userInfo.username}</span>
                        <button onClick={logout} style={{color: 'red'}}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn-primary">Get Started</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;