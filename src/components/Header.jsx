import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../ThemeContext";

const Header = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "center" },
          gap: { xs: 0, sm: 0 },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          color="primary"
          fontWeight={700}
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
          }}
        >
          Companies Directory
        </Typography>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            alignSelf: "center",
          }}
        >
          {mode === "dark" ? (
            <LightModeIcon sx={{ color: "warning.main" }} />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
