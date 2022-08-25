import React, { useContext } from "react";
import {
  NavHeader,
  NavTitle,
  NavButtonsBox,
  NavButton,
  NavLogoutButton,
} from "./Navbar.styled";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ activeBoard, toggleAddTaskModal }) => {
  const { logout } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);

  // console.log(activeBoard, "Navbar");
  return (
    <NavHeader isLightMode={isDarkMode ? false : true}>
      <NavTitle>{activeBoard && activeBoard.boardname}</NavTitle>
      <NavButtonsBox>
        {activeBoard && (
          <NavButton onClick={toggleAddTaskModal}>+ Add Task</NavButton>
        )}
        <NavLogoutButton onClick={logout}>Log Out</NavLogoutButton>
      </NavButtonsBox>
    </NavHeader>
  );
};

export default Navbar;
