// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = Cookies.get("userData");
        const storedToken = Cookies.get("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser).user);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (newUser, newToken) => {
    try {
      // Set cookies first
      Cookies.set("userData", JSON.stringify(newUser));
      Cookies.set("token", newToken);

      setUser(newUser.user);
      setToken(newToken);

      // Return a promise that resolves when state is updated
      return new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("userData");
    Cookies.remove("token");
    setLoading(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user && token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
