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
    { name: "Home", link: "/dashboard", icon: <HomeIcon /> },
    { name: "Import", link: "/import", icon: <ImportIcon /> },
    { name: "Properties", link: "/properties", icon: <PropertiesIcon /> },
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
    <div
      className="h-screen flex max-w-screen overflow-x-hidden"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Sidebar */}
      <SideBar
        menus={menus}
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpened ? "ml-20" : "ml-64"
        }`}
      >
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <main className="p-6 overflow-x-hidden">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
