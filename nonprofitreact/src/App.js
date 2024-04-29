import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from './pages/FrontPage';
import Foundation from './pages/Foundation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/foundation" element={<Foundation/>} />
      </Routes>
    </Router>
  );
}

export default App;
