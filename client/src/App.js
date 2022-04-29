import './App.css';
import { Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Store } from './pages/Store';
import { ItemDetails } from './pages/ItemDetails';
import { Profile} from './pages/Profile';
import React, { useState } from 'react';
import { AuthProvider } from './utils/auth';
import { RequireAuth } from './components/RequireAuth';
import { Home } from './pages/Home/Home';

function App() {

  const [lastItem, setLastItem] = useState({})

  return (
    <div className="App">
    <AuthProvider>

      <Navbar>
      </Navbar>

      <Routes>
{/* 
          <Route path="home" element={<Home />} />  
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}


        <Route path="/" element={<Home />} ></Route>
          {/* <Route path="home" element={<Home />} />   */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        
        <Route path="/store" element={<RequireAuth><Store lastItem={lastItem}/></RequireAuth>}></Route>

        <Route path="/store/:itemId" element={<ItemDetails></ItemDetails>}></Route>

        <Route path="/profile" element={<RequireAuth><Profile setLastItem={setLastItem} /></RequireAuth>} />

      </Routes>

    </AuthProvider>

    </div>
  );
}

export default App;
