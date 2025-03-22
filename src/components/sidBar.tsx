import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Home, Collections, Storage, Videocam, Visibility, ExitToApp } from "@mui/icons-material";
import LayersIcon from '@mui/icons-material/Layers';

const navItems = [
  { name: "Home", href: "/home", icon: <Home /> },
  { name: "Collection", href: "/collection", icon: <Collections /> },
  { name: "IP List", href: "/", icon: <Storage /> },
  { name: "Stream", href: "/stream", icon: <Videocam /> },
  { name: "Detection", href: "/", icon: <Visibility /> },
];

const navItemsFunct = [
  { name: "IntelliDetect", href: "/landing", icon: <LayersIcon /> },
  { name: "Logout", href: "/logout", icon: <ExitToApp /> },
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
    navigate("/login");
  };

  // Récupérer l'élément Logout
  const logoutItem = navItemsFunct.find((item) => item.name === "Logout");

  return (
    <div className={isOpenBar ? "sidebar" : "sidebar closed"}>
      {/* Logo et Toggle */}
      <div className="sidebar-logo">
        <h2 className="titre-site">IntelliDetect</h2>
        <span onClick={() => setIsOpenBar(!isOpenBar)} className="toggle-button">
          {isOpenBar ? "←" : "→"}
        </span>
      </div>

      {/* Menu de navigation */}
      <List className="sidebar-nav">
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => navigate(item.href)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isOpenBar && <ListItemText primary={item.name} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bouton Logout */}
      {logoutItem && (
        <div className="logout-button" onClick={handleLogout}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{logoutItem.icon}</ListItemIcon>
              {isOpenBar && <ListItemText primary={logoutItem.name} />}
            </ListItemButton>
          </ListItem>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
