import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useAuth } from "../../AuthContext";

const SideBar = ({ menus, isSidebarOpened, setIsSidebarOpened }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onSidebarToggle = () => {
    if (typeof setIsSidebarOpened === "function") {
      setIsSidebarOpened(!isSidebarOpened);
    } else {
      console.error("setIsSidebarOpened is not a function");
    }
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-white border overflow-hidden ${
        isSidebarOpened ? "w-60" : "w-16"
      }`}
      style={{ overflow: "visible" }}
    >
      <div className="flex items-center justify-between p-4 cursor-pointer">
        <img
          src={
            isSidebarOpened ? "/src/assets/logo.png" : "/src/assets/logo1.png"
          }
          alt="logo"
          className={`${isSidebarOpened ? "w-40" : "w-12"} mt-4`}
        />
        <div
          className={`absolute ${
            isSidebarOpened
              ? "right-5 top-8 bg-blue-500"
              : "-right-[0.6rem] bg-green-500"
          } top-8 w-5 h-5 rounded-full border flex items-center justify-center`}
        >
          <IconButton
            onClick={onSidebarToggle}
            className="transition-transform duration-300"
          >
            {isSidebarOpened ? (
              <ChevronLeft />
            ) : (
              <ChevronRight className="-ml-[1.2rem]" />
            )}
          </IconButton>
        </div>
      </div>
      {/* Sidebar Items */}
      <ul className="mt-6">
        {menus.map((menu, index) => (
          <li key={index}>
            <NavLink
              to={menu.link}
              className={({ isActive }) =>
                `group flex items-center p-4 text-gray-500 hover:text-blue-500 ${
                  isActive ? "text-blue-500 m-2 bg-[#EAEFFE] rounded-lg" : ""
                }`
              }
            >
              <Tooltip
                title={!isSidebarOpened ? menu.name : ""}
                placement="right"
              >
                <span className="text-gray-500 group-hover:text-blue-500">
                  {menu.icon}
                </span>
              </Tooltip>
              {isSidebarOpened && (
                <span className="ml-4 group-hover:text-blue-500">
                  {menu.name}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 w-full">
        <div
          className="flex items-center p-4 hover:text-blue-500 text-gray-500 cursor-pointer"
          onClick={onLogout}
        >
          <Settings />
          {isSidebarOpened && <span className="ml-4">Setting</span>}
        </div>
        <div
          className="flex items-center p-4 hover:text-red-900 text-gray-500 cursor-pointer"
          onClick={onLogout}
        >
          <SignOutIcon />
          {isSidebarOpened && <span className="ml-4">Sign Out</span>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
