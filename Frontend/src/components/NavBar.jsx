import React from 'react';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/import':
        return 'Imports';
      case '/properties':
        return 'Properties';
      case '/owners':
        return 'Owners';
      case '/notifications':
        return 'Notifications';
      case '/reports':
        return 'Reports';
      case '/claims':
        return 'Claims';
      default:
        return 'Home';
    }
  };

  return (
    <nav className=" flex ml-[1rem] mt-[-1rem]  text-black">
      <h1 className="text-2xl font-semibold">{getTitle()}</h1>
    </nav>
  );
};

export default NavBar;