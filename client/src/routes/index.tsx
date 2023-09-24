import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import ChatDashboard from "../views/ChatDashboard";

const AppRouter: React.FC = () => {
  // Check if the 'jwt' cookie exists
  const jwtCookie = document.cookie.includes("jwt");
  console.log(jwtCookie);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={jwtCookie ? <ChatDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
