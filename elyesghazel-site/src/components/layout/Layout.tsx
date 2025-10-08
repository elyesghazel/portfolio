import { Outlet } from "react-router";
import Navbar from "../navigation/Navbar";

function Layout() {
  return (
    <div
      className="app-container"
    >
      {/* Navbar always visible */}
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <Navbar />
      </div>

      <main className="p-3">
        {/* here is the main content pages */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
