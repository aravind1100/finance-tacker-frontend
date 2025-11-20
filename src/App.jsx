import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Analytics from "./Pages/Analytics";

const App = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/analytics"
          element={
          <ProtectedRoute>
          <Analytics />
          </ProtectedRoute>  
        } />
        {/* Fallback - unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
