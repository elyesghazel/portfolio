import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";

import bg1 from "../../assets/vectors/bg-1.svg";
import bg2 from "../../assets/vectors/bg-2.svg";
import bg3 from "../../assets/vectors/bg-3.svg";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <div className="min-h-screen flex flex-col justify-center">
        {/* Backgrounds */}
        <div className="fixed inset-0 z-0 pointer-events-none hidden lg:inline-block">
          <img src={bg1} alt="" className="absolute w-[50%] h-auto -right-10 z-3" />
          <img src={bg2} alt="" className="absolute w-[50%] h-auto -right-5 z-2" />
          <img src={bg3} alt="" className="absolute w-[50%] h-auto -right-0 z-1" />
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main content grows to fill available space */}
        <main className="flex flex-grow z-11 py-10 justify-center w-full">
          <Outlet />
        </main>

        {/* Footer stays at bottom */}
        <footer className="w-full z-99">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Layout;
