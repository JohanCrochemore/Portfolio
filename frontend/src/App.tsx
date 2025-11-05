import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileAdmin from "./pages/ProfileAdmin";
import ProfilePublic from "./pages/ProfilePublic";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfilePublic />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <ProfileAdmin />
              </ProtectedRoute>
            }/>
          <Route path="*" element={<ProfilePublic />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
