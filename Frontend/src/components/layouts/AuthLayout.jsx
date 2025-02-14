import { Outlet } from "react-router-dom";
// import logo from "../../src/images/logo1.png";
const AuthLayout = () => {
  return (
    <div className="min-h-screen relative">
      {/* Decorative image overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* <img
          src={overlayImg} // Replace with your image URL or path
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full flex h-full justify-center items-center flex-col gap-y-4  p-8  rounded-lg ">
          {/* <div className="flex items-center gap-2 mb-8">
            <img
              className={`transition-all duration-300 w-32
              `}
              src={""}
              alt="Logo"
            />
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
