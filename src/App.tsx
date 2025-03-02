import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Outlet,
} from 'react-router-dom';
// import Cookies from 'js-cookie';
// import TopHeader from './components/topHeader.tsx';
import './assets/scss/pages/App.scss';
// import Root from './pages/Root.tsx';
import Navbar from './components/navBar.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import Signup from './pages/sign-up/signup.tsx';
// import Detection from './pages/detection/detection.tsx';
import Streaming from './pages/streaming/streaming.tsx';
import LandingPage from './pages/home/landingPage.tsx';
// import withAuthRouteRedirect from './components/routeGuards/withAuthRouteRedirect.tsx';



const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  // const token = Cookies.get("user");
  // const LoginWrapper = withAuthRouteRedirect(<Login theme={isDarkTheme} />);
  // const RegisterWrapper = withAuthRouteRedirect(<Signup theme={isDarkTheme} />);
  // const GuestPageWrapper = withAuthRouteRedirect(Outlet);

  useEffect(() => {
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add('theme-dark');
      body.classList.remove('theme-light');
    } else {
      body.classList.add('theme-light');
      body.classList.remove('theme-dark');
    }
  }, [isDarkTheme]);

  return (
    <Router>
      {/* <header className='header-content'> */}
        {/* <TopHeader theme={isDarkTheme} setTheme={setIsDarkTheme} /> */}
        {/* <Navbar /> */}
      {/* </header> */}
      <Routes>
      <Route path="/" element={<Home theme={isDarkTheme} />} />
      <Route path="/landing" element={<LandingPage theme={isDarkTheme} />} />
      <Route path="/login" element={<Login theme={isDarkTheme}/>} />
      <Route path="/sign-up" element={<Signup theme={isDarkTheme}/>} />
        {/* <Route path="/" element={<Root />}> */}
          <Route path="*" element={<p>Not Fund</p>} />
          {/* Public Routes */}
          {/* <Route element={<GuestPageWrapper />}>
            <Route path="/login" element={<LoginWrapper/>} />
            <Route path="/sign-up" element={<RegisterWrapper/>} />
          </Route> */}

            {/* <Route path="detection" element={<Detection theme={isDarkTheme} />} /> */}
          <Route path="/home" element={<Home theme={isDarkTheme} />} />
          <Route path="/stream" element={<Streaming theme={isDarkTheme} />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
