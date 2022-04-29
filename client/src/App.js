import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Store } from "./pages/Store/Store";
import { ItemDetails } from "./pages/ItemDetails/ItemDetails";
import { Profile } from "./pages/Profile/Profile";
import { AuthProvider } from "./utils/auth";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./pages/Home/Home";

const App = () => {
  const [lastItem, setLastItem] = useState({});

  return (
    <div className="App">
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* 
          <Route path="home" element={<Home />} />  
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route> */}

          <Route path="/" element={<Home />} />
          {/* <Route path="home" element={<Home />} />   */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="/store"
            element={
              <RequireAuth>
                <Store lastItem={lastItem} />
              </RequireAuth>
            }
          />

          <Route path="/store/:itemId" element={<ItemDetails />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile setLastItem={setLastItem} />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
