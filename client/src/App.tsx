import React, {useState} from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';
import LoginRegister from './Pages/LoginRegister';
import Store from './Pages/Store';

function App() {

  return (
    <div className="App">
      Near
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginRegister />} />
        <Route path="store" element={<Store />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;



