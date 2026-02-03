import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import SideBar from "./components/sidBar";
import { useState } from "react";
import React from "react";
import { Box } from "@mui/material";

function App() {
  const [isOpenBar, setIsOpenBar] = useState<boolean>(true); // Default to open for more structure

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a1929",
      }}
    >
      <SideBar isOpenBar={isOpenBar} setIsOpenBar={setIsOpenBar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const token = Cookies.get("user");
  return token ? <>{element}</> : <Navigate to="/login" />;
};

export default App;
