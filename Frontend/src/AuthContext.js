// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("TOKEN") || "");
//   const [isLoading, setIsLoading] = useState(false);
//   let sessionTimeout;

//   // Load user from localStorage on app start
//   useEffect(() => {
//     const storedUser = localStorage.getItem("USER");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Set Token
//   const saveToken = (token) => {
//     setToken(token);
//     localStorage.setItem("TOKEN", token);
//   };

//   // Set User
//   const saveUser = (user) => {
//     setUser(user);
//     localStorage.setItem("USER", JSON.stringify(user));
//   };

//   // Check if logged in
//   const isLoggedIn = () => !!user;

//   // Start session timer (24 hours)
//   const startSessionTimer = () => {
//     clearTimeout(sessionTimeout);
//     sessionTimeout = setTimeout(() => {
//       logout();
//     }, 24 * 60 * 60 * 1000);
//   };

//   // Logout user
//   const logout = () => {
//     setToken("");
//     setUser(null);
//     localStorage.removeItem("TOKEN");
//     localStorage.removeItem("USER");
//     clearTimeout(sessionTimeout);
//     window.location.href = "/login"; // Redirect to login
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isLoggedIn,
//         saveUser,
//         saveToken,
//         logout,
//         startSessionTimer,
//         isLoading,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
