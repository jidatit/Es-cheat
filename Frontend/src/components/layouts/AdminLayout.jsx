import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineGroups } from "react-icons/md";
import { useTheme } from "@mui/material";
import SideBar from "../SideBar";
import {
  Home as HomeIcon,
  ImportExport as ImportIcon,
  Business as PropertiesIcon,
  People as OwnersIcon,
  Notifications as NotificationsIcon,
  Report as ReportsIcon,
  Assignment as ClaimsIcon,
} from "@mui/icons-material";
import NavBar from "../NavBar";
const AdminLayout = () => {
  const theme = useTheme();
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const menus = [
    { name: "Home", link: "/adminLayout/dashboard", icon: <HomeIcon /> },
    { name: "Import", link: "/adminLayout/import", icon: <ImportIcon /> },
    {
      name: "Properties",
      link: "/adminLayout/properties",
      icon: <PropertiesIcon />,
    },
    { name: "Owners", link: "/owners", icon: <OwnersIcon /> },
    {
      name: "Notification",
      link: "/notifications",
      icon: <NotificationsIcon />,
    },
    { name: "Reports", link: "/reports", icon: <ReportsIcon /> },
    { name: "Claims", link: "/claims", icon: <ClaimsIcon /> },
    {
      name: "Pricing",
      link: "/adminLayout/addPricingPlan",
      icon: <FaMoneyCheckDollar />,
    },
    {
      name: "UserInfo",
      link: "/adminLayout/userInfo",
      icon: <MdOutlineGroups />,
    },
    {
      name: "Orders",
      link: "/adminLayout/orders",
      icon: <FaMoneyCheckDollar />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 overflow-y-auto">
      {/* Sidebar */}
      <SideBar
        menus={menus}
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpened ? "ml-[270px]" : "ml-[64px]"
        }`}
      >
        {/* Page Content */}
        <main className="py-6 overflow-x-hidden">
          <div className="w-full px-4">
            {" "}
            {/* Changed from container mx-auto */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
