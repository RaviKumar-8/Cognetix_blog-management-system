import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register DevBlog";
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { username, email, password });
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            alert("Registration Failed");
        }
    };

    return (
        <form className="auth-form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <div className="form-group">
                <input type="text" placeholder="Username" className="form-control" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email" className="form-control" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" className="form-control" onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn-primary" style={{width: '100%'}}>Register</button>
        </form>
    );
};

export default Register;