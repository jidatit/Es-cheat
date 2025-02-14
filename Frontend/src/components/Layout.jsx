import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div className="flex h-screen ">
      <SideBar
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      />
      <div
        className={`flex flex-col transition-all duration-300 ${
          isSidebarOpened ? "ml-[5rem] w-full" : "w-full"
        }`}
      >
        <div className="">
          <Outlet context={{ isSidebarOpened }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
