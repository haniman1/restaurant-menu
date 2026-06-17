import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Menu from "./pages/Menu";
import About from "./pages/About";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔥 FIX: sync token when login/logout happens in SAME tab
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
      {/* toast must be OUTSIDE Routes */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* public */}
        <Route path="/" element={<Menu />} />
        <Route path="/about" element={<About />} />

        {/* login */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* protected dashboard */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
