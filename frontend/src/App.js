import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Shows from "./pages/shows";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import AdminDashboard from "./pages/AdminDashboard";
import ManageBookings from "./pages/ManageBooking";
import ProtectedRoute from "./auth/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shows />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* user routes */}
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute role="USER">
                <Booking />
              </ProtectedRoute>

            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute role="USER">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute role="ADMIN">
                <ManageBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;