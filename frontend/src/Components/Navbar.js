/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../Assets/Logo.svg"; // ✅ Fixed logo import
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "External Resources", icon: <InfoIcon />, path: "/external-resources" },
    { text: "Meet the Team", icon: <CommentRoundedIcon />, path: "/meet-the-team" },
    { text: "About", icon: <PhoneRoundedIcon />, path: "/about" },
  ];

  return (
    <nav style={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
      {/* ✅ LOGO Positioned in Top Left */}
      <div className="nav-logo-container">
        <img src={Logo} alt="Agrimate AI Logo" className="main-logo" style={{ height: "50px" }} onClick={() => navigate("/")} />
      </div>

      {/* ✅ NAVBAR BUTTONS - Moved slightly up */}
      <div className="navbar-links-container" style={{ marginTop: "-8px" }}>
        <button
          className="primary-button"
          onClick={() => navigate("/external-resources")}
          style={{
            backgroundColor: location.pathname === "/external-resources" ? "#E48F0F" : "",
            color: location.pathname === "/external-resources" ? "white" : "",
          }}
        >
          Disaster Relief
        </button>
        <button
          className="primary-button"
          onClick={() => navigate("/meet-the-team")}
          style={{
            backgroundColor: location.pathname === "/meet-the-team" ? "#E48F0F" : "", // Highlights when on the Meet the Team page
            color: location.pathname === "/meet-the-team" ? "white" : "",
          }}
        >
          Meet The Team
        </button>

        <button
          className="primary-button"
          onClick={() => navigate("/about")}
          style={{
            backgroundColor: location.pathname === "/about" ? "#E48F0F" : "",
            color: location.pathname === "/about" ? "white" : "",
          }}
        >
          About
        </button>
      </div>

      {/* ✅ MENU BUTTON */}
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {/* ✅ SIDEBAR MENU */}
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;