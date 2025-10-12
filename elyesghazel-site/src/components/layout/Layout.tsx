import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";

import bg1 from "../../assets/vectors/bg-1.svg";
import bg2 from "../../assets/vectors/bg-2.svg";
import bg3 from "../../assets/vectors/bg-3.svg";

import light from "../../assets/vectors/bg-light.svg";
import light2 from "../../assets/vectors/bg-light1.svg";
function Layout() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      {/* BG Vectors */}
      {/* Desktop-only BG vectors */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden lg:inline-block">
        <img src={bg1} alt="" className="absolute right-0 z-3" />
        <img src={bg2} alt="" className="absolute right-0 z-2" />
        <img src={bg3} alt="" className="absolute right-0 z-1" />
      </div>

      {/* Lights always visible */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top transform -translate-x-1/2 max-w-fit h-fit">
          <img src={light} alt="" className="w-full h-auto object-contain" />
        </div>
        <img src={light2} alt="" className="absolute left-0 bottom-[-5vh]" />
      </div>

      {/* Navbar always visible */}
      <Navbar />

      <main className="flex-grow p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
