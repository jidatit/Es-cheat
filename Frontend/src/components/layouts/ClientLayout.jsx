// import { Outlet } from "react-router-dom";
// import SideNav from "../shared/SideNav";
// import { MdOutlineGroups } from "react-icons/md";
// import Navbar from "../shared/Navbar";
// import { useState } from "react";
// import { ListOrdered, LucidePanelsLeftBottom } from "lucide-react";
// // import { FaMoneyCheckDollar } from "react-icons/fa6";

// const ClientLayout = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const menus = [
//     {
//       name: "UserInfo",
//       link: "/clientLayout/userInfo",
//       icon: <MdOutlineGroups />,
//     },
//     {
//       name: "Panels",
//       link: "/clientLayout/panels",
//       icon: <LucidePanelsLeftBottom />,
//     },
//     {
//       name: "Orders",
//       link: "/clientLayout/orders",
//       icon: <ListOrdered />,
//     },
//   ];
//   return (
//     <div className="h-screen flex bg-gray-100 max-w-screen overflow-x-hidden">
//       {/* Sidebar */}
//       <SideNav
//         menus={menus}
//         isCollapsed={isCollapsed}
//         setIsCollapsed={setIsCollapsed}
//       />

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isCollapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         {/* Navbar */}
//         <Navbar isCollapsed={isCollapsed} isAdmin={false} />

//         {/* Page Content */}
//         <main className="p-6 overflow-x-hidden">
//           <div className="container mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };
// export default ClientLayout;
import React from "react";

const ClientLayout = () => {
  return <div>yooo</div>;
};

export default ClientLayout;
