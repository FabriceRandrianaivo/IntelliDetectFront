"use client";

import React from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Collection", href: "/collection" },
  { name: "Ip List", href: "/" },
  { name: "stream", href: "/stream" },
  { name: "Detection", href: "/" },
];

interface SidebarProps {
  isOpenBar: boolean;
  setIsOpenBar: (isOpen: boolean) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpenBar, setIsOpenBar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("userDetail");
    // window.location.href = "/login"; // Adjust to your login page route
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

console.log("*******",isOpenBar);
  if (!isOpenBar) return (<div className="offsidebar" onMouseEnter={() => setIsOpenBar(true)}></div>);
  return (
    <div
      className="sidebar"
    //   className="h-screen auto flex flex-col w-64 bg-gray-900 dark:bg-dark-violet-300 transition-colors duration-300"
    >
      {/* Logo */}
      <div className="sidebar-logo">
        {/* <Image src={LogoIntellidetect} alt="Jupiter Logo" className="h-8 w-8" /> */}
        {/* <span className="text-white text-lg font-semibold">Jupiter myAux</span> */}
        <h2 className="titre-site">IntelliDetect</h2>
        <span onClick={() => setIsOpenBar(!isOpenBar)} className="left-icons">
          {isOpenBar ? "←" : "→"}
        </span>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        {navItems.map((item) => (
          // <Link
          //   key={item.name}
          //   href={item.href}
          //   // className="sidebar-nav-item"
          //   className="flex items-center p-2 text-gray-300 dark:text-gray-100 hover:bg-blue-800 dark:hover:bg-gray-600 rounded-md transition-colors duration-300"
          //   aria-label={`Navigate to ${item.name}`}
          // >
          //   <span>{item.name}</span>
          // </Link>
          <Link
          key={item.name}
          onClick={() => handleNavigation(item.href)}
          className="sidebar-nav-item"
          aria-label={`Navigate to ${item.name}`}
        >
          {item.name}
        </Link>
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggle flex items-center gap-4">
        deco
        {/* <ThemeToggle /> */}
        {/* <LogOut onClick={handleLogout} className="flex items-center mr-2 cursor-pointer text-gray-300 dark:text-gray-100 hover:bg-red-800 dark:hover:bg-red-600 rounded-md transition-colors duration-300 " /> */}
      </div>
    </div>
  );
};

export default Sidebar;