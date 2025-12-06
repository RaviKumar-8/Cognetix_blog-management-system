import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import './App.css';

function App() {
  return (
    <Router>
      <main>
        {/* Navbar అన్ని పేజీల్లో పైన కనిపిస్తుంది */}
        <Navbar />
        
        {/* పేజీలు మారడానికి Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;