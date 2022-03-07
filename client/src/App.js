import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './pages/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Store } from './pages/Store';
import { ItemDetails } from './pages/ItemDetails';
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
      </Navbar>

      <Routes>

        <Route path="/" element={<LandingPage />} >
          {/* <Route index element={<LandingPage />} />   */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/store" element={<RequireAuth><Store /></RequireAuth>}>
        </Route>
        <Route path="/store/:itemId" element={<ItemDetails></ItemDetails>}></Route>

        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      </Routes>
    </AuthProvider>

    </div>
  );
}

export default App;
