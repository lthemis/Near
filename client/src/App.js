import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './pages/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Store } from './pages/Store';
import { Item } from './pages/Item';
import { Profile} from './pages/Profile';
import React, { useState } from 'react';
import { AuthProvider } from './utils/auth';
import { Logout } from './components/Logout'
import { RequireAuth } from './components/RequireAuth';


function App() {

  return (
    <div className="App">
    <AuthProvider>

      <Navbar>
        <Logout></Logout>
      </Navbar>
      <Routes>
        <Route path="/" element={<LandingPage />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="store" element={<RequireAuth><Store /></RequireAuth>}>
          <Route path=":itemId" element={<Item></Item>}></Route>
        </Route>
        <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </AuthProvider>

    </div>
  );
}

export default App;
