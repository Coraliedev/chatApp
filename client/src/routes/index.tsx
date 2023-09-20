import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; 