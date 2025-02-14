import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";

const ClientDashboard = () => {
  // Destructure user from the context
  const { user, token } = useAuth();

  // State initialization with default values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userRole: "",
    token: "",
  });

  // Set the form data when user data becomes available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        userRole: user?.userRole ?? "",
        token: token ?? "",
      });
    }
  }, [user]); // Re-run this effect when the user changes

  // Render the component
  return (
    <div className="w-full ">
      <div className="max-w-4xl mx-auto my-6 p-8 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-center p-4 mb-6">
          Client Dashboard
        </h2>
        <div className="space-y-4">
          {/* Display user details */}
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">First Name:</span>
            <span>{formData.firstName}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Last Name:</span>
            <span>{formData.lastName}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{formData.email}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">User Role:</span>
            <span>{formData.userRole}</span>
          </div>
          {/* <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Token:</span>
            <span>{formData.token}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
