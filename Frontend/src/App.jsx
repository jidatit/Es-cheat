// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './components/login';
// import ForgotPassword from './components/forgotPassword';
// import Layout from './components/Layout';
// import Dashboard from './Pages/Dashboard';
// import Properties from './Pages/Properties';
// import Import from './Pages/Import';
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Protected Routes Wrapped in Layout */}
//         <Route path="/" element={<Layout />}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="import" element={<Import />} />
//           <Route path="properties" element={<Properties />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Properties from "./Pages/Properties";
import Import from "./Pages/Import";
import "./App.css";

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





