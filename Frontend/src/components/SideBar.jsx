

import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import {
  Home as HomeIcon,
  ImportExport as ImportIcon,
  Business as PropertiesIcon,
  People as OwnersIcon,
  Notifications as NotificationsIcon,
  Report as ReportsIcon,
  Assignment as ClaimsIcon,
  ExitToApp as SignOutIcon,
  Settings,
    ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const SideBar = ({ isSidebarOpened, setIsSidebarOpened }) => {

  const onSidebarToggle = () => {
    if (typeof setIsSidebarOpened === "function") {
      setIsSidebarOpened(!isSidebarOpened);
    } else {
      console.error("setIsSidebarOpened is not a function");
    }
  };

    const onLogout = () => {
    // Handle logout logic
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-white shadow-lg overflow-hidden ${
        isSidebarOpened ? "w-60" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center p-4 cursor-pointer" >
        <img
          src={isSidebarOpened ? "/src/assets/logo.png" : "/src/assets/logo1.png"}
          alt="logo"
          className={`${isSidebarOpened ? "w-40" : "w-12"} mt-4`}
  
        />

        <IconButton onClick={onSidebarToggle} className={`transition-transform duration-300 ${isSidebarOpened ? '' : 'translate-x-1/2'}`}>
         {/* <div className={`flex ${isSidebarOpened ? 'justify-between' : 'justify-center'} items-center p-4`}> */}

          {isSidebarOpened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      {/* Sidebar Items */}
   
       <ul className="mt-6 ">
         <li>
    
<NavLink to="/dashboard" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 m-2 bg-[#EAEFFE] rounded-lg" : ""}`}>
  <Tooltip title={!isSidebarOpened ? "Home" : ""} placement="right">
    <HomeIcon className="text-gray-500 group-hover:text-blue-500" />
  </Tooltip>
  {isSidebarOpened && <span className="ml-4 group-hover:text-blue-500">Home</span>}
</NavLink>

         </li>
         <li>
           <NavLink to="/import" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`} >     
        <Tooltip title={!isSidebarOpened ? "Import" : ""} placement="right">
               <ImportIcon  className="text-gray-500" />
             </Tooltip>
             {isSidebarOpened && <span className="ml-4">Import</span>}
           </NavLink>
         </li>
         <li>
           <NavLink to="/properties" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`}>
            <Tooltip title={!isSidebarOpened ? "Properties" : ""} placement="right">
               <PropertiesIcon className="text-gray-500" />
             </Tooltip>
             {isSidebarOpened && <span className="ml-4">Properties</span>}
           </NavLink>
         </li>
         <li>
           <NavLink to="/owners" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`}>
             <Tooltip title={!isSidebarOpened ? "Owners" : ""} placement="right">
               <OwnersIcon className="text-gray-500"  />
             </Tooltip>
             {isSidebarOpened && <span className="ml-4">Owners</span>}
           </NavLink>
         </li>
         <li>
           <NavLink to="/notifications" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`}>
             <Tooltip title={!isSidebarOpened ? "Notification" : ""} placement="right">
              <NotificationsIcon className="text-gray-500"  />
            </Tooltip>
             {isSidebarOpened && <span className="ml-4">Notification</span>}
           </NavLink>
        </li>
        <li>
           <NavLink to="/reports" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`}>
            <Tooltip title={!isSidebarOpened ? "Reports" : ""} placement="right">
              <ReportsIcon className="text-gray-500"  />
            </Tooltip>
            {isSidebarOpened && <span className="ml-4">Reports</span>}
           </NavLink>
         </li>
         <li>
           <NavLink to="/claims" className={({ isActive }) => `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${isActive ? "text-blue-500 bg-[#EAEFFE] rounded-lg" : ""}`} >
             <Tooltip title={!isSidebarOpened ? "Claims" : ""} placement="right">
               <ClaimsIcon className="text-gray-500" />
            </Tooltip>
            {isSidebarOpened && <span className="ml-4">Claims</span>}
          </NavLink>
         </li>
       </ul>
    <div className="absolute bottom-0 w-full">
        
     <div className="flex items-center p-4 hover:text-blue-500 text-gray-500  cursor-pointer" onClick={onLogout}>
           <Settings />    
        {isSidebarOpened && <span className="ml-4">Setting</span>}
         </div>

         <div className="flex items-center p-4 hover:text-red-900  text-gray-500 cursor-pointer" onClick={onLogout}>
           <SignOutIcon />    
        {isSidebarOpened && <span className="ml-4">Sign Out</span>}
         </div>
       </div>
    </div>
  );
};

export default SideBar;















