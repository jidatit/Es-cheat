import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { useAuth } from "../AuthContext";
import { toast, Toaster } from "sonner";
import NotFound from "./shared/NotFound";
import Login from "../src/components/login";
import Dashboard from "../src/Pages/Dashboard";
import ForgotPassword from "../src/components/ForgotPassword";
import ClientDashboard from "./components/client/ClientDashboard";
import ClientLayout from "./components/layouts/ClientLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AuthLayout from "./components/layouts/AuthLayout";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen loading-spinner">
    <div className="w-16 h-16 border-4 rounded-full border-t-transparent border-blue-600 animate-spin"></div>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles, currentUser }) => {
  const { loading } = useAuth();
  const location = window.location.pathname;
  const loginRelatedPaths = ["/", "/login", "/resetPasswordForm"];
  console.log("boii");
  useEffect(() => {
    if (!loading) {
      if (!currentUser && !loginRelatedPaths.includes(location)) {
        toast.error("You must be logged in to access this page.");
      } else if (currentUser && !allowedRoles.includes(currentUser?.userType)) {
        toast.error(
          "Access denied: You don't have permission to view this page."
        );
      }
    }
  }, [currentUser, loading, allowedRoles, location]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    // Redirect to the login page if the user is not logged in
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(currentUser?.userType)) {
    // Redirect to a 404 or fallback page for unauthorized access
    return <Navigate to="/notFound" />;
  }

  // Render children if user is authorized
  return <>{children}</>;
};

const getDashboardPath = (userType) => {
  console.log("getDashboardPath", userType);
  switch (userType) {
    case "client":
      return "/clientLayout";
    case "admin":
      return "/adminLayout";
    default:
      return "/notFound";
  }
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="h-auto overflow-hidden">
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route
                path="/"
                element={
                  user ? (
                    <Navigate to={getDashboardPath(user?.userType)} />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to={getDashboardPath(user?.userType)} />
                  ) : (
                    <Login />
                  )
                }
              />

              <Route
                path="/resetPasswordForm"
                element={
                  user ? (
                    <Navigate to={getDashboardPath(user?.userType)} />
                  ) : (
                    <ForgotPassword />
                  )
                }
              />
            </Route>

            <Route path="/notFound" element={<NotFound />} />

            {/* Protected User Dashboard Route */}
            <Route
              path="/clientLayout/*"
              element={
                <ProtectedRoute allowedRoles={["client"]} currentUser={user}>
                  <ClientLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ClientDashboard />} />
              <Route path="userInfo" element={<ClientDashboard />} />
            </Route>

            {/* Protected Admin Dashboard Route */}
            <Route
              path="/adminLayout/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]} currentUser={user}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/notFound" />} />
            </Route>

            {/* Catch-all route */}
            <Route
              path="*"
              element={
                <Navigate
                  to={user ? getDashboardPath(user?.userType) : "/notFound"}
                />
              }
            />
          </Routes>
        </Router>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
