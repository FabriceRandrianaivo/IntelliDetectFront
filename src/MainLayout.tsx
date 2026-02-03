import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import SideBar from "./components/sidBar";
import { useState } from "react";
import React from "react";

function App() {
  const token = Cookies.get("user");
  const [isOpenBar, setIsOpenBar] = useState<boolean>(false);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="m-app">
      <SideBar isOpenBar={isOpenBar} setIsOpenBar={setIsOpenBar} />
      <div className="m-principle">
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const token = Cookies.get("user");
  return token ? <>{element}</> : <Navigate to="/login" />;
};

export default App;
