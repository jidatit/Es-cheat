import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/found.png"

const NotFound = () => {
  return (
    <div className="text-center flex flex-col h-screen justify-center items-center">
      <h1 className="text-primary font-bold text-6xl font-inter mb-2">
        Oops - Page Not Found
      </h1>
      <p className="text-lg text-neutral-600">
        The page you are looking for does not exist.
      </p>
      <Link to="/dashboard" className="bg-primary text-black p-2.5 rounded-md mt-4">
        Go Back Home
      </Link>
      <img
        src={notFoundImage}
        alt="404 illustration"
        className="w-96 mx-auto"
      />
    </div>
  );
};

export default NotFound;