import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import Layout from './components/Layout';
import Dashboard from './Pages/Dashboard';
import Properties from './Pages/Properties';
import Import from './Pages/Import';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes Wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="import" element={<Import />} />
          <Route path="properties" element={<Properties />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;












// // import React from "react";
// // import ProtectedRoute from "./ProtectedRoutes";
// // import { ApolloProvider } from "@apollo/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import SignUp from "./Auth/SignUp";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import client from "./graphql/client";
// // import { AuthProvider } from "./contexts/AuthContext";
// // import Dashboard from "./layouts/Dashboard";
// // import Login from "./Auth/Login";
// // import PublicRoutes from "./routes/PublicRoutes";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';


// // // Define the router following your existing pattern
// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <PublicRoutes />, // PublicRoutes wraps PublicLayout
// //     children: [
// //       { path: "dashboard", element: <Dashboard /> }, // Dashboard inside PublicRoutes
// //     ],
// //   },
// //   { path: "signup", element: <SignUp /> },
// //   { path: "login", element: <Login /> },
// // ]);

// // function App() {
// //   return (
// //     <>
// //     <ApolloProvider client={client}>
// //     <ToastContainer />
// //         <AuthProvider>
// //         <RouterProvider router={router} />
// //         </AuthProvider>
// //       </ApolloProvider>
// //     </>
// //   )
// // }

// // export default App


// import React from "react";
// import { ApolloProvider } from "@apollo/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignUp from "./Auth/SignUp";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import client from "./graphql/client";
// import { AuthProvider } from "./contexts/AuthContext";
// import Dashboard from "./layouts/Dashboard";
// import Login from "./Auth/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <ToastContainer />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />

//             {/* Protected Routes */}
//             <Route element={<ProtectedRoute />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//             </Route>

//             {/* Redirect unknown routes to login */}
//             <Route path="*" element={<Login />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </ApolloProvider>
//   );
// }

// export default App;













