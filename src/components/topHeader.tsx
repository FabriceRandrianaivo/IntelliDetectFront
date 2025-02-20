import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface headerType {
  theme: boolean;
  setTheme: (theme: boolean) => void;
}

const TopHeader = (props: headerType) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(props.theme);
  const navigate = useNavigate();
//   const isHome = location.pathname.startsWith("/home");
  useEffect(() => {
    setIsDarkTheme(props.theme);
  }, [props.theme]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    props.setTheme(newTheme);
  };

  return (
    <header className="header">
      <nav>
        <ul>
        <li onClick={()=> navigate("/")}><p className="navIcons">home</p></li>
        <li onClick={()=> navigate("/project")}><p className="navIcons">home</p></li>
        <li onClick={()=> navigate("/project")}><p className="navIcons">home</p></li>
        <li onClick={()=> navigate("/project")}><p className="navIcons">home</p></li>
          <li onClick={toggleTheme} >{isDarkTheme? <p>Dark</p>: <p>Light</p>}</li> 
        </ul>
      </nav>
    </header>
  );
};

export default TopHeader;
