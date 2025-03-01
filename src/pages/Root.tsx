import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const token = Cookies.get("user");

  useEffect(() => {
    const currentUrl = location.pathname.trim();
    if (currentUrl === "/") {
      navigate(token ? "/home" : "/login");
    }
  }, [location.pathname]);

  return <Outlet />;
}
