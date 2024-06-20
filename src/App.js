// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Todoapp from './components/todoapp';
import Signin from './components/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/todoapp" element={<Todoapp />} />
      </Routes>
    </Router>
  );
}

export default App;
