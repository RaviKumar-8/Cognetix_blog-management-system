import React, { useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() =>{
        document.title = "Login DevBlog";
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user info
            setUserInfo(data.user);
            navigate('/');
        } catch (err) {
            alert("Login Failed!");
        }
    };

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="form-group">
                <input type="email" placeholder="Email" className="form-control" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" className="form-control" onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn-primary" style={{width: '100%'}}>Login</button>
        </form>
    );
};

export default Login;