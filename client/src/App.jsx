import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Registration";
import TodoList from "./pages/Todos/TodoList";
import Dashboard from "./pages/Admin/Dashboard";
import Navbar from "./pages/Navbar";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("todoapp"));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      setIsAdmin(storedUser.role === "admin");
    }
  }, []);

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}
        isAdmin={isAdmin} />
      <Routes>
        {/* Redirect '/' to '/todo' if authenticated, otherwise show landing page */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/todo" /> : <Landing />}
        />

        {/* Show login page only if user is not authenticated */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/todo" />
            ) : (
              <Login
                setUser={setUser}
                setIsAuthenticated={setIsAuthenticated}
                setIsAdmin={setIsAdmin}
              />
            )
          }
        />

        {/* Show register page only if user is not authenticated */}
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/todo" /> : <Register />}
        />

        {/* Protected Route: Only accessible when authenticated */}
        <Route
          path="/todo"
          element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />}
        />

        {/* Admin Route: Only accessible if authenticated and admin */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/todo" />
          }
        />

        {/* Redirect all unknown routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/todo" : "/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
