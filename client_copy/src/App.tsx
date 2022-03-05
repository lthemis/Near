import React, {useState} from 'react';
import { AuthProvider, useAuth } from './Utils/auth';

import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Profile';
import LandingPage from './Pages/LandingPage';
import Store from './Pages/Store';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Item from './Pages/Item'
import { useNavigate } from 'react-router-dom';
import { RequireAuth } from './Components/RequireAuth'

function App() {

  return (
    <AuthProvider>
    <div className="App">
      Near
      <Routes>

        <Route path="/" element={<LandingPage />}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>

        <Route path="store" element={ <RequireAuth><Store /></RequireAuth>}>
          <Route path="profile" element={<RequireAuth><Dashboard /></RequireAuth>}/>
       {/* <Route path="store" element={ <RequireAuth><Store /></RequireAuth>}> */}
       </Route>
        
        <Route
          path='*'
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />

      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;



