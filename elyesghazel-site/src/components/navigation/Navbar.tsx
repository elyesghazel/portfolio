import React, { useState } from "react";
import { NavLink } from "react-router"; // use NavLink for automatic active state
import { Menu, X } from "lucide-react";
import navigationItems from "./navigationitems";
import "./navbar.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = navigationItems();

  return (
    <nav className="navbar flex flex-wrap justify-between items-center w-full p-4 bg-[var(--navbar-background-color)]  md:sticky md:top-0 md:z-50 backdrop-blur-md z-[99] lg:flex-row">
      <h2 className="text-[20px] font-medium">elyesghazel.ch</h2>

      {/* Hamburger menu button for mobile + tablet */}
      <button
        onClick={toggleMenu}
        className="block lg:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation links */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } nav-items flex-col lg:flex lg:flex-row lg:items-center justify-center gap-6 lg:gap-[50px] w-full lg:w-auto mt-4 lg:mt-0 text-left`}
      >
        {navItems.map(({ path, label, icon }) => (
          <li key={path} className="nav-item">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 ${isActive ? "active" : ""}`
              }
              end
              onClick={() => setMenuOpen(false)}
            >
              {React.createElement(icon) as React.ReactNode}
              {label}
            </NavLink>
          </li>
        ))}

        {/* Mobile + tablet CTA */}
        <li>
          <NavLink
            to="mailto:info@elyesghazel.ch"
            className="cta inline-block lg:hidden px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </NavLink>
        </li>
      </ul>

      {/* Desktop CTA only */}
      <NavLink
        to="mailto:info@elyesghazel.ch"
        className="cta px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition hidden lg:inline-block"
        title="info@elyesghazel.ch"
      >
        Get in Touch
      </NavLink>
    </nav>
  );
}
