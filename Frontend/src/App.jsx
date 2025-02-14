
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import PropertyDetails from "./Pages/PropertyDetails";
import Import from "./Pages/Import";
import Claims from "./Pages/Claims";
import Notifications from "./Pages/Notifications";
import Reports from "./Pages/Reports";
import Owner from "./Pages/Owner";
import NotFound from "./components/NotFound";
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
          <Route path="properties" element={<PropertyDetails />} />
          {/* <Route path="owners" element={<Owner/>} />
          <Route path="notifications" element={<Notifications/>} />
          <Route path="reports" element={<Reports />} />
          <Route path="claims" element={<Claims />} /> */}
        
           {/* Catch all undefined routes */}
           <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




