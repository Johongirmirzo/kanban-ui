import React, { useEffect, useState } from "react";

const useActiveTheme = (isDarkMode, resetHeight = null) => {
  const [deviceType, setDeviceType] = useState(null);
  const [theme, setTheme] = useState({});

  useEffect(() => {
    setTheme(applyThemeStyle(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const getCurrentDeviceSize = () => {
      if (window.innerWidth < 1000) {
        setDeviceType("small");
      } else {
        setDeviceType(null);
      }
    };
    window.addEventListener("resize", getCurrentDeviceSize);
    return () => {
      window.removeEventListener("resize", getCurrentDeviceSize);
    };
  }, []);
  const applyThemeStyle = (isDarkMode) => {
    if (isDarkMode) {
      return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: deviceType === "small" ? 400 : 500,
        width: "80%",
        height: resetHeight ? "auto" : "90%",
        bgcolor: "#283144",
        color: "#fff",
        borderRadius: "5px",
        boxShadow: 24,
        overflowY: "scroll",
        p: 4,
      };
    } else {
      return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: deviceType === "small" ? 400 : 500,
        width: "80%",
        height: resetHeight ? "auto" : "90%",
        bgcolor: "#f7f7f7",
        color: "#222",
        borderRadius: "5px",
        boxShadow: 24,
        overflowY: "scroll",
        p: 4,
      };
    }
  };
  return theme;
};

export default useActiveTheme;
