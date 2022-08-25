import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const SidebarToggler = ({ toggleSidebar, isDarkMode }) => {
  return (
    <MenuIcon
      onClick={toggleSidebar}
      sx={{
        color: isDarkMode ? "#fff" : "#111",
        fontSize: "40px",
        cursor: "pointer",
        position: "absolute",
        top: "5px",
        right: "0",
        marginBottom: "30px",
        zIndex: "9999",
      }}
    />
  );
};

export default SidebarToggler;
