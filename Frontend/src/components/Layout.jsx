
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Layout = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Pass state and function as props */}
      <SideBar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
      
      {/* Adjust the width dynamically */}
      <div className={` flex flex-col transition-all duration-300 ${isSidebarOpened ? "ml-[6rem]" : "ml-[-5rem]"} flex-grow`}>
      <NavBar />
               <div className="p-4 flex-grow">
           <Outlet />
         </div>
      </div>
    </div>
  );
};

export default Layout;












// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import Navbar from "./Navbar";

// const Layout = () => {
//   const [isSidebarOpened, setIsSidebarOpened] = useState(true);

//   return (
//     <div className="flex h-screen">
//       <SideBar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
      
//       <div className={`flex flex-col transition-all duration-300 ${isSidebarOpened ? "ml-60" : "ml-16"} flex-grow`}>
//         <Navbar />
//         <div className="p-4 flex-grow">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
